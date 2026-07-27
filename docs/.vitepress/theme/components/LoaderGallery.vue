<script setup lang="ts">
import { computed, ref } from 'vue';

import {
  VclBulletList,
  VclCard,
  VclCode,
  VclFacebook,
  VclInstagram,
  VclTable,
  VclText,
} from '../../../../src';

const presets = {
  Card: VclCard,
  Text: VclText,
  Table: VclTable,
  Facebook: VclFacebook,
  Instagram: VclInstagram,
  Code: VclCode,
  'Bullet list': VclBulletList,
} as const;

type PresetName = keyof typeof presets;

const selected = ref<PresetName>('Card');
const rtl = ref(false);
const animate = ref(true);
const dark = ref(false);
const speed = ref(2);
const currentPreset = computed(() => presets[selected.value]);
const colors = computed(() =>
  dark.value
    ? { primary: '#253044', secondary: '#3c4b63' }
    : { primary: '#e7ebef', secondary: '#f7f9fa' },
);
</script>

<template>
  <div class="gallery-shell" :class="{ 'is-dark': dark }">
    <div class="gallery-preview">
      <component
        :is="currentPreset"
        width="100%"
        height="auto"
        :primary="colors.primary"
        :secondary="colors.secondary"
        :rtl="rtl"
        :animate="animate"
        :speed="speed"
      />
    </div>

    <div class="gallery-controls" aria-label="Loader controls">
      <label>
        Preset
        <select v-model="selected">
          <option v-for="(_, name) in presets" :key="name" :value="name">
            {{ name }}
          </option>
        </select>
      </label>

      <label>
        Speed: {{ speed.toFixed(1) }}s
        <input v-model.number="speed" type="range" min="0.5" max="4" step="0.5" />
      </label>

      <label class="check"><input v-model="animate" type="checkbox" /> Animate</label>
      <label class="check"><input v-model="rtl" type="checkbox" /> RTL</label>
      <label class="check"><input v-model="dark" type="checkbox" /> Dark palette</label>
    </div>
  </div>
</template>
