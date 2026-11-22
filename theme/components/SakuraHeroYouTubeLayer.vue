<script lang="ts" setup>
import type { YouTubePlayer } from '../core/utils/youtubePlayer'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { getYouTubeId } from '../core/utils'
import { loadYouTubeApi, registerYouTubePlayer, unregisterYouTubePlayer } from '../core/utils/youtubePlayer'
import { useSakuraAppStore } from '../stores'

const props = defineProps<{
  layer: {
    id: number
    url: string
    isPlaying: boolean
  }
}>()

const sakura = useSakuraAppStore()
const containerId = `sakura-hero-yt-${props.layer.id}`
const player = ref<YouTubePlayer | null>(null)
let disposed = false

function syncSound() {
  const instance = player.value
  if (!instance)
    return
  if (sakura.wallpaperSoundEnabled)
    instance.unMute()
  else
    instance.mute()
}

onMounted(async () => {
  const videoId = getYouTubeId(props.layer.url)
  if (!videoId)
    return

  try {
    const YT = await loadYouTubeApi()
    if (disposed)
      return

    const instance = new YT.Player(containerId, {
      videoId,
      playerVars: {
        autoplay: 1,
        mute: 1,
        controls: 0,
        loop: 1,
        playlist: videoId,
        playsinline: 1,
        rel: 0,
        iv_load_policy: 3,
        disablekb: 1,
      },
      events: {
        onReady: () => {
          if (disposed) {
            instance.destroy()
            return
          }
          player.value = instance
          registerYouTubePlayer(containerId, videoId, instance)
          syncSound()
        },
      },
    })
  }
  catch {
    // API 加载失败时保持静默，进度条只展示轨道部分
  }
})

watch(() => sakura.wallpaperSoundEnabled, syncSound)

watch(() => props.layer.isPlaying, (playing) => {
  const instance = player.value
  if (!instance)
    return
  if (playing) {
    instance.playVideo()
    syncSound()
  }
})

onBeforeUnmount(() => {
  disposed = true
  unregisterYouTubePlayer(containerId)
  player.value?.destroy()
  player.value = null
})
</script>

<template>
  <div class="sakura-hero-yt">
    <div :id="containerId" class="sakura-hero-yt-container" />
  </div>
</template>

<style lang="scss">
.sakura-hero-yt {
  width: 100%;
  height: 100%;

  > iframe {
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
  }
}
</style>
