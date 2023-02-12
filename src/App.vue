<template>
  <router-view />
</template>

<script setup lang="ts">
import { api } from './plugins/api';
import { onMounted } from 'vue';


onMounted(() => {
  // Initialize API Connection
  // TODO: retrieve serveraddress through discovery and/or user settings ?
  let serverAddress = ''
  if (process.env.NODE_ENV === 'production') {
    const loc = window.location
    serverAddress = loc.origin + loc.pathname
  } else {
    serverAddress = 'http://192.168.1.170:8095/'
  }
  api.initialize(serverAddress);
})

</script>

<style>
* {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.selectable {
  -webkit-user-select: text;
  -khtml-user-select: text;
  -moz-user-select: text;
  -o-user-select: text;
  user-select: text;
}

a {
  cursor: pointer;
}

.vertical-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.right {
  float: right;
}

.left {
  float: left;
}

div.v-navigation-drawer__scrim {
  opacity: 0.8;
  background: grey;
}

.volumerow {
  height: 60px;
  padding-top: 5px;
  padding-bottom: 0px;
}

.v-slider.v-input--horizontal {
  margin-left: 0px;
  margin-right: 0px;
}

div.v-slide-group__next {
  margin-bottom: 5px;
}

div.v-slide-group__prev {
  margin-bottom: 5px;
}

.v-slide-group {
  align-items: self-end;
  padding-left: 30px;
  padding-right: 30px;
}

.hiresicon {
  position: absolute;
  margin-left: 5px;
  margin-top: -20px;
  height: 35px;
  width: 35px;
  border-radius: 5px;
}

.padded-overlay .v-overlay__content {
  padding: 50px;
}

.v-overlay__scrim {
  opacity: 65%;
}

.listitem-actions {
  display: flex;
  justify-content: end;
  height: 50px;
  vertical-align: middle;
  align-items: center;
  padding: 0px 0px 0px 10px;
}

.v-card {
  box-shadow: none;
  border-width: var(--ha-card-border-width, 1px);
  border-style: solid;
}

.text-caption {
  z-index: 3;
}

.v-list-item-subtitle {
  font-size: 0.6875rem;
}

.v-list-item-title {
  font-size: 0.875rem;
}

.v-footer {
  padding: 10px 10px;
}

.line-clamp-1 {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.line-clamp-2 {
  white-space: pre-line;
  overflow: hidden;
  line-height: 1.5em;
  height: 3em;
  word-wrap: break-word;
  box-sizing: border-box;
  display: -webkit-box;
  -webkit-line-clamp: 2;
}

.citl {
  position: relative;
  min-height: 14px;
}

.citl > div {
  position: absolute;
}

.citl > div > div {
  white-space: nowrap;
}

.list-item-subtitle-slider {
  min-height: 20px;
  padding: 8px 11px 8px;
}

.v-select__selection-text {
  font-size: 0.875rem;
}

.v-main {
  padding-top: calc(var(--v-layout-top) - 5px);
}

svg:focus {
  outline: 0px;
}
</style>
