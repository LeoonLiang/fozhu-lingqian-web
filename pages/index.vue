<template>
  <div class="min-h-screen pb-12 relative overflow-hidden bg-xuanwu-bg">
    <!-- Background Texture/Decoration -->
    <div class="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#DDCBB5] to-transparent pointer-events-none opacity-60"></div>

    <div class="container mx-auto px-4 relative z-10 max-w-lg">
      <!-- Header -->
      <div class="text-center pt-10 pb-6">
        <h1 class="text-3xl font-bold text-xuanwu-red font-serif tracking-widest text-shadow mb-2 flex items-center justify-center gap-2">
          <span>玄武佛祖灵签</span>
        </h1>
        <div class="flex items-center justify-center gap-2 text-xuanwu-text-light text-sm mt-1">
          <span class="w-12 h-px bg-xuanwu-border-dark"></span>
          <span>五十—签 仙机妙解</span>
          <span class="w-12 h-px bg-xuanwu-border-dark"></span>
        </div>
      </div>


      <!-- Decorative Divider -->
      <div class="flex justify-center mb-6">
        <div class="w-32 h-2 opacity-50 flex items-center justify-between">
          <span class="w-full h-px bg-xuanwu-border-dark"></span>
          <span class="mx-2 text-xuanwu-border-dark text-xs">◈</span>
          <span class="w-full h-px bg-xuanwu-border-dark"></span>
        </div>
      </div>

      <!-- Card Grid -->
      <div v-if="pending" class="text-center py-10 text-xuanwu-text-light">
        读取签文中...
      </div>
      <div v-else class="grid grid-cols-2 gap-4">
        <NuxtLink 
          v-for="(item, index) in list" 
          :key="item.签号" 
          :to="`/${String(index + 1).padStart(2, '0')}`"
          class="antique-card flex flex-col items-center justify-center p-5 group"
        >
          <div class="text-lg font-bold text-xuanwu-text mb-2 group-hover:text-xuanwu-red transition-colors">{{ item.签号 }}</div>
          <div class="text-sm text-xuanwu-text mb-3 font-medium">{{ item.签名 }}</div>
          <div class="flex gap-1.5 flex-wrap justify-center">
            <!-- Mock tags for visual parity with design, mixing real type with static -->
            <span class="tag-red" v-if="item.签文类型">{{ item.签文类型 }}</span>
            <span class="tag-paper">{{ item.卦象 }}</span>
          </div>
        </NuxtLink>
      </div>

      <!-- Footer Stats -->
      <div class="text-center mt-12 text-sm text-xuanwu-text-light relative">
        <div class="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-8 pointer-events-none opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBkPSJNMTAgNTBRMjUgMzAgNTAgNTBUNzUgNTBUMTAwIDUwIiBzdHJva2U9IiM1NSIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==')] bg-repeat-x bg-center" style="background-size: 100px 30px;"></div>
        <span class="bg-xuanwu-bg px-2 relative z-10">今日已有 <span class="text-xuanwu-text font-bold">1283</span> 人求签</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FortuneStickLite } from '~/types/lingqian'

useSeoMeta({
  title: '汕尾玄武山佛祖灵签 - 在线求签 | 五十一签解签',
  description: '汕尾玄武山佛祖灵签在线求签，心诚则灵。本站提供完整的汕尾玄武山佛祖灵签五十一签解签，包含诗曰、家宅、岁君、生意、谋望、婚姻、出外、求财等详细运势解析。',
  keywords: '汕尾玄武山佛祖灵签,佛祖灵签,观音灵签,在线求签,解签,抽签,算命,运势,汕尾玄武山,陆丰玄武山',
  ogTitle: '汕尾玄武山佛祖灵签 - 在线求签 | 五十一签解签',
  ogDescription: '汕尾玄武山佛祖灵签在线求签，心诚则灵。本站提供完整的玄武山佛祖灵签五十一签解签。',
  ogImage: '/preview.png',
  twitterCard: 'summary_large_image',
})

const DATA_URL = 'https://cdn.jsdelivr.net/gh/LeoonLiang/xuanwu-fozu-lingqian@main/data-lite/all.json';

// 使用 useFetch 在构建时获取数据
const { data: list, pending } = await useFetch<FortuneStickLite[]>(DATA_URL, {
  // 缓存键，防止重复请求
  key: 'all-sticks' 
});
</script>
