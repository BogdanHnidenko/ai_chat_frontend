import { defineStore } from 'pinia'
import type { PresetType } from '@/types'
import { Presets } from '@/api/API'

const presetsApi = new Presets

export const usePresetStore = defineStore('preset', {
  state: () => ({
    presets: [] as PresetType[],
  }),

  actions: {
    setPresets(presets: PresetType[]) {
      this.presets = presets
    },

    async addPreset(title: string, descriptionPreset: string) {
      const { id, name, description } = await presetsApi.createPreset({ name: title, description: descriptionPreset }) as any
      this.presets.push({ id, name, description })
    },

    async updatePreset(id: string, name: string, description: string) {
      await presetsApi.updatePreset({ id, name, description })
      const p = this.presets.find(p => p.id === id)
      if (p) { p.name = name; p.description = description }
    },

    async deletePreset(id: string) {
      await presetsApi.deletePreset(id)
      this.presets = this.presets.filter(p => p.id !== id)
    },
  },
})
