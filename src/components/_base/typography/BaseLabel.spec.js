import { faker } from '@faker-js/faker';
import { shallowMount } from '@vue/test-utils';
import sample from 'lodash/sample';

import BaseLabel from '@/components/_base/typography/BaseLabel.vue';

describe('BaseBodyText.vue', () => {
  let wrapper;
  let tag;
  let text;
  let size;

  function mountComponent() {
    wrapper = shallowMount(BaseLabel, {
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
    expect(wrapper.classes('label--size-large')).toBeTruthy();
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
      size = sample(['medium', 'small']);
      mountComponent();
    });

    it('should render correct size', () => {
      expect(wrapper.classes(`label--size-${size}`)).toBeTruthy();
    });
  });
});
