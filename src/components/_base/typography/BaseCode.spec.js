import { shallowMount } from '@vue/test-utils';

import BaseCode from '@/components/_base/typography/BaseCode.vue';
import BaseLabel from '@/components/_base/typography/BaseLabel.vue';

describe('BaseCode.vue', () => {
  let wrapper;
  let text;

  const element = {
    code: '.code__content',
  };

  function mountComponent() {
    wrapper = shallowMount(BaseCode, {
      global: {
        stubs: {
          BaseLabel,
        },
      },
      props: {
        text,
      },
    });
  }

  beforeEach(() => {
    text = 'test text';

    mountComponent();
  });

  it('should render text', () => {
    expect(wrapper.find(element.code).text()).toEqual(text);
  });
});
