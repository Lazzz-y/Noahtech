import { defineConfig } from 'vite';
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
import {
  GitChangelog,
  GitChangelogMarkdownSection,
} from '@nolebase/vitepress-plugin-git-changelog/vite'

export default defineConfig({
  plugins: [
    Components({
      dirs: ['.vitepress/theme/components'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [ArcoResolver({ sideEffect: true, resolveIcons: true })]
    }),
    GitChangelog({
      repoURL: () => "https://github.com/Noah2Y/Noahtech",

    }),
    GitChangelogMarkdownSection({
    }),
  ],
  ssr: { noExternal: ['@arco-design/web-vue'] },
  resolve: {
    alias: {
      'mermaid': 'mermaid/dist/mermaid.esm.mjs',
    },
  },
});
