import { faker } from '@faker-js/faker';
import { shallowMount } from '@vue/test-utils';
import sample from 'lodash/sample';

import BaseBodyText from '@/components/_base/typography/BaseBodyText.vue';

describe('BaseBodyText.vue', () => {
  let wrapper;
  let tag;
  let text;
  let size;

  function mountComponent() {
    wrapper = shallowMount(BaseBodyText, {
      props: {
        tag,
        text,
        size,
      },
    });
  }

  beforeEach(() => {
    text = faker.lorem.sentence();
    mountComponent();
  });

  it('should render', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render p tag by default', () => {
    expect(wrapper.element.tagName).toBe('P');
  });

  it('should render large size by default', () => {
    expect(wrapper.classes('body-text--size-large')).toBeTruthy();
  });

  it('should render text', () => {
    expect(wrapper.text()).toEqual(text);
  });

  describe('when tag is passed as prop', () => {
    beforeEach(() => {
      tag = 'span';
      mountComponent();
    });

    it('should render correct tag', () => {
      expect(wrapper.element.tagName).toBe(tag.toUpperCase());
    });
  });

  describe('when size is passes', () => {
    beforeEach(() => {
      size = sample(['x-small', 'small', 'medium']);
      mountComponent();
    });

    it('should render correct size', () => {
      expect(wrapper.classes(`body-text--size-${size}`)).toBeTruthy();
    });
  });
});
