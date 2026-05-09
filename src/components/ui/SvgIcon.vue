<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size ?? 20"
    :height="size ?? 20"
    :viewBox="icon?.viewBox"
    :fill="icon?.fill ?? fill ?? 'none'"

    v-bind="strokeBind"
  >
    <template v-for="(el, i) in icon?.elements" :key="i">
      <path v-if="el.tag === 'path'" :d="el.d" />
      <line v-else-if="el.tag === 'line'" :x1="el.x1" :y1="el.y1" :x2="el.x2" :y2="el.y2" />
      <circle v-else-if="el.tag === 'circle'" :cx="el.cx" :cy="el.cy" :r="el.r" />
      <polyline v-else-if="el.tag === 'polyline'" :points="el.points" />
      <polygon v-else-if="el.tag === 'polygon'" :points="el.points" />
      <rect v-else-if="el.tag === 'rect'" :x="el.x" :y="el.y" :width="el.width" :height="el.height" :rx="el.rx" :ry="el.ry" />
    </template>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import icons from '@/stores/icons'
import type { IconInterface } from '@/stores/icons'

const props = defineProps<{
  iconName: string;
  size?: number;
  fill?: string;
  strokeWidth?: string;
  hideStroke?: boolean;
}>()

const icon = computed<IconInterface | undefined>(() => icons[props.iconName])

const strokeBind = computed(() => (
  props.hideStroke ? {} : {
    'stroke': icon.value?.stroke ?? 'currentColor',
    'stroke-width': icon.value?.strokeWidth ?? props.strokeWidth ?? '2',
    'stroke-linecap': 'round' as const,
    'stroke-linejoin': 'round' as const,
  }
))
</script>
