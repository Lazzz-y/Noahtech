import type { DefaultTheme } from 'vitepress';

export const nav: DefaultTheme.Config['nav'] = [
  {
    text: 'Java',
    items: [
      { text: 'Java 基础', link: '/courses/java/basic/01-Java基础入门/01-Java基础数据类型',
        activeMatch: '/courses/java/basic/01-JAVA基础入门' },
      { text: '面向对象', link: '#', activeMatch: '/courses/java/basic/02-JAVA面向对象' },
      { text: '集合', link: '#', activeMatch: '/courses/java/advance/01-集合框架' },
      { text: 'IO', link: '#', activeMatch: '/courses/java/advance/02-IO' },
      { text: 'JVM', link: '/courses/java/advance/03-JVM/01-初识JVM', activeMatch: '/courses/java/advance/03-JVM' },
      { text: 'JUC并发编程', link: '/courses/java/advance/03-JVM/01-初识JVM', activeMatch: '/courses/java/advance/04-JUC'  },
    ],
    activeMatch: '/courses/java'
  },
  {
    text: '数据库',
    items: [
      { text: 'MySQL 基础', link: '/courses/数据库/01-MySQL基础', activeMatch: '/courses/数据库/01-MySQL基础' },
      { text: 'MySQL 进阶', link: '/courses/数据库/02-MySQL进阶/01-事务特点及原理',
        activeMatch: '/courses/数据库/02-MySQL进阶/01-事务特点及原理' },
      { text: 'Redis 基础', link: '#', activeMatch: '#' },
      { text: 'Redis 进阶', link: '/courses/数据库/04-Redis进阶/01-Redis配置文件详解', activeMatch: '/courses/数据库/04-Redis进阶' },
      { text: 'MongoDB 基础', link: '#', activeMatch: '#' },
      { text: 'MongoDB 进阶', link: '#', activeMatch: '#' },
      { text: 'ElasticSearch 基础', link: '#', activeMatch: '#' },
      { text: 'ElasticSearch 进阶', link: '#', activeMatch: '#' },
    ],
    activeMatch: '/courses/数据库'
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