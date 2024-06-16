import DefaultTheme from 'vitepress/theme'
import MyLayout from './MyLayout.vue';
import './styles/vars.css';
import './styles/custom.css';
import axios from 'axios';
import api from './api/index';

/**
 * Git提交日志
 */
import {
  NolebaseGitChangelogPlugin
} from '@nolebase/vitepress-plugin-git-changelog/client'

import '@nolebase/vitepress-plugin-git-changelog/client/style.css'

export default {
  ...DefaultTheme,
  Layout: MyLayout,
  enhanceApp(ctx) {
    // extend default theme custom behaviour.
    DefaultTheme.enhanceApp(ctx);

    // 全局挂载 API 接口
    ctx.app.config.globalProperties.$http = axios
    if (typeof window !== 'undefined') {
        window.$api = api;
    }
    // register your custom global components
    // ctx.app.component('MyGlobalComponent' /* ... */)
    // ctx.app.use(NolebaseGitChangelogPlugin)
  }
}