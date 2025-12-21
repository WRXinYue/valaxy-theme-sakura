<script lang="ts" setup>
import type { Post } from 'valaxy'
import { formatDate, sortByDate } from 'valaxy'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  posts: Post[]
}>()

const { t } = useI18n()

const isDesc = ref(true)
const years = ref<number[]>([])
const months = ref<Record<string, number[]>>({})
const postListByYear = ref<Record<string, Record<string, Post[]>>>({})
const originalPostListByYear = ref<Record<string, Record<string, Post[]>>>({})
const lockedMonths = ref<Record<string, boolean>>({})
const hoverTimeouts = ref<Record<string, ReturnType<typeof setTimeout>>>({})

watch(() => props.posts, () => {
  postListByYear.value = {}
  years.value = []
  months.value = {}
  lockedMonths.value = {}
  hoverTimeouts.value = {}
  props.posts.forEach((post) => {
    if (post.hide && post.hide !== 'index')
      return
    if (post.date) {
      const year = Number.parseInt(formatDate(post.date, { template: 'YYYY' }))
      const month = Number.parseInt(formatDate(post.date, { template: 'MM' }))
      if (!postListByYear.value[year]) {
        years.value.push(year)
        months.value[year] = []
        postListByYear.value[year] = {}
      }
      if (!postListByYear.value[year][month]) {
        months.value[year].push(month)
        postListByYear.value[year][month] = []
      }
      postListByYear.value[year][month].push(post)
    }
  })
  originalPostListByYear.value = JSON.parse(JSON.stringify(postListByYear.value))

  Object.keys(postListByYear.value).forEach((year) => {
    Object.keys(postListByYear.value[year]).forEach((month) => {
      postListByYear.value[year][month] = []
    })
  })
}, { immediate: true })

const sortedYears = computed(() => {
  const y = [...years.value]
  const arr = y.sort((a, b) => b - a)
  return isDesc.value ? arr : arr.reverse()
})

function sortedMonths(year: number) {
  const m = [...months.value[year]]
  const arr = m.sort((a, b) => b - a)
  return isDesc.value ? arr : arr.reverse()
}

function handleMouseEnter(year: number, month: number) {
  const key = `${year}-${month}`
  if (hoverTimeouts.value[key]) {
    clearTimeout(hoverTimeouts.value[key])
    delete hoverTimeouts.value[key]
  }

  if (lockedMonths.value[key])
    return

  if (postListByYear.value[year][month].length === 0)
    postListByYear.value[year][month] = [...originalPostListByYear.value[year][month]]
}

function handleMouseLeave(year: number, month: number) {
  const key = `${year}-${month}`
  if (lockedMonths.value[key])
    return

  hoverTimeouts.value[key] = setTimeout(() => {
    postListByYear.value[year][month] = []
    delete hoverTimeouts.value[key]
  }, 300)
}

function handleMonthClick(year: number, month: number) {
  const key = `${year}-${month}`

  if (hoverTimeouts.value[key]) {
    clearTimeout(hoverTimeouts.value[key])
    delete hoverTimeouts.value[key]
  }

  if (lockedMonths.value[key]) {
    // If already locked, unlock it and collapse
    delete lockedMonths.value[key]
    postListByYear.value[year][month] = []
  }
  else {
    // Lock it and expand
    lockedMonths.value[key] = true
    postListByYear.value[year][month] = [...originalPostListByYear.value[year][month]]
  }
}

function isYearActive(year: number) {
  if (!months.value[year])
    return false
  return months.value[year].every(month => lockedMonths.value[`${year}-${month}`])
}

function handleYearDoubleClick(year: number) {
  const yearMonths = months.value[year] || []
  const allLocked = yearMonths.every(m => lockedMonths.value[`${year}-${m}`])

  yearMonths.forEach((month) => {
    const key = `${year}-${month}`

    // Clear any pending timeouts
    if (hoverTimeouts.value[key]) {
      clearTimeout(hoverTimeouts.value[key])
      delete hoverTimeouts.value[key]
    }

    if (allLocked) {
      // Unlock all
      delete lockedMonths.value[key]
      postListByYear.value[year][month] = []
    }
    else {
      // Lock all
      lockedMonths.value[key] = true
      postListByYear.value[year][month] = [...originalPostListByYear.value[year][month]]
    }
  })
}

