import { createSSRApp, h, nextTick } from 'vue';
import { renderToString } from '@vue/server-renderer';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

import VueContentLoadingDefault, { ContentLoader, VueContentLoading, VclFacebook } from '../src';

describe('VueContentLoading', () => {
  it('renders a decorative, responsive-safe SVG by default', () => {
    const wrapper = mount(VueContentLoading);
    const svg = wrapper.get('svg');

    expect(svg.attributes()).toMatchObject({
      'aria-hidden': 'true',
      focusable: 'false',
      height: '130',
      preserveAspectRatio: 'xMidYMid meet',
      viewBox: '0 0 400 130',
      width: '400',
    });
    expect(wrapper.findAll('clipPath rect')).toHaveLength(6);
    expect(wrapper.findAll('.vcl-animation')).toHaveLength(1);
  });

  it('creates stable, deterministic references from uniqueKey', () => {
    const wrapper = mount(VueContentLoading, {
      props: {
        uniqueKey: 'account/card 1',
      },
    });

    expect(wrapper.get('clipPath').attributes('id')).toBe('vcl-account-card-1-clip');
    expect(wrapper.get('linearGradient').attributes('id')).toBe('vcl-account-card-1-gradient');
    expect(wrapper.get('svg > rect').attributes('clip-path')).toBe('url(#vcl-account-card-1-clip)');
    expect(wrapper.get('.vcl-animation').attributes()).toMatchObject({
      'clip-path': 'url(#vcl-account-card-1-clip)',
      fill: 'url(#vcl-account-card-1-gradient)',
    });
  });

  it('uses Vue SSR-stable IDs when no key is supplied', async () => {
    const render = () =>
      renderToString(
        createSSRApp({
          render: () => h(VueContentLoading),
        }),
      );

    expect(await render()).toBe(await render());
  });

  it('hydrates server-rendered IDs without replacing the SVG', async () => {
    const rootComponent = {
      render: () => h(VueContentLoading),
    };
    const serverMarkup = await renderToString(createSSRApp(rootComponent));
    const container = document.createElement('div');
    const parsedSvg = new DOMParser().parseFromString(
      serverMarkup,
      'image/svg+xml',
    ).documentElement;
    container.append(document.importNode(parsedSvg, true));
    const serverSvg = container.querySelector('svg');
    const serverShimmerId = container.querySelector('.vcl-animation')?.id;
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    const clientApp = createSSRApp(rootComponent);

    try {
      clientApp.mount(container);
      await nextTick();

      expect(container.querySelector('svg')).toBe(serverSvg);
      expect(container.querySelector('.vcl-animation')?.id).toBe(serverShimmerId);
      expect(consoleError).not.toHaveBeenCalled();
      expect(consoleWarn).not.toHaveBeenCalled();
    } finally {
      clientApp.unmount();
      consoleError.mockRestore();
      consoleWarn.mockRestore();
    }
  });

  it('preserves the legacy default and preset export identities', () => {
    expect(VueContentLoadingDefault).toBe(VueContentLoading);
    expect(ContentLoader).toBe(VueContentLoading);
    expect(VclFacebook.displayName).toBe('VclFacebook');
  });

  it('supports named loading graphics without making decorative loaders noisy', () => {
    const wrapper = mount(VueContentLoading, {
      props: {
        ariaLabel: 'Loading account activity',
        uniqueKey: 'activity',
      },
    });

    expect(wrapper.get('svg').attributes()).toMatchObject({
      role: 'img',
      'aria-labelledby': 'vcl-activity-title',
    });
    expect(wrapper.get('title').text()).toBe('Loading account activity');
    expect(wrapper.get('svg').attributes('aria-hidden')).toBeUndefined();
  });

  it('renders custom shapes and forwards root attributes', () => {
    const wrapper = mount(VueContentLoading, {
      attrs: {
        class: 'profile-loader',
        'data-testid': 'loader',
      },
      slots: {
        default: () => h('circle', { cx: 20, cy: 20, r: 20 }),
      },
    });

    expect(wrapper.get('svg').classes()).toContain('profile-loader');
    expect(wrapper.get('svg').attributes('data-testid')).toBe('loader');
    expect(wrapper.findAll('clipPath circle')).toHaveLength(1);
    expect(wrapper.findAll('clipPath rect')).toHaveLength(0);
  });

  it('supports base URLs, opacity, and RTL', () => {
    const wrapper = mount(VueContentLoading, {
      props: {
        baseUrl: '/accounts',
        primaryOpacity: 0.25,
        rtl: true,
        secondaryOpacity: 0.5,
        uniqueKey: 'table',
      },
    });

    expect(wrapper.get('svg > rect').attributes('clip-path')).toBe('url(/accounts#vcl-table-clip)');
    expect(wrapper.get('.vcl-animation').attributes()).toMatchObject({
      'clip-path': 'url(/accounts#vcl-table-clip)',
      fill: 'url(/accounts#vcl-table-gradient)',
    });
    expect(wrapper.findAll('.vcl-animation')).toHaveLength(1);
    expect(wrapper.get('svg > rect').attributes('fill-opacity')).toBe('0.25');
    expect(wrapper.findAll('stop')[1]?.attributes('stop-opacity')).toBe('0.5');
    expect(wrapper.get('svg').attributes('style')).toContain('scaleX(-1)');
  });

  it('removes the shimmer and its gradient when animation is disabled', () => {
    const wrapper = mount(VueContentLoading, {
      props: {
        animate: false,
      },
    });

    expect(wrapper.findAll('.vcl-animation')).toHaveLength(0);
    expect(wrapper.findAll('linearGradient')).toHaveLength(0);
    expect(wrapper.findAll('style')).toHaveLength(0);
  });

  it('adds a reduced-motion guard only when animation is enabled', () => {
    const wrapper = mount(VueContentLoading, {
      props: {
        uniqueKey: 'motion',
      },
    });

    expect(wrapper.get('style').text()).toContain('prefers-reduced-motion: reduce');
    expect(wrapper.get('style').text()).toContain('#vcl-motion-shimmer');
    expect(wrapper.get('style').text()).toContain('animation: none');
  });

  it('keeps a numeric viewBox for CSS-sized SVGs', () => {
    const wrapper = mount(VueContentLoading, {
      props: {
        height: 'auto',
        width: '100%',
      },
    });

    expect(wrapper.get('svg').attributes()).toMatchObject({
      height: 'auto',
      viewBox: '0 0 400 130',
      width: '100%',
    });
  });
});
