import { faker } from '@faker-js/faker';
import { shallowMount } from '@vue/test-utils';
import sample from 'lodash/sample';
import { nextTick } from 'vue';

import { getLastEmittedEventValue } from 'h/wrapper';

import BaseInput from '@/components/_base/form/input/BaseInput.vue';

describe('BaseInput.vue', () => {
  let wrapper;
  let slots;

  let modelValue;
  let type;
  let name;
  let label;
  let placeholder;
  let message;
  let errorMessage;
  let isDisabled;
  let onDarkBackground;
  let autocomplete;
  let autofocus;

  const section = document.createElement('section');
  document.body.append(section);

  function mountComponent() {
    if (wrapper) wrapper.unmount();
    wrapper = shallowMount(BaseInput, {
      attachTo: section,
      props: {
        modelValue,
        type,
        name,
        label,
        placeholder,
        message,
        errorMessage,
        isDisabled,
        onDarkBackground,
        autocomplete,
        autofocus,
      },
      slots,
    });
  }

  const element = {
    label: '.input__label',
    message: '.input__message',
    icon: '.input__icon',
  };

  const classModifications = {
    filled: 'input__field--state-filled',
    disabled: 'input__field--state-disabled',
    onDarkBackground: 'input__field--on-dark-background',
    iconTrailing: 'input__field--icon-trailing',
  };

  beforeEach(() => {
    slots = {};
    name = faker.lorem.word();
    mountComponent();
  });

  it('should render', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render input with correct attributes', () => {
    expect(wrapper.get('input').attributes()).toMatchObject({
      name,
      type: 'text',
      autocomplete: 'off',
    });
  });

  it('should not add any additional class modifications', () => {
    Object.values(classModifications).forEach((className) =>
      expect(wrapper.get('input').classes(className)).toBeFalsy(),
    );
  });

  it('should not render label', () => {
    expect(wrapper.find(element.label).exists()).toBeFalsy();
  });

  it('should not render icon', () => {
    expect(wrapper.find(element.icon).exists()).toBeFalsy();
  });

  it('should not render message', () => {
    expect(wrapper.find(element.message).exists()).toBeFalsy();
  });

  describe('when modelValue is received', () => {
    beforeEach(() => {
      modelValue = faker.lorem.word();
      mountComponent();
    });

    it('should add filled classed to the input', () => {
      expect(wrapper.get('input').classes('')).toBeTruthy();
    });

    it('should render value in input', () => {
      expect(wrapper.get('input').element.value).toBe(modelValue);
    });
  });

  describe('when model value is numeric 0', () => {
    beforeEach(() => {
      modelValue = 0;
      mountComponent();
    });

    it('should render 0 in input as filled', () => {
      expect(wrapper.get('input').element.value).toBe('0');
      expect(wrapper.get('input').classes(classModifications.filled)).toBeTruthy();
    });
  });

  describe('when value is changed', () => {
    let newValue;

    beforeEach(async () => {
      newValue = 'a';
      wrapper.get('input').element.value = newValue;
      wrapper.get('input').trigger('input', newValue);
      wrapper.get('input').trigger('change', newValue);
      await nextTick();
    });

    it('should render new value in input', () => {
      expect(wrapper.get('input').element.value).toBe(newValue);
    });

    describe('when autofocus is set to true', () => {
      beforeEach(() => {
        autofocus = true;
        mountComponent();
      });

      it('should focus input element', () => {
        expect(document.activeElement).toEqual(wrapper.get('input').element);
      });
    });

    it('should emit input and update:modelValue', () => {
      expect(
        getLastEmittedEventValue({
          wrapper,
          eventName: 'update:modelValue',
        })[0],
      ).toBe('a');
      expect(
        getLastEmittedEventValue({
          wrapper,
          eventName: 'input',
        })[0],
      ).toBe('a');

      expect(
        getLastEmittedEventValue({
          wrapper,
          eventName: 'change',
        })[0],
      ).toBe('a');
    });
  });

  describe('when enter was pressed', () => {
    beforeEach(() => {
      wrapper.get('input').trigger('keydown.enter');
    });

    it('should emit enter-press event', () => {
      expect(wrapper.emitted('enter-press')).toBeTruthy();
    });
  });

  describe('when input is blurred', () => {
    beforeEach(() => {
      wrapper.get('input').trigger('blur');
    });

    it('should add filled class', () => {
      expect(wrapper.emitted('blur')).toBeTruthy();
    });
  });

  describe('when label is passed', () => {
    beforeEach(() => {
      label = faker.lorem.word();
      mountComponent();
    });

    it('should render label', () => {
      expect(wrapper.get(element.label).text()).toBe(label);
    });
  });

  describe('when message is passed', () => {
    beforeEach(() => {
      message = faker.lorem.sentence();
      mountComponent();
    });

    it('should render message', () => {
      expect(wrapper.getComponent(element.message).props('message')).toBe(message);
      expect(wrapper.getComponent(element.message).props('isError')).toBe(false);
    });

    describe('but when error received', () => {
      beforeEach(() => {
        errorMessage = faker.lorem.sentence();
        mountComponent();
      });

      it('should render error instead of message', () => {
        expect(wrapper.getComponent(element.message).props('message')).toBe(errorMessage);
        expect(wrapper.getComponent(element.message).props('isError')).toBe(true);
      });

      it('should also add error class to input', () => {
        expect(wrapper.get('input').classes(classModifications.error)).toBeTruthy();
      });
    });
  });

  describe('when something is present in the icon slot', () => {
    beforeEach(() => {
      slots = {
        icon: `<i class="slot-icon">i</i>`,
      };
      mountComponent();
    });

    it('should add icon class to field', () => {
      expect(wrapper.get('input').classes(classModifications.iconTrailing)).toBeTruthy();
    });
    it('should render slot', () => {
      expect(wrapper.get('.slot-icon').text()).toBe('i');
    });
  });

  describe('when isDisabled set to true', () => {
    beforeEach(() => {
      isDisabled = true;
      mountComponent();
    });

    it('should add disabled class and attribute to the field', () => {
      expect(wrapper.get('input').attributes('disabled')).toBeDefined();
      expect(wrapper.get('input').classes(classModifications.disabled)).toBeTruthy();
    });
  });

  describe('when placeholder is passed', () => {
    beforeEach(() => {
      placeholder = faker.lorem.word();
      mountComponent();
    });

    it('should add it to the field', () => {
      expect(wrapper.get('input').attributes('placeholder')).toBe(placeholder);
    });
  });

  describe('when onDarkBackground is passed', () => {
    beforeEach(() => {
      onDarkBackground = true;
      mountComponent();
    });

    it('should add class to the field', () => {
      expect(wrapper.get('input').classes(classModifications.onDarkBackground)).toBeTruthy();
    });
  });

  describe('when autocomplete is passed', () => {
    beforeEach(() => {
      autocomplete = sample('tel', 'one-time-code', 'url', 'cc-number');
      mountComponent();
    });

    it('should add class to the field', () => {
      expect(wrapper.get('input').attributes('autocomplete')).toBe(autocomplete);
    });
  });
});
