/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable unicorn/prefer-dom-node-text-content */
/* eslint-disable no-console */
/* eslint-disable style/no-tabs */
function setCookie(e, t, i) {
  let o = ''
  if (i) {
    const a = new Date()
    a.setTime(a.getTime() + 24 * i * 60 * 60 * 1e3)
    o = `; expires=${a.toUTCString()}`
  }
  document.cookie = `${e}acai` + `=${t || ''}${o}; path=/`
}

function getCookie(e) {
  for (let t = `${e}acai` + `=`, i = document.cookie.split(';'), o = 0; o < i.length; o++) {
    let a
    for (a = i[o]; a.charAt(0) === ' ';)
      a = a.substring(1, a.length)

    if (a.indexOf(t) === 0)
      return a.substring(t.length, a.length)
  }
  return null
}

function removeCookie(e) {
  document.cookie = `${e}acai` + `=; Max-Age=-99999999;`
}

function loadWidget(config) {
  let { waifuPath, apiPath, cdnPath } = config
  let useCDN = false
  let modelList
  let messageTimer

  if (typeof cdnPath === 'string') {
    useCDN = true
    if (!cdnPath.endsWith('/'))
      cdnPath += '/'
  }
  if (!apiPath.endsWith('/'))
    apiPath += '/'
  localStorage.removeItem('waifu-display')
  sessionStorage.removeItem('waifu-text')
  document.body.insertAdjacentHTML('beforeend', `<div id="waifu">
	<div id="waifu-tips"></div>
	<canvas id="live2d" width="250" height="250"></canvas>
	<div id="waifu-tool">
		<span class="fa fa-lg fa-comment"></span>
		<span class="fa fa-lg fa-paper-plane"></span>
		<span class="fa fa-lg fa-user-circle"></span>
		<span class="fa fa-lg fa-street-view"></span>
		<span class="fa fa-lg fa-camera-retro"></span>
		<span class="fa fa-lg fa-info-circle"></span>
		<span class="fa fa-lg fa-times"></span>
	</div>
	</div>`)
  // https://stackoverflow.com/questions/24148403/trigger-css-transition-on-appended-element
  setTimeout(() => {
    document.getElementById('waifu').style.bottom = '-10px'
  }, 0);

  (function registerEventListener() {
    document.querySelector('#waifu-tool .fa-comment').addEventListener('click', showHitokoto)
    document.querySelector('#waifu-tool .fa-paper-plane').addEventListener('click', () => {
      if (window.Asteroids) {
        if (!window.ASTEROIDSPLAYERS)
          window.ASTEROIDSPLAYERS = []
        window.ASTEROIDSPLAYERS.push(new Asteroids())
      }
      else {
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/gh/GalaxyMimi/CDN/asteroids.js'
        document.head.appendChild(script)
      }
    })
    document.querySelector('#waifu-tool .fa-user-circle').addEventListener('click', loadOtherModel)
    document.querySelector('#waifu-tool .fa-street-view').addEventListener('click', loadRandModel)
    document.querySelector('#waifu-tool .fa-camera-retro').addEventListener('click', () => {
      showMessage('照好了嘛，是不是很可爱呢？', 6000, 9)
      Live2D.captureName = 'photo.png'
      Live2D.captureFrame = true
    })
    document.querySelector('#waifu-tool .fa-info-circle').addEventListener('click', () => {
      open('https://github.com/stevenjoezhang/live2d-widget')
    })
    document.querySelector('#waifu-tool .fa-times').addEventListener('click', () => {
      localStorage.setItem('waifu-display', Date.now())
      showMessage('愿你有一天能与重要的人重逢。', 2000, 11)
      document.getElementById('waifu').style.bottom = '-400px'
      setTimeout(() => {
        // document.getElementById("waifu").style.display = "none";
      }, 3000)
    })
    const devtools = () => {}
    console.log('%c', devtools)
    devtools.toString = () => {
      showMessage('哈哈，你打开了控制台，是想要看看我的小秘密吗？', 6000, 9)
    }
    window.addEventListener('copy', () => {
      showMessage('你都复制了些什么呀，转载要记得加上出处哦！', 6000, 9)
    })
    window.addEventListener('visibilitychange', () => {
      if (!document.hidden)
        showMessage('哇，你终于回来了～', 6000, 9)
    })
  })();

  (function welcomeMessage() {
    let text
    if (location.pathname === '/') { // 如果是主页
      const now = new Date().getHours()
      if (now > 5 && now <= 7)
        text = '早上好！一日之计在于晨，美好的一天就要开始了。'
      else if (now > 7 && now <= 11)
        text = '上午好！工作顺利嘛，不要久坐，多起来走动走动哦！'
      else if (now > 11 && now <= 13)
        text = '中午了，工作了一个上午，现在是午餐时间！'
      else if (now > 13 && now <= 17)
        text = '午后很容易犯困呢，今天的运动目标完成了吗？'
      else if (now > 17 && now <= 19)
        text = '傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红～'
      else if (now > 19 && now <= 21)
        text = '晚上好，今天过得怎么样？'
      else if (now > 21 && now <= 23)
        text = ['已经这么晚了呀，早点休息吧，晚安～', '深夜时要爱护眼睛呀！']
      else text = '你是夜猫子呀？这么晚还不睡觉，明天起的来嘛？'
    }
    else if (document.referrer !== '') {
      const referrer = new URL(document.referrer)
      const domain = referrer.hostname.split('.')[1]
      if (location.hostname === referrer.hostname)
        text = `欢迎阅读<span>「${document.title.split(' - ')[0]}」</span>`
      else if (domain === 'baidu')
        text = `Hello！来自 百度搜索 的朋友<br>你是搜索 <span>${referrer.search.split('&wd=')[1].split('&')[0]}</span> 找到的我吗？`
      else if (domain === 'so')
        text = `Hello！来自 360搜索 的朋友<br>你是搜索 <span>${referrer.search.split('&q=')[1].split('&')[0]}</span> 找到的我吗？`
      else if (domain === 'google')
        text = `Hello！来自 谷歌搜索 的朋友<br>欢迎阅读<span>「${document.title.split(' - ')[0]}」</span>`
      else text = `Hello！来自 <span>${referrer.hostname}</span> 的朋友`
    }
    else {
      text = `欢迎阅读<span>「${document.title.split(' - ')[0]}」</span>`
    }
    showMessage(text, 7000, 8)
  })()
  function randomSelection(obj) {
    return Array.isArray(obj) ? obj[Math.floor(Math.random() * obj.length)] : obj
  }
  // 检测用户活动状态，并在空闲时显示消息
  let userAction = false
  let userActionTimer
  const messageArray = ['好久不见，日子过得好快呢……', '大坏蛋！你都多久没理人家了呀，嘤嘤嘤～', '嗨～快来逗我玩吧！', '拿小拳拳锤你胸口！']
  window.addEventListener('mousemove', () => userAction = true)
  window.addEventListener('keydown', () => userAction = true)
  setInterval(() => {
    if (userAction) {
      userAction = false
      clearInterval(userActionTimer)
      userActionTimer = null
    }
    else if (!userActionTimer) {
      userActionTimer = setInterval(() => {
        showMessage(randomSelection(messageArray), 6000, 9)
      }, 20000)
    }
  }, 1000)

  function showHitokoto() {
    // 增加 hitokoto.cn 的 API
    fetch('https://v1.hitokoto.cn')
      .then(response => response.json())
      .then((result) => {
        const text = `这句一言是 <span>${result.creator}</span>投稿的。`
        showMessage(result.hitokoto, 6000, 9)
        setTimeout(() => {
          showMessage(text, 4000, 9)
        }, 6000)
      })
  }

  function showMessage(text, timeout, priority) {
    if (!text)
      return
    if (!sessionStorage.getItem('waifu-text') || sessionStorage.getItem('waifu-text') <= priority) {
      if (messageTimer) {
        clearTimeout(messageTimer)
        messageTimer = null
      }
      text = randomSelection(text)
      sessionStorage.setItem('waifu-text', priority)
      const tips = document.getElementById('waifu-tips')
      tips.innerHTML = text
      tips.classList.add('waifu-tips-active')
      messageTimer = setTimeout(() => {
        sessionStorage.removeItem('waifu-text')
        tips.classList.remove('waifu-tips-active')
      }, timeout)
    }
  }

  (function initModel() {
    let modelId = localStorage.getItem('modelId')
    let modelTexturesId = localStorage.getItem('modelTexturesId')
    if (modelId === null) {
      // 首次访问加载 指定模型 的 指定材质
      modelId = 1 // 模型 ID
      modelTexturesId = 53 // 材质 ID
    }
    loadModel(modelId, modelTexturesId)
    fetch(waifuPath)
      .then(response => response.json())
      .then((result) => {
        result.mouseover.forEach((tips) => {
          window.addEventListener('mouseover', (event) => {
            if (!event.target.matches(tips.selector))
              return
            let text = randomSelection(tips.text)
            text = text.replace('{text}', event.target.innerText)
            showMessage(text, 4000, 8)
          })
        })
        result.click.forEach((tips) => {
          window.addEventListener('click', (event) => {
            if (!event.target.matches(tips.selector))
              return
            let text = randomSelection(tips.text)
            text = text.replace('{text}', event.target.innerText)
            showMessage(text, 4000, 8)
          })
        })
        result.seasons.forEach((tips) => {
          const now = new Date()
          const after = tips.date.split('-')[0]
          const before = tips.date.split('-')[1] || after
          if ((after.split('/')[0] <= now.getMonth() + 1 && now.getMonth() + 1 <= before.split('/')[0])
            && (after.split('/')[1] <= now.getDate() && now.getDate() <= before.split('/')[1])) {
            let text = randomSelection(tips.text)
            text = text.replace('{year}', now.getFullYear())
            // showMessage(text, 7000, true);
            messageArray.push(text)
          }
        })
      })
  })()

  async function loadModelList() {
    const response = await fetch(`${cdnPath}model_list.json`)
    const result = await response.json()
    modelList = result
  }

  async function loadModel(modelId, modelTexturesId, message) {
    localStorage.setItem('modelId', modelId)
    localStorage.setItem('modelTexturesId', modelTexturesId)
    showMessage(message, 4000, 10)
    if (useCDN) {
      if (!modelList)
        await loadModelList()
      const target = randomSelection(modelList.models[modelId])
      loadlive2d('live2d', `${cdnPath}model/${target}/index.json`)
    }
    else {
      loadlive2d('live2d', `${apiPath}get/?id=${modelId}-${modelTexturesId}`)
      console.log(`小不点 ${modelId}-${modelTexturesId} 加载完成`)
    }
  }

  async function loadRandModel() {
    const modelId = localStorage.getItem('modelId')
    const modelTexturesId = localStorage.getItem('modelTexturesId')
    if (useCDN) {
      if (!modelList)
        await loadModelList()
      const target = randomSelection(modelList.models[modelId])
      loadlive2d('live2d', `${cdnPath}model/${target}/index.json`)
      showMessage('我的新衣服好看嘛？', 4000, 10)
    }
    else {
      // 可选 "rand"(随机), "switch"(顺序)
      fetch(`${apiPath}rand_textures/?id=${modelId}-${modelTexturesId}`)
        .then(response => response.json())
        .then((result) => {
          if (result.textures.id === 1 && (modelTexturesId === 1 || modelTexturesId === 0))
            showMessage('我还没有其他衣服呢！', 4000, 10)
          else loadModel(modelId, result.textures.id, '我的新衣服好看嘛？')
        })
    }
  }

  async function loadOtherModel() {
    let modelId = localStorage.getItem('modelId')
    if (useCDN) {
      if (!modelList)
        await loadModelList()
      const index = (++modelId >= modelList.models.length) ? 0 : modelId
      loadModel(index, 0, modelList.messages[index])
    }
    else {
      fetch(`${apiPath}switch/?id=${modelId}`)
        .then(response => response.json())
        .then((result) => {
          loadModel(result.model.id, 0, result.model.message)
        })
    }
  }
}

