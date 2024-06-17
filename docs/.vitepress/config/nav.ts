import type { DefaultTheme } from 'vitepress';

export const nav: DefaultTheme.Config['nav'] = [
  {
    text: 'Java',
    items: [
      { text: 'Java 基础', link: '/courses/java/basic/01-Java基础入门/01-Java基础数据类型', activeMatch: '/courses/java/basic' },
      { text: '面向对象', link: '#', activeMatch: '#' },
      { text: '集合', link: '#', activeMatch: '#' },
      { text: 'IO', link: '#', activeMatch: '#' },
      { text: 'JVM', link: '#', activeMatch: '#' }
    ],
    activeMatch: '/courses/'
  },
  {
    text: '标签',
    link: '/tags',
    activeMatch: '/tags'
  },
  {
    text: '时光轴',
    link: '/archives',
    activeMatch: '/archives'
  },
  {
    text: '关于',
    items: [
      { text: '关于知识库', link: '/about/index', activeMatch: '/about/index' },
      { text: '关于我', link: '/about/me', activeMatch: '/about/me' }
    ],
    activeMatch: '/about/' // // 当前页面处于匹配路径下时, 对应导航菜单将突出显示
  },
];