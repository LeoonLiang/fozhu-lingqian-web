// nuxt.config.ts
const baseURL = process.env.NUXT_APP_BASE_URL || '/'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // 开启静态站点生成 (SSG)
  ssr: true,

  app: {
    baseURL: baseURL,
    head: {
      title: '汕尾玄武山佛祖灵签',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '玄武山佛祖灵签在线求签' },
        { name: 'theme-color', content: '#ffffff' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: `${baseURL}favicon.ico` },
        { rel: 'apple-touch-icon', sizes: '180x180', href: `${baseURL}apple-touch-icon.png` },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: `${baseURL}favicon-32x32.png` },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: `${baseURL}favicon-16x16.png` },
        { rel: 'manifest', href: `${baseURL}site.webmanifest` }
      ]
    }
  },

  // 预渲染所有路由 (可选，Nuxt Crawler 通常能自动处理链接)
  nitro: {
    preset: 'github-pages'
  },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/seo'
  ],

  site: {
    url: 'https://leoonliang.github.io',
    name: '玄武山佛祖灵签',
    description: '玄武山佛祖灵签在线求签，心诚则灵。提供五十一签详细解签，包括诗曰、家宅、岁君、生意、谋望、婚姻等全方位运势解析。',
    defaultLocale: 'zh-CN', 
  },

  schemaOrg: {
    identity: 'Organization',
  },

  sitemap: {
    // 自动扫描路由
  },

  robots: {
    disallow: []
  }
})
