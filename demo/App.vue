<script lang="ts" setup>
import { onMounted } from 'vue'

function setupLrcIconHidingObserver() {
  const observer = new MutationObserver((mutations) => {
    const lrcElement = document.querySelector('.aplayer-lrc .aplayer-lrc-contents .aplayer-lrc-current') as HTMLElement
    const lrcButton = document.querySelector('.aplayer-icon-lrc') as HTMLElement
    function removelrc() {
      if (lrcElement) {
        lrcElement.style.display = 'none'
        if (lrcElement.textContent !== 'Loading') {
          lrcButton.click()
          lrcElement.style.display = ''
          observer.disconnect()
        }
      }
    }
    mutations.forEach((_mutation) => {
      removelrc()
    })
  })
  observer.observe(document.body, { childList: true, subtree: true })
}

function setupAplayerVisibilityObserver() {
  let hasExecuted = false
  const observer = new MutationObserver((mutations) => {
    function hiddenAplayer() {
      if (hasExecuted)
        return
      const aplayerNarrowElement = document.querySelector('.aplayer.aplayer-withlist.aplayer-fixed.aplayer-narrow .aplayer-body') as HTMLElement
      if (aplayerNarrowElement) {
        hasExecuted = true
        setTimeout(() => {
          aplayerNarrowElement.style.display = 'initial'
          requestAnimationFrame(() => {
            aplayerNarrowElement.style.left = '-66px'
            onMetingLoad()
            observer.disconnect()
          })
        }, 0)
      }
      else {
        const aplayerFixedElement = document.querySelector('.aplayer.aplayer-withlist.aplayer-fixed .aplayer-body') as HTMLElement
        if (aplayerFixedElement)
          aplayerFixedElement.style.left = '0'
        return false
      }
    }
    mutations.forEach((_mutation) => {
      hiddenAplayer()
    })
  })
  observer.observe(document.body, { childList: true, subtree: true })
}

function onMetingLoad() {
  setupAplayerVisibility()
}

function setupAplayerVisibility() {
  const aplayerFixedElement = document.querySelector('.aplayer.aplayer-withlist.aplayer-fixed .aplayer-body') as HTMLElement
  const aplayerIconButton = document.querySelector('.aplayer-body .aplayer-miniswitcher .aplayer-icon') as HTMLElement

  let aplayerNarrow = true

  function toggleAplayerVisibility() {
    aplayerNarrow = !aplayerNarrow
  }

  function hiddenAplayer() {
    if (aplayerNarrow)
      aplayerFixedElement.style.left = '-66px'
  }

  function showAplayer() {
    aplayerFixedElement.style.left = '0'
  }

  aplayerFixedElement.addEventListener('mouseenter', showAplayer)
  aplayerFixedElement.addEventListener('mouseleave', hiddenAplayer)
  aplayerIconButton.addEventListener('click', toggleAplayerVisibility)
}

onMounted(() => {
  setupLrcIconHidingObserver()
  setupAplayerVisibilityObserver()
})
</script>

<template>
  <div />
</template>
