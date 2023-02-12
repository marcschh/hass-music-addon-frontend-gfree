<template>
  <div class="provider-icons" :style="`height: ${height};`">
    <v-tooltip v-for="prov of uniqueProviders" :key="prov.provider_instance" location="bottom">
      <!-- eslint-disable vue/no-template-shadow -->
      <template #activator="{ props }">
        <img v-bind="props" :key="prov.provider_domain" class="provider-icon" :height="height"
          :src="getProviderIcon(prov.provider_domain)" :style="enableLink ? 'cursor: pointer' : ''"
          @click="enableLink ? provClicked(prov) : ''" />
      </template>
      <!-- eslint-enable vue/no-template-shadow -->
      <span>{{ $t('providers.' + prov.provider_domain) }}</span>
    </v-tooltip>
  </div>
</template>

<script setup lang="ts">
import type { ProviderMapping } from '../plugins/api/interfaces';

import { computed } from 'vue';
import IconBase from './Icons/IconBase.vue';

// properties
export interface Props {
  providerMappings: ProviderMapping[];
  height: number;
  enableLink?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: '1.4em',
  height: '1.4em',
  width: '1.4em',
  enableLink: false,
});

const uniqueProviders = computed(() => {
  const output: ProviderMapping[] = [];
  const keys: string[] = [];
  if (!props.providerMappings) return [];
  props.providerMappings.forEach(function (prov: ProviderMapping) {
    const domain = prov.provider_domain;
    if (keys.indexOf(domain) === -1) {
      keys.push(domain);
      output.push(prov);
    }
  });
  return output.sort((a, b) => a.provider_domain.localeCompare(b.provider_domain));
});

const provClicked = function (prov: ProviderMapping) {
  window.open(prov.url, '_blank');
};
</script>

<script lang="ts">
import { ContentType } from '../plugins/api/interfaces';
export const iconSpotify = new URL('@/assets/spotify.png', import.meta.url)
  .href;
export const iconQobuz = new URL('../assets/qobuz.png', import.meta.url).href;
export const iconFilesystem = new URL(
  '../assets/filesystem.png',
  import.meta.url
).href;
export const iconTuneIn = new URL('../assets/tunein.png', import.meta.url).href;
export const iconYTMusic = new URL('../assets/ytmusic.png', import.meta.url)
  .href;
export const iconFallback = new URL('../assets/fallback.png', import.meta.url)
  .href;

export const iconAac = new URL('../assets/aac.png', import.meta.url).href;
export const iconFlac = new URL('../assets/flac.png', import.meta.url).href;
export const iconMp3 = new URL('../assets/mp3.png', import.meta.url).href;
export const iconOgg = new URL('../assets/ogg.png', import.meta.url).href;
export const iconVorbis = new URL('../assets/vorbis.png', import.meta.url).href;
export const iconM4a = new URL('../assets/m4a.png', import.meta.url).href;
export const iconHiRes = new URL('../assets/hires.png', import.meta.url).href;

export const getProviderIcon = function (providerDomain: string) {
  if (providerDomain == "spotify") return iconSpotify;
  if (providerDomain == "qobuz") return iconQobuz;
  if (providerDomain == "tunein") return iconTuneIn;
  if (providerDomain == "ytmusic") return iconYTMusic;
  return iconFilesystem;
};
export const getContentTypeIcon = function (contentType: ContentType) {
  if (contentType == ContentType.AAC) return 'aac';
  if (contentType == ContentType.FLAC) return 'flac';
  if (contentType == ContentType.MP3) return 'mp3';
  if (contentType == ContentType.MPEG) return 'mp3';
  if (contentType == ContentType.OGG) return 'ogg';
  if (contentType == ContentType.M4A) return 'm4a';
  return 'fallback';
};

export const getQualityDesc = function (provDetails: ProviderMapping) {
  if (!(provDetails.content_type in [ContentType.DSF, ContentType.FLAC, ContentType.AIFF, ContentType.WAV])) {
    // lossless
    if (provDetails.sample_rate > 48000 || provDetails.bit_depth > 16) {
      // hi res
      return `Lossless Hi-Res ${provDetails.content_type}`;
    }
    return `Lossless ${provDetails.content_type}`;
  }
  return 'Unknown media quality ';
};
</script>

<style scoped>
.provider-icons {
  vertical-align: middle;
  align-items: center;
  padding: 0px;
}


.provider-icon {
  float: inherit;
  display: flex;
  margin: 5px;
}
</style>
