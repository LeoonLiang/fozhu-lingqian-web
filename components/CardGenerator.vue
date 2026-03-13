<template>
  <div>
    <!-- 生成卡片按钮 - 悬浮在右下角 -->
    <button
      @click="openSelectModal"
      class="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-6 py-3 bg-xuanwu-red text-white font-medium rounded-full shadow-lg hover:bg-xuanwu-red/90 hover:shadow-xl transition-all hover:scale-105"
    >
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span>生成卡片</span>
    </button>

    <!-- 选择模态框 -->
    <transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="showSelectModal" class="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-4" @click.self="closeSelectModal">
        <div class="bg-xuanwu-paper rounded-lg shadow-2xl max-w-md w-full p-6 relative border-2 border-xuanwu-border">
          <button @click="closeSelectModal" class="absolute top-4 right-4 text-xuanwu-text-light hover:text-xuanwu-red transition-colors">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h3 class="text-2xl font-bold text-xuanwu-red mb-6">选择年龄和性别</h3>

          <!-- 年龄选择 -->
          <div class="mb-6">
            <label class="block text-xuanwu-text font-medium mb-3">年龄段</label>
            <div class="grid grid-cols-2 gap-3">
              <button
                v-for="age in ageOptions"
                :key="age.年龄"
                @click="selectedAge = age.年龄"
                :class="[
                  'px-4 py-3 rounded-md border-2 transition-all font-medium',
                  selectedAge === age.年龄
                    ? 'bg-xuanwu-red text-white border-xuanwu-red'
                    : 'bg-white text-xuanwu-text border-xuanwu-border hover:border-xuanwu-red'
                ]"
              >
                {{ age.年龄 }}
              </button>
            </div>
          </div>

          <!-- 性别选择 -->
          <div class="mb-6">
            <label class="block text-xuanwu-text font-medium mb-3">性别</label>
            <div class="grid grid-cols-2 gap-3">
              <button
                @click="selectedGender = '男'"
                :class="[
                  'px-4 py-3 rounded-md border-2 transition-all font-medium',
                  selectedGender === '男'
                    ? 'bg-xuanwu-red text-white border-xuanwu-red'
                    : 'bg-white text-xuanwu-text border-xuanwu-border hover:border-xuanwu-red'
                ]"
              >
                男
              </button>
              <button
                @click="selectedGender = '女'"
                :class="[
                  'px-4 py-3 rounded-md border-2 transition-all font-medium',
                  selectedGender === '女'
                    ? 'bg-xuanwu-red text-white border-xuanwu-red'
                    : 'bg-white text-xuanwu-text border-xuanwu-border hover:border-xuanwu-red'
                ]"
              >
                女
              </button>
            </div>
          </div>

          <!-- 生成按钮 -->
          <button
            @click="generateCard"
            :disabled="!selectedAge || !selectedGender || isGenerating"
            class="w-full py-3 bg-xuanwu-red text-white font-bold rounded-md hover:bg-xuanwu-red/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isGenerating ? '生成中...' : '生成卡片' }}
          </button>
        </div>
      </div>
    </transition>

    <!-- 预览模态框 -->
    <transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="showPreviewModal" class="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center p-4 overflow-y-auto" @click.self="closePreviewModal">
        <div class="bg-xuanwu-paper rounded-lg shadow-2xl max-w-2xl w-full p-6 relative my-8">
          <button @click="closePreviewModal" class="absolute top-4 right-4 text-xuanwu-text-light hover:text-xuanwu-red transition-colors z-10">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h3 class="text-2xl font-bold text-xuanwu-red mb-4">卡片预览</h3>

          <!-- 生成的图片 -->
          <div class="mb-4 flex justify-center">
            <img v-if="generatedImage" :src="generatedImage" alt="生成的卡片" class="max-w-full h-auto rounded-md shadow-lg" />
          </div>

          <!-- 下载按钮 -->
          <button
            @click="downloadImage"
            class="w-full py-3 bg-xuanwu-red text-white font-bold rounded-md hover:bg-xuanwu-red/90 transition-colors flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>下载图片</span>
          </button>
        </div>
      </div>
    </transition>

    <!-- 隐藏的卡片渲染容器 - 在这里写你的卡片样式 -->
    <div ref="cardContainer" class="fixed top-[99999px]">
      <div class="card-container relative w-[640px] bg-center overflow-hidden ">
        <img src="/card/山 1.png" class="mountain1" alt="山" />
        <img src="/card/山 2.png" class="mountain2 " alt="山" />
        <img src="/card/寺庙.png" class="temple" alt="寺庙 ">
        <img src="/card/title1.png" class="card-title1" alt="">
        <img src="/card/title2.png" class="card-title2" alt="">
        <div class="card-content">
          <div class="sign-num"> <span class="sign-f"></span> {{ data.签号 }} <span class="sign-b"></span></div>
          <div class="sign-name">{{ data.签名 }}</div>
          <div class="sign-content-item">
            <div class="line"></div>
            <div class="sign-content-item-title">【签文】</div>
            <div class="sign-content-item-text">{{ data.签文简介.诗曰 }}</div>
          </div>
          <div class="sign-content-item">
            <div class="line"></div>
            <div class="sign-content-item-title">【签文典故】</div>
            <div class="sign-content-item-text">{{ data.签文简介.戏文 }}</div>
          </div>
            <div class="sign-content-item">
              <div class="line"></div>
              <div class="sign-content-item-title">【运势解析】</div>
              <div class="sign-content-item-text"><span>岁君：</span> <span>{{ fortuneText }}</span></div>
              <div class="sign-content-item-text"><span>谋望：</span><span>{{ data.谋望求财.谋望 }}</span></div>
              <div class="sign-content-item-text"><span>求财：</span><span>{{ data.谋望求财.求财 }}</span></div>
              <div class="sign-content-item-text"><span>婚姻：</span><span>{{ data.婚姻.解曰 }}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FortuneStick } from '~/types/lingqian'
