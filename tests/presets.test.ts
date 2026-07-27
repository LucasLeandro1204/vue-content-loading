import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import {
  VclBulletList,
  VclCard,
  VclCode,
  VclFacebook,
  VclInstagram,
  VclList,
  VclTable,
  VclText,
  VclTwitch,
} from '../src';

describe('presets', () => {
  it.each([
    ['VclFacebook', VclFacebook, '0 0 400 130'],
    ['VclInstagram', VclInstagram, '0 0 400 480'],
    ['VclCode', VclCode, '0 0 300 80'],
    ['VclList', VclList, '0 0 300 120'],
    ['VclTwitch', VclTwitch, '0 0 300 225'],
    ['VclCard', VclCard, '0 0 320 260'],
  ])('renders %s on its own canvas', (_, preset, viewBox) => {
    const wrapper = mount(preset);
    expect(wrapper.get('svg').attributes('viewBox')).toBe(viewBox);
    expect(wrapper.findAll('clipPath > *').length).toBeGreaterThan(0);
  });

  it('renders exactly the requested bullet rows', () => {
    const wrapper = mount(VclBulletList, {
      props: {
        rows: 3,
      },
    });

    expect(wrapper.findAll('clipPath circle')).toHaveLength(3);
    expect(wrapper.findAll('clipPath rect')).toHaveLength(3);
    expect(wrapper.get('svg').attributes('viewBox')).toBe('0 0 230 60');
  });

  it('builds configurable text lines without extra component instances', () => {
    const wrapper = mount(VclText, {
      props: {
        lastLineWidth: 55,
        lineGap: 8,
        lineHeight: 10,
        rows: 3,
      },
    });
    const lines = wrapper.findAll('clipPath rect');

    expect(lines).toHaveLength(3);
    expect(lines[2]?.attributes('width')).toBe('55%');
    expect(wrapper.get('svg').attributes('viewBox')).toBe('0 0 400 46');
  });

  it('renders a table header plus body rows with weighted columns', () => {
    const wrapper = mount(VclTable, {
      props: {
        columns: [1, 2, 1],
        header: true,
        rows: 2,
      },
    });
    const cells = wrapper.findAll('clipPath rect');

    expect(cells).toHaveLength(9);
    expect(wrapper.get('svg').attributes('viewBox')).toBe('0 0 100 29');
    expect(Number(cells[1]?.attributes('width'))).toBeGreaterThan(
      Number(cells[0]?.attributes('width')),
    );
  });

  it('lets callers resize a preset without changing its coordinate system', () => {
    const wrapper = mount(VclCode, {
      props: {
        height: 'auto',
        width: '100%',
      },
    });

    expect(wrapper.get('svg').attributes()).toMatchObject({
      height: 'auto',
      viewBox: '0 0 300 80',
      width: '100%',
    });
  });
});
