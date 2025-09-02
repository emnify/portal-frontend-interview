import { faker } from '@faker-js/faker';
import { shallowMount } from '@vue/test-utils';

import transparentStub from 'h/TransparentStub';
import { getLastEmittedEventValue } from 'h/wrapper';

import BaseSupportMessage from '@/components/_base/form/BaseSupportMessage.vue';
import BaseInputTextarea from '@/components/_base/form/input/BaseInputTextarea.vue';

describe('BaseInputTextarea.vue', () => {
  let wrapper;

  let modelValue;
  let name;
  let label;
  let message;
  let errorMessage;
  let maxLength;
  let isDisabled;
  let isStripped;
  let onDarkBackground;

  const element = {
    field: '.textarea__field',
    label: '.input__label',
    supportMessage: '.textarea__message',
    counter: '.textarea__counter',
  };

  const classes = {
    error: 'input__field--state-error',
    disabled: 'input__field--state-disabled',
    filled: 'input__field--state-filled',
    onDarkBackground: 'input__field--on-dark-background',
    stripped: 'textarea__field--stripped',
  };

  function mountComponent() {
    wrapper = shallowMount(BaseInputTextarea, {
      attachTo: document.body,
      global: {
        stubs: {
          BaseBodyText: transparentStub(),
        },
      },
      props: {
        modelValue,
        name,
        label,
        message,
        errorMessage,
        maxLength,
        isDisabled,
        isStripped,
        onDarkBackground,
      },
    });
  }

  beforeEach(() => {
    jest.useRealTimers();

    name = faker.lorem.word();

    mountComponent();
  });

  it('should render correctly', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should pass name to textarea field', () => {
    expect(wrapper.find(element.field).attributes('name')).toBe(name);
  });

  it('should pass modelValue as value of textarea field', () => {
    expect(wrapper.find(element.field).attributes('value')).toBe(modelValue);
  });

  it('should not render label', () => {
    expect(wrapper.find(element.label).exists()).toBeFalsy();
  });

  it('should not render support message', () => {
    expect(wrapper.findComponent(BaseSupportMessage).exists()).toBeFalsy();
  });

  it('should not render counter', () => {
    expect(wrapper.find(element.counter).exists()).toBeFalsy();
  });

  describe('when label is passed', () => {
    beforeEach(() => {
      label = faker.lorem.word();
      mountComponent();
    });

    it('should render label with correct text', () => {
      expect(wrapper.find(element.label).text()).toBe(label);
    });
  });

  describe('when maxlength is set', () => {
    beforeEach(() => {
      maxLength = 255;
      mountComponent();
    });

    it('should pass maxlength attribute to textarea', () => {
      expect(wrapper.find('textarea').attributes('maxlength')).toBe(maxLength.toString());
    });

    it('should render counter with correct text', () => {
      expect(wrapper.findComponent(element.counter).props('message')).toBe(`0  /  ${maxLength}`);
    });
  });

  describe('when message is passed', () => {
    beforeEach(() => {
      message = faker.lorem.word();
      mountComponent();
    });

    it('should render support message with correct text', () => {
      expect(wrapper.findComponent(element.supportMessage).props('message')).toBe(message);
    });
  });

  describe('when textarea value is changed', () => {
    let newValue;

    beforeEach(async () => {
      newValue = faker.lorem.word();
      await wrapper.find(element.field).setValue(newValue);

      await wrapper.find(element.field).trigger('input', newValue);
      await wrapper.find(element.field).trigger('change', newValue);
    });

    it('should render new value in textArea', () => {
      expect(wrapper.get(element.field).element.value).toBe(newValue);
    });

    it('should emit modelValue update event with new value', () => {
      expect(
        getLastEmittedEventValue({
          wrapper,
          eventName: 'update:modelValue',
        }),
      ).toBe(newValue);
    });

    it('should emit change event with value', () => {
      expect(
        getLastEmittedEventValue({
          wrapper,
          eventName: 'change',
        }),
      ).toBe(newValue);
    });
  });

  describe('when textarea is focused using keyboard', () => {
    beforeEach(() => {
      wrapper.find(element.field).trigger('keydown', { key: 'Tab' });
    });

    it('should emit keydown event', () => {
      expect(wrapper.emitted('keydown')).toBeTruthy();
    });
  });

  describe('when modelValue is provided', () => {
    beforeEach(() => {
      modelValue = faker.lorem.word();
      mountComponent();
    });

    it('should render filled textarea', () => {
      expect(wrapper.find('textarea').element.value).toBe(modelValue);
    });

    it('should pass filled class to textarea', () => {
      expect(wrapper.find('textarea').classes(classes.filled)).toBeTruthy();
    });

    it('should render counter with correct text', () => {
      expect(wrapper.findComponent(element.counter).props('message')).toBe(
        `${modelValue.length}  /  ${maxLength}`,
      );
    });
  });

  describe('when error message is passed', () => {
    beforeEach(() => {
      errorMessage = faker.lorem.word();
      mountComponent();
    });

    it('should render support message with correct text and error flag', () => {
      expect(wrapper.findComponent(BaseSupportMessage).props()).toEqual({
        message: errorMessage,
        isError: true,
      });
    });

    it('should pass error class to textarea', () => {
      expect(wrapper.find('textarea').classes(classes.error)).toBeTruthy();
    });
  });

  describe('when stripped flag is passed', () => {
    beforeEach(() => {
      isStripped = true;
      mountComponent();
    });

    it('should pass stripped class to textarea', () => {
      expect(wrapper.find(element.field).classes(classes.stripped)).toBeTruthy();
    });
  });

  describe('when onDarkBackground flag is passed', () => {
    beforeEach(() => {
      onDarkBackground = true;
      mountComponent();
    });

    it('should pass onDarkBackground class to textarea', () => {
      expect(wrapper.find('textarea').classes(classes.onDarkBackground)).toBeTruthy();
    });
  });

  describe('when disabled flag is passed', () => {
    beforeEach(() => {
      isDisabled = true;
      mountComponent();
    });

    it('should pass disabled attribute to textarea', () => {
      expect(wrapper.find('textarea').attributes('disabled')).toBeDefined();
    });

    it('should pass disabled class to textarea', () => {
      expect(wrapper.find('textarea').classes(classes.disabled)).toBeTruthy();
    });
  });
});
