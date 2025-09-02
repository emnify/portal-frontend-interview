import { faker } from '@faker-js/faker';
import { shallowMount } from '@vue/test-utils';
import sample from 'lodash/sample';

import BaseHeadline from '@/components/_base/typography/BaseHeadline.vue';

describe('BaseBodyText.vue', () => {
  let wrapper;
  let tag;
  let text;
  let size;

  function mountComponent() {
    wrapper = shallowMount(BaseHeadline, {
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
    expect(wrapper.classes('headline--size-large')).toBeTruthy();
  });

  it('should render text', () => {
    expect(wrapper.text()).toEqual(text);
  });

  describe('when tag is passed as prop', () => {
    beforeEach(() => {
      tag = sample(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p']);
      mountComponent();
    });

    it('should render correct tag', () => {
      expect(wrapper.element.tagName).toBe(tag.toUpperCase());
    });
  });

  describe('when size is passes', () => {
    beforeEach(() => {
      size = sample(['medium', 'small']);
      mountComponent();
    });

    it('should render correct size', () => {
      expect(wrapper.classes(`headline--size-${size}`)).toBeTruthy();
    });
  });
});