function initWidget(config, apiPath = '/') {
  if (typeof config === 'string') {
    config = {
      waifuPath: config,
      apiPath,
    }
  }
  document.body.insertAdjacentHTML('beforeend', `<div class="live2d-tool hide-live2d no-select" id="show_model"><div class="keys">Hide</div></div>
		<div class="live2d-tool live2d-pio no-select" id="switch_live2d"><div class="keys">Tia</div></div>
		<div class="live2d-tool switch-live2d no-select" id="switch_model"><div class="keys">Switch</div></div>
		<div class="live2d-tool save-live2d no-select" id="save_pic"><div class="keys">Save</div></div>
		`)
  document.getElementById('switch_model').addEventListener('click', () => {
    document.querySelector('#waifu-tool .fa-street-view').click()
  })
  document.getElementById('switch_live2d').addEventListener('click', () => {
    document.querySelector('#waifu-tool .fa-user-circle').click()
  })
  document.getElementById('save_pic').addEventListener('click', () => {
    document.querySelector('#waifu-tool .fa-camera-retro').click()
  })
  const toggle = document.getElementById('show_model')
  toggle.addEventListener('click', () => {
    if (getCookie('live2d') === 'Hide') {
      setTimeout(() => {
        if (document.body.clientWidth > 860) {
          document.querySelectorAll('.hide-live2d').forEach((element) => {
            element.style.bottom = '66px'
          })
          document.querySelectorAll('.save-live2d, .switch-live2d, .live2d-pio, .live2d-tia').forEach((element) => {
            element.classList.add('hide-live2d-tool')
          })
        }
        document.querySelectorAll('.hide-live2d .keys').forEach((element) => {
          element.textContent = 'Show'
        })
        document.querySelector('#waifu-tool .fa-times').click()
        setCookie('live2d', 'Show', 7)
      }, 10)
    }
    else {
      setTimeout(() => {
        if (document.body.clientWidth > 860) {
          document.querySelectorAll('.hide-live2d').forEach((element) => {
            element.style.bottom = '185px'
          })
          document.querySelectorAll('.save-live2d, .switch-live2d, .live2d-pio, .live2d-tia').forEach((element) => {
            element.classList.remove('hide-live2d-tool')
          })
        }
        document.querySelectorAll('.hide-live2d .keys').forEach((element) => {
          element.textContent = 'Hide'
        })
        localStorage.removeItem('waifu-display')
        const waifuElement = document.getElementById('waifu')
        waifuElement.style.display = ''
        waifuElement.style.bottom = '0'
        setCookie('live2d', 'Hide', 7)
        setCookie('dontwantlive2d', 'no', 7)
      }, 10)
    }
  })

  if (localStorage.getItem('waifu-display') && Date.now() - localStorage.getItem('waifu-display') <= 86400000) {
    toggle.setAttribute('first-time', true)
    setTimeout(() => {
    }, 0)
  }
  else {
    loadWidget(config)
  }
}
