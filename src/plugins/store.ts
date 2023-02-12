import type { Player } from './api/interfaces';
import { reactive } from 'vue';
import type { LocationQuery, RouteParams, RouteMeta } from 'vue-router';

import type { ContextMenuItem } from '../components/MediaItemContextMenu.vue';

interface Store {
  selectedPlayer?: Player;
  isInStandaloneMode: boolean;
  showPlayersMenu: boolean;
  showFullscreenPlayer: boolean;
  showContextMenu: boolean;
  showBackgroundJobs: boolean;
  showSettings: boolean;
  showTabsNav: boolean;
  getDisplaySize: { height: number; width: number };
  darkTheme: boolean;
  topBarTitle?: string;
  topBarContextMenuItems: ContextMenuItem[];
  blockGlobalPlayMenu: boolean;
  alwaysShowMenuButton: boolean;
  apiInitialized: boolean;
  apiBaseUrl: string;
  prevRoutes: Array<{
    name: string;
    path: string;
    params: RouteParams;
    query: LocationQuery;
    meta: RouteMeta;
  }>;
  loading: boolean;
}

export const store: Store = reactive({
  selectedPlayer: undefined,
  isInStandaloneMode: false,
  showPlayersMenu: false,
  showFullscreenPlayer: false,
  showContextMenu: false,
  showBackgroundJobs: false,
  showSettings: true,
  showTabsNav: true,
  getDisplaySize: { height: 0, width: 0 },
  darkTheme: false,
  topBarContextMenuItems: [],
  blockGlobalPlayMenu: false,
  alwaysShowMenuButton: false,
  apiInitialized: false,
  apiBaseUrl: '',
  prevRoutes: [],
  loading: false
});
