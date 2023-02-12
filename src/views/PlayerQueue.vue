<template>
  <section>
    <PlayerQueue />
  </section>
</template>

<script setup lang="ts">
import { mdiCancel } from '@mdi/js';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import type { QueueItem, EventMessage, MediaItemType } from '../plugins/api/interfaces';
import {
  RepeatMode,
  EventType,
  MediaType,
} from '../plugins/api/interfaces';
import { api } from '../plugins/api';
import { computed, onBeforeUnmount, watchEffect } from 'vue';
import { store } from '../plugins/store';
import { useI18n } from 'vue-i18n';
import PlayerQueue from '../components/PlayerQueue.vue';

// global refs
const { t } = useI18n();

// local refs

const items = ref<QueueItem[]>([]);
const loading = ref(true);

// computed properties
const activePlayerQueue = computed(() => {
  if (store.selectedPlayer) {
    return api.queues[store.selectedPlayer.active_queue];
  }
  return undefined;
});

// listen for item updates to refresh items when that happens
const unsub = api.subscribe(
  EventType.QUEUE_ITEMS_UPDATED,
  (evt: EventMessage) => {
    if (evt.object_id == activePlayerQueue.value?.queue_id) {
      loadItems();
    }
  }
);
onBeforeUnmount(unsub);

store.topBarContextMenuItems = [
  {
    label: 'queue_clear',
    labelArgs: [],
    action: () => {
      api.queueCommandClear(activePlayerQueue.value!.queue_id);
    },
    icon: mdiCancel,
  },
];
onBeforeUnmount(() => {
  store.topBarContextMenuItems = [];
});

// methods
const loadItems = async function () {
  loading.value = true;
  if (activePlayerQueue.value) {
    store.topBarTitle = activePlayerQueue.value.display_name;
    items.value = await api.getPlayerQueueItems(
      activePlayerQueue.value.queue_id
    );
  } else {
    store.topBarTitle = undefined;
    items.value = [];
  }
  loading.value = false;
};

const onClick = function (item: QueueItem) {
  // mediaItem in the list is clicked
  selectedItem.value = item;
  showContextMenu.value = true;
};

const gotoItem = function (item: MediaItemType) {
  closeContextMenu();
  router.push({
    name: item.media_type,
    params: { item_id: item.item_id, provider: item.provider },
  });
};

const queueCommand = function (item: QueueItem | undefined, command: string) {
  closeContextMenu();
  if (!item || !activePlayerQueue.value) return;
  if (command == 'play_now') {
    api.queueCommandPlayIndex(activePlayerQueue?.value.queue_id, item.queue_item_id);
  } else if (command == 'move_next') {
    api.queueCommandMoveNext(activePlayerQueue?.value.queue_id, item.queue_item_id);
  } else if (command == 'up') {
    api.queueCommandMoveUp(activePlayerQueue?.value.queue_id, item.queue_item_id);
  } else if (command == 'down') {
    api.queueCommandMoveDown(activePlayerQueue?.value.queue_id, item.queue_item_id);
  } else if (command == 'delete') {
    api.queueCommandDelete(activePlayerQueue?.value.queue_id, item.queue_item_id);
  }
};

const closeContextMenu = function () {
  selectedItem.value = undefined;
  showContextMenu.value = false;
};

// watchers
watchEffect(() => {
  if (activePlayerQueue.value) {
    loadItems();
  }
});
</script>