function onBeforeEnter(el: Element) {
  const element = el as HTMLElement
  element.style.opacity = '0'
  element.style.height = '0'
  // Use visible to allow overflow content (like the circle indicator) to be seen
  // But we need hidden for the height transition to work properly for the content
  // A common trick is to wrap content or handle padding
  element.style.overflow = 'hidden'
}

function onEnter(el: Element, done: () => void) {
  const element = el as HTMLElement
  // Trigger reflow

  element.offsetHeight

  element.style.transitionProperty = 'height, opacity'
  element.style.transitionDuration = '0.5s'
  element.style.transitionTimingFunction = 'ease'

  element.style.opacity = '1'
  element.style.height = `${element.scrollHeight}px`
  // Allow overflow during animation if possible, or adjust padding
  // If we set overflow visible here, the height animation might look weird if content spills out
  // But for the circle on the left, we can ensure the container has enough padding-left

  element.addEventListener('transitionend', () => {
    element.style.height = ''
    element.style.overflow = 'visible' // Ensure overflow is visible after animation
    done()
  }, { once: true })
}

function onLeave(el: Element, done: () => void) {
  const element = el as HTMLElement
  element.style.transitionProperty = 'height, opacity'
  element.style.transitionDuration = '0.5s'
  element.style.transitionTimingFunction = 'ease'

  element.style.overflow = 'hidden'
  element.style.height = `${element.scrollHeight}px`
  // Force reflow

  element.offsetHeight

  element.style.opacity = '0'
  element.style.height = '0'
  element.addEventListener('transitionend', done, { once: true })
}
</script>

<template>
  <div w="full" class="post-collapse mx-auto px-10 lt-sm:px-5">
    <div w="full" text="center" class="yun-text-light" p="2">
      {{ t('counter.archives', posts.length) }}
    </div>

    <div class="post-collapse-action" text="center">
      <button @click="isDesc = !isDesc">
        <div v-if="isDesc" i-ri-sort-desc />
        <div v-else i-ri-sort-asc />
      </button>
    </div>

    <TransitionGroup name="year-list" tag="div">
      <div v-for="year in sortedYears" :key="year" class="ml-1/3">
        <div class="collection-title relative">
          <h2
            :id="`#archive-year-${year}`"
            class="archive-year ml--8 cursor-pointer select-none"
            :class="{ active: isYearActive(year) }"
            text="2xl"
            @dblclick="handleYearDoubleClick(year)"
          >
            {{ year }}年
          </h2>
        </div>
        <TransitionGroup name="month-list" tag="div">
          <template v-for="month in sortedMonths(year)" :key="month">
            <TransitionGroup
              name="post-list"
              tag="ul"
              class="relative p-0 pl-4"
              @mouseenter="handleMouseEnter(year, month)"
              @mouseleave="handleMouseLeave(year, month)"
              @before-enter="onBeforeEnter"
              @enter="onEnter"
              @leave="onLeave"
            >
              <li
                :key="`month-${year}-${month}`"
                class="month-item month-indicator post-item relative cursor-pointer"
                :class="{ active: postListByYear[year][month]?.length > 0 }"
                @click="handleMonthClick(year, month)"
              >
                <div class="month-meta absolute right-100% my-[1rem] mr-[1.2rem] whitespace-nowrap">
                  <time class="post-time" font="mono" opacity="80">{{ month.toString().padStart(2, '0') }}月</time>
                  <span class="text-$sakura-color-text"> ({{ originalPostListByYear[year][month].length }} 篇文章)</span>
                </div>
                <div class="h-10" />
              </li>
              <li
                v-for="post, j in sortByDate(postListByYear[year][month], isDesc)"
                :key="`post-${year}-${month}-${j}`"
                class="post-item relative"
                :style="{ transitionDelay: `${j * 0.05}s` }"
              >
                <header
                  class="post-header day-indicator h-$sakura-timeline-height" flex items-center
                >
                  <div class="post-meta my-[1rem] ml-[1.2rem]">
                    <time v-if="post.date" class="post-time text-$sakura-timeline-text-color" font="mono" opacity="80">{{
                      formatDate(post.date, { template: 'DD' }) }}日
                    </time>
                    <h2 class="post-title" inline-flex items-center font="serif black">
                      <RouterLink :to="post.path || ''" class="post-title-link text-$sakura-color-text hover:text-$sakura-color-action">
                        {{ post.title }}
                      </RouterLink>
                    </h2>
                  </div>
                </header>
              </li>
            </TransitionGroup>
          </template>
        </TransitionGroup>
      </div>
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
.year-list-move,
.month-list-move,
.post-list-move {
  transition: transform 0.8s cubic-bezier(0.35, 0, 0.25, 1);
}

