<template>
  <div class="min-h-screen pb-12 relative overflow-hidden bg-xuanwu-bg">
    <!-- Background Texture/Decoration -->
    <div class="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#DDCBB5] to-transparent pointer-events-none opacity-60"></div>

    <div class="container mx-auto px-4 relative z-10 max-w-4xl">


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
        <p class="text-xs text-xuanwu-text-light mt-3 max-w-lg mx-auto leading-relaxed">玄武山佛祖灵签是广东陆丰碣石玄武山元山寺所供签文，在民间流传甚广，吸引众多信众前来求签问卜。本站收集了玄武山佛祖灵签共51签，仅供研究参考，请理性看待文化传统解读。</p>
      </div>

      <!-- Section 1: 求签掷杯 -->
      <FortuneDrawing />

      <!-- Section 2: 解签 -->
      <div class="mt-8">
        <div class="flex items-center justify-center gap-2 mb-6">
          <span class="w-12 h-px bg-xuanwu-border-dark"></span>
          <span class="text-xuanwu-text font-serif tracking-widest text-base">签 文 一 览</span>
          <span class="w-12 h-px bg-xuanwu-border-dark"></span>
        </div>

        <div v-if="pending" class="text-center py-10 text-xuanwu-text-light">
          读取签文中...
        </div>
        <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <NuxtLink
            v-for="(item, index) in list"
            :key="item.签号"
            :to="`/${String(index + 1).padStart(2, '0')}`"
            class="antique-card flex flex-col items-center justify-center p-5 group"
          >
            <div class="text-lg font-bold text-xuanwu-text mb-2 group-hover:text-xuanwu-red transition-colors">{{ item.签号 }}</div>
            <div class="text-sm text-xuanwu-text mb-3 font-medium">{{ item.签名 }}</div>
            <div class="flex gap-1.5 flex-wrap justify-center">
              <span class="tag-red" v-if="item.签文类型">{{ item.签文类型 }}</span>
              <span v-if="item.卦象" class="tag-paper">{{ item.卦象 }}</span>
            </div>
          </NuxtLink>
        </div>
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

const DATA_URL = `https://cdn.jsdelivr.net/gh/LeoonLiang/xuanwu-fozu-lingqian@main/data-lite/all.json?t=${Date.now()}`;

// 使用 useFetch 在构建时获取数据
const { data: list, pending } = await useFetch<FortuneStickLite[]>(DATA_URL, {
  // 缓存键，防止重复请求
  key: 'all-sticks' 
});
</script>
