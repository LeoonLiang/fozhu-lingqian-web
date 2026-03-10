<template>
  <div class="min-h-screen pb-12 relative bg-xuanwu-bg font-serif text-xuanwu-text">
    <!-- Background Texture -->
    <div class="fixed top-0 left-0 right-0 h-96 bg-gradient-to-b from-[#DDCBB5] to-transparent pointer-events-none opacity-40 z-0"></div>

    <div class="container mx-auto px-4 lg:px-8 py-6 relative z-10 max-w-6xl">
      <!-- Top Navigation -->
      <div class="mb-6 flex items-center justify-between">
         <NuxtLink to="/" class="inline-flex items-center gap-2 text-xuanwu-text-light hover:text-xuanwu-red transition-colors font-medium">
          <span class="text-xl leading-none">&laquo;</span>
          <span>返回签筒</span>
        </NuxtLink>
        <div class="text-xuanwu-red font-bold tracking-widest text-shadow-sm text-xl flex items-center gap-2">
          <span>玄武佛祖灵签</span>
        </div>
      </div>

      <div v-if="pending" class="text-center py-20 text-xuanwu-text-light text-lg">
        解读签文中...
      </div>
      <div v-else-if="error" class="text-center py-20 text-xuanwu-red text-lg">
        网络不佳，求签失败
      </div>
      
      <div v-else-if="data" class="flex flex-col lg:flex-row gap-6 items-start">
        
        <!-- Left Sidebar Navigation (Desktop) / Top Scroll (Mobile) -->
        <div class="w-full lg:w-64 flex-shrink-0 bg-xuanwu-paper border border-xuanwu-border shadow-sm rounded-sm p-3 relative">
          <!-- Inner ornate border for sidebar -->
          <div class="absolute inset-1 border border-xuanwu-border-dark opacity-30 pointer-events-none"></div>
          
          <!-- Mobile Custom Bottom Sheet Navigation -->
          <div class="block lg:hidden relative z-10 w-full mb-1">
            <button 
              @click="isMobileMenuOpen = true"
              class="w-full flex items-center justify-between bg-xuanwu-paper border border-xuanwu-border-dark/40 text-xuanwu-red font-medium py-3 px-4 rounded-sm shadow-sm transition-colors"
            >
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                   <path stroke-linecap="round" stroke-linejoin="round" :d="categories.find(c => c.id === activeCategory)?.icon || ''" />
                </svg>
                <span>{{ categories.find(c => c.id === activeCategory)?.label || '选择分类' }}</span>
              </div>
              <svg class="w-5 h-5 text-xuanwu-red/70 transition-transform duration-300" :class="{ 'rotate-180': isMobileMenuOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            <!-- Bottom Sheet Overlay -->
            <transition
              enter-active-class="transition-opacity duration-300 ease-out"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition-opacity duration-200 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-black/50 z-[100] sm:hidden" @click="isMobileMenuOpen = false"></div>
            </transition>

            <!-- Bottom Sheet Content -->
            <transition
              enter-active-class="transition-transform duration-300 ease-out"
              enter-from-class="translate-y-full"
              enter-to-class="translate-y-0"
              leave-active-class="transition-transform duration-200 ease-in"
              leave-from-class="translate-y-0"
              leave-to-class="translate-y-full"
            >
              <div v-if="isMobileMenuOpen" class="fixed bottom-0 left-0 right-0 bg-xuanwu-paper rounded-t-2xl z-[101] max-h-[80vh] flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.1)] sm:hidden">
                 <div class="flex justify-between items-center p-4 border-b border-xuanwu-border/40">
                   <h3 class="font-bold text-lg text-xuanwu-text">选择测算项目</h3>
                   <button @click="isMobileMenuOpen = false" class="p-2 text-xuanwu-text-light hover:text-xuanwu-red rounded-full transition-colors">
                     <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                     </svg>
                   </button>
                 </div>
                 <div class="overflow-y-auto p-4 flex-1 scrollbar-hide space-y-2">
                    <button 
                      v-for="cat in categories" 
                      :key="cat.id"
                      @click="activeCategory = cat.id; isMobileMenuOpen = false"
                      :class="[
                        'w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all',
                        activeCategory === cat.id 
                          ? 'bg-xuanwu-bg border border-xuanwu-border/50 text-xuanwu-red shadow-sm' 
                          : 'bg-transparent text-xuanwu-text active:bg-xuanwu-bg/50'
                      ]"
                    >
                      <svg 
                        :class="['w-5 h-5', activeCategory === cat.id ? 'text-xuanwu-red' : 'text-xuanwu-border-dark']"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"
                      >
                         <path stroke-linecap="round" stroke-linejoin="round" :d="cat.icon" />
                      </svg>
                      <span class="flex-1 text-left font-medium text-base">{{ cat.label }}</span>
                      <svg v-if="activeCategory === cat.id" class="w-5 h-5 text-xuanwu-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                 </div>
              </div>
            </transition>
          </div>

          <!-- Desktop Sidebar Navigation -->
          <div class="hidden lg:flex lg:flex-col gap-1 relative z-10 py-0 px-1">
            <button 
              v-for="cat in categories" 
              :key="cat.id"
              :class="[
                'flex flex-row items-center justify-start gap-3 px-4 py-3 rounded-sm transition-all duration-300 relative group text-left',
                activeCategory === cat.id 
                  ? 'text-xuanwu-red bg-xuanwu-bg shadow-inner border border-xuanwu-border-dark/20' 
                  : 'text-xuanwu-text hover:bg-xuanwu-paper-dark hover:text-xuanwu-red'
              ]"
              @click="activeCategory = cat.id"
            >
              <svg 
                :class="[
                  'w-5 h-5 transition-all duration-300',
                  activeCategory === cat.id ? 'text-xuanwu-red opacity-100' : 'text-xuanwu-border-dark opacity-60 group-hover:opacity-100'
                ]"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path stroke-linecap="round" stroke-linejoin="round" :d="cat.icon" />
              </svg>
              <span class="text-md font-medium leading-tight flex-1">{{ cat.label }}</span>
              <svg 
                v-if="activeCategory === cat.id" 
                class="w-4 h-4 text-xuanwu-red-light shrink-0" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Right Content Area -->
        <div class="flex-1 w-full space-y-6">
          
          <!-- Core Stick Info (Always visible or merged into overview) -->
          <div class="bg-xuanwu-paper shadow-antique rounded-sm p-1 relative">
            <div class="border-2 border-xuanwu-border border-double p-5 lg:p-8 bg-xuanwu-paper relative">
               <!-- Decorative corners -->
              <div class="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-xuanwu-border-dark"></div>
              <div class="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-xuanwu-border-dark"></div>
              <div class="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-xuanwu-border-dark"></div>
              <div class="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-xuanwu-border-dark"></div>

              <div class="stick-header flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-xuanwu-border border-dashed pb-6">
                 <div>
                    <h1 class="text-2xl lg:text-3xl font-bold text-xuanwu-red mb-3 flex items-center gap-3">
                      <span class="stick-number">{{ data.签号 }}</span>
                      <span class="w-px h-6 bg-xuanwu-red/30"></span>
                      <span class="stick-name">{{ data.签名 }}</span>
                    </h1>
                    <div class="stick-tags flex flex-wrap gap-2">
                      <span class="tag-red text-sm px-2 py-1">{{ data.签文类型 }}</span>
                      <span class="tag-paper text-sm px-2 py-1">{{ data.卦象 }}</span>
                      <span class="tag-paper text-sm px-2 py-1">生肖: {{ data.生肖 }}</span>
                    </div>
                 </div>
              </div>

              <!-- General Poem / Intro (visible when 'all' or 'home' is not specifically hiding it) -->
              <div class="intro-section pt-6" v-show="showSection('intro') || activeCategory === 'all'">
                <div class="poem-box flex items-start gap-4 mb-6">
                  <div class="poem-label w-10 h-10 bg-xuanwu-red text-white flex items-center justify-center font-bold writing-vertical-rl tracking-widest text-sm rounded-sm shrink-0">诗文</div>
                  <div>
                    <p class="poem-content text-lg lg:text-xl leading-loose font-medium text-xuanwu-text tracking-wide whitespace-pre-line">{{ data.签文简介.诗曰 }}</p>
                    <p class="poem-note text-xuanwu-text-light mt-2 text-sm italic">{{ data.签文简介.戏文 }}</p>
                  </div>
                </div>
                
                <div class="omen-box flex items-start gap-4">
                  <div class="omen-label w-10 h-10 bg-xuanwu-red text-white flex items-center justify-center font-bold writing-vertical-rl tracking-widest text-sm rounded-sm shrink-0">内兆</div>
                  <div>
                    <p class="omen-content text-lg lg:text-xl leading-loose font-medium text-xuanwu-text tracking-wide whitespace-pre-line">{{ data.签文简介.内兆 }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Section Cards -->
          <!-- 家宅 -->
          <section v-show="showSection('home')" class="home-section antique-card border-none bg-xuanwu-paper p-0">
             <div class="p-6 border border-xuanwu-border m-1">
                <h3 class="section-title text-xl font-bold text-xuanwu-red mb-4 border-b border-xuanwu-border pb-2 flex items-center gap-2">
                  <span class="text-xuanwu-border-dark">◈</span> 家宅运势
                </h3>
                <div class="section-content space-y-4">
                  <div class="home-omen flex items-start gap-3">
                    <span class="tag-red shrink-0 mt-1">签文</span>
                    <p class="text-xuanwu-text leading-relaxed">{{ data.家宅运势.签文 }}</p>
                  </div>
                  <div class="home-explanation flex items-start gap-3">
                    <span class="tag-red shrink-0 mt-1 opacity-90">解曰</span>
                    <p class="text-xuanwu-text font-medium leading-relaxed">{{ data.家宅运势.解曰 }}</p>
                  </div>
                </div>
             </div>
          </section>

          <!-- 岁君 -->
          <section v-show="showSection('age')" class="age-section antique-card border-none bg-xuanwu-paper p-0">
            <div class="p-6 border border-xuanwu-border m-1">
              <h3 class="section-title text-xl font-bold text-xuanwu-red mb-4 border-b border-xuanwu-border pb-2 flex items-center gap-2">
                  <span class="text-xuanwu-border-dark">◈</span> 岁君签
              </h3>
              <div class="age-poem mb-6 flex items-start gap-3">
                 <span class="tag-red shrink-0 mt-1">签诗</span>
                 <p class="font-medium text-lg flex-1 tracking-wider">{{ data.岁君签.总诗 }}</p>
              </div>
              
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-2">
                <div v-for="(age, i) in data.岁君签.年龄运势" :key="i" class="flex flex-col border border-xuanwu-border bg-xuanwu-paper rounded-sm shadow-sm overflow-hidden">
                  <div class="py-2 px-4 border-b border-xuanwu-border/50 text-center bg-xuanwu-border/10 font-bold text-xuanwu-red text-lg">
                    {{ age.年龄 }}
                  </div>
                  <div class="flex flex-col divide-y divide-xuanwu-border/30">
                    <div class="p-4 flex items-start gap-4 hover:bg-xuanwu-bg/30 transition-colors">
                      <div class="w-8 h-8 rounded-sm bg-xuanwu-border/20 flex flex-shrink-0 items-center justify-center font-bold text-xuanwu-text-light text-sm border border-xuanwu-border/50">男</div>
                      <p class="text-xuanwu-text leading-relaxed mt-0.5 text-[15px] flex-1">
                        <span v-if="age.男 === '吉' || age.男 === '凶'" :class="age.男 === '吉' ? 'text-xuanwu-red font-bold' : 'font-bold'">【{{ age.男 }}】</span>
                        <span v-else>{{ age.男 }}</span>
                      </p>
                    </div>
                    <div class="p-4 flex items-start gap-4 hover:bg-xuanwu-bg/30 transition-colors">
                      <div class="w-8 h-8 rounded-sm bg-xuanwu-border/20 flex flex-shrink-0 items-center justify-center font-bold text-xuanwu-text-light text-sm border border-xuanwu-border/50">女</div>
                      <p class="text-xuanwu-text leading-relaxed mt-0.5 text-[15px] flex-1">
                        <span v-if="age.女 === '吉' || age.女 === '凶'" :class="age.女 === '吉' ? 'text-xuanwu-red font-bold' : 'font-bold'">【{{ age.女 }}】</span>
                        <span v-else>{{ age.女 }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Standard Info Groups -->
          <template v-for="sec in standardSections" :key="sec.id">
            <section v-show="showSection(sec.id)" class="info-section antique-card border-none bg-xuanwu-paper p-0">
               <div class="p-6 border border-xuanwu-border m-1">
                  <h3 class="section-title text-xl font-bold text-xuanwu-red mb-4 border-b border-xuanwu-border pb-2 flex items-center gap-2">
                    <span class="text-xuanwu-border-dark">◈</span> {{ sec.title }}
                  </h3>
                  <div class="section-content space-y-4">
                    <!-- if entire section has no non-empty value show fallback message -->
                    <div v-if="!sectionHasAnyValue(sec.dataKey)" class="text-center text-xuanwu-text-light italic">
                      本签暂无文字描述，建议查看下方原图。
                    </div>
                    <div v-else>
                      <div v-for="(val, key) in data[sec.dataKey]" :key="key" class="info-row flex items-start gap-3">
                        <span :class="['info-label shrink-0 mt-1', String(key).includes('解曰') ? 'tag-red opacity-90 ' : 'tag-paper border-none bg-transparent font-bold text-xuanwu-text-light w-12 text-right relative']">
                          {{ key }}<span v-if="!String(key).includes('解曰')" class="absolute -right-2 top-0">:</span>
                        </span>
                        <p class="info-value text-xuanwu-text leading-relaxed flex-1" :class="String(key).includes('解曰') ? 'font-medium' : ''">
                          <template v-if="val && String(val).trim() !== ''">{{ val }}</template>
                          <template v-else class="text-xuanwu-text-light italic">详见下方图片</template>
                        </p>
                      </div>
                    </div>
                  </div>
               </div>
            </section>
          </template>

          <!-- Original Images (if any) box -->
          <div v-show="showSection('intro') || activeCategory === 'all'" class="image-gallery flex gap-4 overflow-x-auto pb-4 pt-4">
             <div class="w-32 h-32 md:w-48 md:h-48 border-[3px] border-xuanwu-border rounded-sm p-1 bg-xuanwu-paper shadow-sm shrink-0">
                 <img 
                  :src="getImageUrl(id, 1)" 
                  alt="签文图1" 
                  loading="lazy" 
                  class="w-full h-full object-cover rounded-sm sepia-[.2] cursor-zoom-in hover:opacity-90 transition-opacity" 
                  @click="onShow(0)"
                />
             </div>
             <div class="w-32 h-32 md:w-48 md:h-48 border-[3px] border-xuanwu-border rounded-sm p-1 bg-xuanwu-paper shadow-sm shrink-0">
                 <img 
                  :src="getImageUrl(id, 2)" 
                  alt="签文图2" 
                  loading="lazy" 
                  class="w-full h-full object-cover rounded-sm sepia-[.2] cursor-zoom-in hover:opacity-90 transition-opacity" 
                  @click="onShow(1)"
                />
             </div>
          </div>

        </div>
      </div>

      <!-- Image Preview Lightbox -->
      <client-only>
        <VueEasyLightbox
          :visible="visibleRef"
          :imgs="imgsRef"
          :index="indexRef"
          @hide="onHide"
        />
      </client-only>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FortuneStick } from '~/types/lingqian'
import VueEasyLightbox from 'vue-easy-lightbox'

const route = useRoute()
const id = route.params.id as string

const DATA_URL = `https://cdn.jsdelivr.net/gh/LeoonLiang/xuanwu-fozu-lingqian@main/data/${id}.json?t=${Date.now()}`

const { data, pending, error } = await useFetch<FortuneStick>(DATA_URL, {
  key: `stick-${id}`
})

// 分类配置 & SVG Icons
const categories = [
  { id: 'all', label: '全部总览', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
  { id: 'intro', label: '签文简介', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { id: 'home', label: '家宅运势', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { id: 'age', label: '岁君签', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { id: 'business', label: '生意求财', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { id: 'money', label: '谋望', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { id: 'study', label: '学艺功名', icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z' },
  { id: 'stock', label: '行舟六畜', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
  { id: 'move', label: '移徙出外', icon: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' },
  { id: 'walker', label: '行人', icon: 'M13 7h8m0 0v8m0-8l-9.995 2.151 4.196 4.197m-4.2-4.2L5.5 18' },
  { id: 'marriage', label: '婚姻', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
  { id: 'law', label: '官讼', icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3' },
  { id: 'lost', label: '失物', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
  { id: 'sick', label: '占病', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
  { id: 'other', label: '其他', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
]

// To dynamically render similar sections without repeating code
const standardSections = [
  { id: 'business', title: '生意', dataKey: '生意' },
  { id: 'money', title: '谋望求财', dataKey: '谋望求财' },
  { id: 'study', title: '学艺功名', dataKey: '学艺功名' },
  { id: 'stock', title: '行舟六畜', dataKey: '行舟六畜' },
  { id: 'move', title: '移徙', dataKey: '移徙' },
  { id: 'walker', title: '行人', dataKey: '行人' },
  { id: 'marriage', title: '婚姻', dataKey: '婚姻' },
  { id: 'law', title: '官讼', dataKey: '官讼' },
  { id: 'lost', title: '失物', dataKey: '失物' },
  { id: 'sick', title: '占病', dataKey: '占病' },
  { id: 'other', title: '其他', dataKey: '其他' },
]

const activeCategory = ref('all')
const isMobileMenuOpen = ref(false)

// Lightbox state
const visibleRef = ref(false)
const indexRef = ref(0)
const imgsRef = ref<string[]>([])

const onShow = (index: number) => {
  imgsRef.value = [getImageUrl(id, 1), getImageUrl(id, 2)]
  indexRef.value = index
  visibleRef.value = true
}

const onHide = () => (visibleRef.value = false)

function showSection(catId: string) {
  if (activeCategory.value === 'all') return true;
  // Specific fallbacks to make sure data is shown logically
  if (activeCategory.value === 'intro' && catId === 'intro') return true;
  return activeCategory.value === catId;
}

/**
 * return true when at least one non-empty value exists in that section data object
 */
function sectionHasAnyValue(dataKey: string) {
  const obj = data.value?.[dataKey];
  if (!obj || typeof obj !== 'object') return false;
  return Object.values(obj).some((v) => v && String(v).trim() !== '');
}

// 辅助函数：生成图片 URL
function getImageUrl(id: string, index: number) {
  return `https://cdn.jsdelivr.net/gh/LeoonLiang/xuanwu-fozu-lingqian@main/image/${parseInt(id)}_${index}.jpg`
}
// SEO Meta
useSeoMeta({
  title: () => data.value ? `${data.value.签号} ${data.value.签名} - 汕尾玄武山佛祖灵签` : '灵签详情',
  description: () => data.value ? `汕尾玄武山佛祖灵签${data.value.签号}${data.value.签名}。${data.value.签文类型}。诗曰：${data.value.签文简介?.诗曰 || ''}` : '',
  ogTitle: () => data.value ? `${data.value.签号} ${data.value.签名} - 汕尾玄武山佛祖灵签` : '灵签详情',
  ogDescription: () => data.value ? `玄武佛祖灵签${data.value.签号}${data.value.签名}。${data.value.签文类型}。` : '',
})
</script>

<style scoped>
/* Custom utility to hide scrollbar for horizontal nav on mobile */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

/* Vertical Text for tags */
.writing-vertical-rl {
  writing-mode: vertical-rl;
  text-orientation: upright;
}
</style>