.timeline-move,
.timeline-enter-active,
.timeline-leave-active {
  transition:
    transform 0.5s cubic-bezier(0.55, 0, 0.1, 1),
    opacity 0.5s ease;
}

.timeline-enter-from,
.timeline-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.timeline-enter-to,
.timeline-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.timeline-leave-active {
  position: absolute;
}

.post-collapse {
  // &::before {
  //   content: '';
  //   position: absolute;
  //   top: 50%;
  //   width: 2px;
  //   height: 50%;
  //   background: var(--sakura-color-primary);
  // }

  .archive-year {
    transition: color 0.3s ease;
    user-select: none;

    &.active {
      color: var(--sakura-color-primary);

      // &::before {
      //   background: white;
      //   border: 3px solid var(--sakura-color-primary);
      //   box-shadow: 0 0 0 2px var(--sakura-color-primary);
      // }
    }

    // &::before {
    //   content: '';
    //   position: absolute;
    //   left: 0;
    //   top: 35%;
    //   margin-left: -7px;
    //   margin-top: 14px;
    //   width: 1rem;
    //   height: 1rem;
    //   background: var(--sakura-color-primary);
    //   border-radius: 50%;
    //   transition: all 0.3s ease;
    // }
  }

  .post-item {
    margin-left: -1rem; /* Revert the pl-4 added to ul to align text back */
    padding-left: 1rem;

    &::before {
      content: '';
      position: absolute;
      width: 3px;
      height: 100%;
      box-sizing: border-box;
      background: var(--sakura-timeline-color);
      left: 1rem; /* Adjust line position to match new padding */
    }
  }

  .post-header {
    // border-bottom: 1px solid rgba(var(--va-c-primary-rgb), 0.3);

    .post-title {
      margin-left: 0.1rem;
      padding: 0;
      font-size: 1rem;

      .post-title-link {
        .icon {
          width: 1.1rem;
          height: 1.1rem;
          margin-right: 0.3rem;
        }
      }
    }

    .post-meta {
      font-size: 1rem;
      white-space: nowrap;
    }
  }
}

.day-indicator {
  &::after {
    content: '';
    position: absolute;
    left: 1rem;
    width: 10px;
    height: 10px;
    margin-left: -4px;
    border-radius: 50%;
    border: 1px solid var(--sakura-timeline-color);
    background-color: var(--va-c-bg-light);
    z-index: 1;
    transition: background var(--va-transition-duration);
  }

  &:hover {
    &::after {
      background: var(--sakura-timeline-color);
    }
  }
}

.month-indicator {
  &::after {
    content: '';
    position: absolute;
    left: 1rem;
    top: 35%;
    margin-left: -9px;
    width: 1.2rem;
    height: 1.2rem;
    background: var(--sakura-timeline-color);
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 0 0 1px var(--sakura-timeline-color);
    z-index: 1;
    transition: all 0.3s ease;
  }

  &.active::after {
    background: white;
    border: 5px solid var(--sakura-timeline-color);
    box-shadow: 0 0 0 2px var(--sakura-timeline-color);
  }
}
</style>
