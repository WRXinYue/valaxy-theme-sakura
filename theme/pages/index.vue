<script setup lang="ts">
const hello = 'Hello, sakura'
const motto = 'You got to put the past behind you before you can move on.'
const social = []
const cover = 'https://tva2.sinaimg.cn/large/0060lm7Tly1fpx1skrabaj31hc0u01kx.jpg'
</script>

<template>
  <!-- <StarterPostList /> -->
  <div class="banner" :style="`background-image: url(${cover})`">
    <div class="wave1" />
    <div class="wave2" />
    <div class="info">
      <GlitchText :text="hello" />
      <span class="box">
        <p class="text">
          <i class="fa fa-quote-left" />
          {{ motto }}
          <i class="fa fa-quote-right" />
        </p>
        <div class="contact">
          <!-- <a
            v-for="s in social"
            :href="s.url"
            aria-label="icon"
            target="_blank"
          >
            <i class="fab" :class="[s.icon]" />
          </a> -->
        </div>
      </span>
    </div>
  </div>
  <div class="box1">
    <div id="cs" class="flex justify-start items-center h-full space-x-4">
      <div class="divide-y-2">
        <p class="mb-2">
          <img src="https://tva2.sinaimg.cn/large/0060lm7Tly1fpx1skrabaj31hc0u01kx.jpg" alt="">
          <span id="wen" class="text-lg font-bold">这是什么</span>
        </p>
        <div class="border-b-2 my-4" />
        <!-- 下面的其他内容 -->
      </div>
    </div>

    <ul class="inline-flex ">
      <li> <img src="https://tva2.sinaimg.cn/large/0060lm7Tly1fpx1skrabaj31hc0u01kx.jpg" alt=""></li>
      <li> <img src="https://tva2.sinaimg.cn/large/0060lm7Tly1fpx1skrabaj31hc0u01kx.jpg" alt=""></li>
      <li> <img src="https://tva2.sinaimg.cn/large/0060lm7Tly1fpx1skrabaj31hc0u01kx.jpg" alt=""></li>
    </ul>
  </div>
</template>

<style lang="scss">
@import "./base.scss";

.banner {
  background-size: cover;
  background-position: center center;
  position: relative;
  overflow: hidden;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .wave1,
  .wave2 {
    position: absolute;
    width: 400%;
    bottom: 0;
  }

  .wave1 {
    background: url($theme-base + "assets/wave1.png") repeat-x;
    height: 65px;
    animation: wave-animation-1 30s infinite linear;
  }

  .wave2 {
    background: url($theme-base + "assets/wave2.png") repeat-x;
    height: 80px;
    animation: wave-animation-2 20s infinite linear;
  }

  .info {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .box {
    display: inline-block;
    width: 600px;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 16px;
    margin-top: 16px;
  }

  .text {
    text-align: center;
    font-size: 16px;
    line-height: 24px;
  }

  .contact {
    display: flex;
    justify-content: center;
    font-size: 24px;
    padding-bottom: 12px;

    a {
      color: white;
      margin: 6px;
    }
  }
}

@media (max-width: 720px) {
  .banner {
    .info {
      margin: 0 0.5em;
    }

    .box {
      width: 100%;
    }

    .text {
      margin: 1em 0.5em;
    }
  }
}

@keyframes wave-animation-1 {
  0% {
    left: 0;
  }

  100% {
    left: -997px;
  }
}

@keyframes wave-animation-2 {
  0% {
    left: 0;
  }

  100% {
    left: -1009px;
  }
}
.box1{
  width: 100%;
  height: 100%;
  // background-color: black;
 #cs{
    width: 100%;
    margin-top: 40px;
    height: 100px;
    // background-color: blanchedalmond;
    p{
      width: 100%;
      height: 50px;
      span{
        margin-left: 50px;
      }
      img{
  position: absolute;
        width: 50px;
        height: 40px;
      }
    }

  }
ul{
  width: 100%;
  height: 100%;

  justify-content: space-between;
  padding: 20px;
  padding-top: 0;
  li{

    width: 302px;
    height: 170px;
    background-color: aqua;
  }
}

}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