import { toJpeg } from 'html-to-image';
const props = defineProps<{
  data: FortuneStick
}>()

const showSelectModal = ref(false)
const showPreviewModal = ref(false)
const isGenerating = ref(false)
const selectedAge = ref('')
const selectedGender = ref<'男' | '女' | ''>('')
const generatedImage = ref('')
const cardContainer = ref<HTMLElement | null>(null)

// 从岁君签数据中提取年龄选项
const ageOptions = computed(() => {
  return props.data.岁君签?.年龄运势 || []
})

// 获取选中的运势文字
const fortuneText = computed(() => {
  if (!selectedAge.value || !selectedGender.value) return ''
  const ageData = ageOptions.value.find(item => item.年龄 === selectedAge.value)
  return ageData?.[selectedGender.value] || ''
})

const openSelectModal = () => {
  showSelectModal.value = true
  selectedAge.value = ''
  selectedGender.value = ''
}

const closeSelectModal = () => {
  showSelectModal.value = false
}

const closePreviewModal = () => {
  showPreviewModal.value = false
  generatedImage.value = ''
}

const generateCard = async () => {
  if (!selectedAge.value || !selectedGender.value || !cardContainer.value) return

  isGenerating.value = true

  try {
    // 等待下一帧确保 DOM 更新
    await nextTick()

    toJpeg(cardContainer.value.firstElementChild as HTMLElement).then((dataUrl) => {
      generatedImage.value = dataUrl
      // 关闭选择框，打开预览框
      showSelectModal.value = false
      showPreviewModal.value = true
    })
  
  } catch (error) {
    console.error('生成卡片失败:', error)
    alert('生成卡片失败，请重试')
  } finally {
    isGenerating.value = false
  }
}

const downloadImage = () => {
  if (!generatedImage.value) return

  const link = document.createElement('a')
  link.download = `玄武灵签-${props.data.签号}-${selectedAge.value}-${selectedGender.value}.jpg`
  link.href = generatedImage.value
  link.click()
}
</script>


<style lang="scss">
.card-container {
  background-image: url('/card/纹理背景.jpg');
  padding: 30px 80px ;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  .mountain1 {
    position: absolute;
    top: 30px;
    right: 60px;
    width: 200px;
  }
  .mountain2 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 220px;
  }
  .temple {
    position: absolute;
    top: 30px;
    left: 60px;
    width: 120px;
  }
  .card-title1 {
    height: 50px;
    width: auto;
    margin-bottom: 8px;
  }
  .card-title2 {
    height: 20px;
    width: auto;
    margin-bottom: 32px;
  }
  .card-content {
    background-image: url('/card/边框.png');
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: 12px 30px;
    padding-bottom: 120px;
  }
  .sign-num {
    font-size: 32px;
    font-weight: bold;
    color: #56281a;
    margin-bottom: 4px;
    position: relative;
    display: inline-block;
    .sign-b {
      display: block;
      background-image: url('/card/文字装饰线.png');
      background-repeat: no-repeat;
      width: 50px;
      height: 4px;
      background-size: 100% 100%;
      position: absolute;
      right: -60px;
      top: 50%;
      transform: translateY(-50%);
    }
    .sign-f {
      display: block;
      background-image: url('/card/文字装饰线.png');
      background-repeat: no-repeat;
      width: 50px;
      height: 4px;
      background-size: 100% 100%;
      position: absolute;
      left: -60px;
      top: 50%;
      transform: translateY(-50%) rotate(180deg);
    }
  }
  .sign-name {
    font-size: 48px;
    color: #56281a;
    margin-bottom: 20px;
    font-weight: bold;
  }
  .sign-content-item {
    padding: 24px 0;
    position: relative;
    text-align: left;
    .line {
      display: block;
      width: 90%;
      height: 10px;
      background-image: url('/card/分割线.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
    .sign-content-item-title {
      font-size: 20px;
      font-weight: bold;
      color: #56281a;
      margin-bottom: 12px;
      font-weight: bold;
    }
    .sign-content-item-text {
      font-size: 14px;
      font-weight: bold;
      color: rgba($color: #000000, $alpha: 0.85);
      display: flex;
      
      span:first-child {
        color: rgba($color: #000000, $alpha: 1);
        white-space: nowrap;
      }
      & + .sign-content-item-text {
        margin-top: 6px;
      }
    }
  }
}
</style>