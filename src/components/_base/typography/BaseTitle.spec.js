import { faker } from '@faker-js/faker';
import { shallowMount } from '@vue/test-utils';
import sample from 'lodash/sample';

import BaseTitle from '@/components/_base/typography/BaseTitle.vue';

describe('BaseBodyText.vue', () => {
  let wrapper;
  let tag;
  let text;
  let size;

  function mountComponent() {
    wrapper = shallowMount(BaseTitle, {
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
    expect(wrapper.classes('title--size-large')).toBeTruthy();
  });

  it('should render text', () => {
    expect(wrapper.text()).toEqual(text);
  });

  describe('when tag is passed as prop', () => {
    beforeEach(() => {
      tag = sample(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span']);
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
      expect(wrapper.classes(`title--size-${size}`)).toBeTruthy();
    });
  });
});
