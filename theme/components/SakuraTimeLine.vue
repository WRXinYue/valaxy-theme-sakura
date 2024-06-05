<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import type { Post } from 'valaxy'
import { formatDate, sortByDate } from 'valaxy'
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

watch(() => props.posts, () => {
  postListByYear.value = {}
  years.value = []
  months.value = {}
  props.posts.forEach((post) => {
    if (post.hide && post.hide !== 'index')
      return
    if (post.date) {
      const year = Number.parseInt(formatDate(post.date, 'yyyy'))
      const month = Number.parseInt(formatDate(post.date, 'MM'))
      if (!postListByYear.value[year]) {
        years.value.push(year)
        months.value[year] = []
        postListByYear.value[year] = {}
      }
      if (postListByYear.value[year][month]) {
        postListByYear.value[year][month].push(post)
      }
      /** first month */
      else {
        months.value[year].push(month)
        postListByYear.value[year][month] = []
        // Months do not display articles; article names are only shown on days
        postListByYear.value[year][month].push(post)
        postListByYear.value[year][month].push(post)
      }
    }
  })
  originalPostListByYear.value = JSON.parse(JSON.stringify(postListByYear.value))

  Object.keys(postListByYear.value).forEach((year) => {
    Object.keys(postListByYear.value[year]).forEach((month) => {
      if (postListByYear.value[year][month].length > 1)
        postListByYear.value[year][month] = [postListByYear.value[year][month][0]]
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
  postListByYear.value[year][month] = [...originalPostListByYear.value[year][month]]
}

// function handleMouseLeave(month: number) {
//   const index = showDays.value.indexOf(month)
//   if (index !== -1)
//     showDays.value.splice(index, 1)
// }
</script>

<template>
  <div class="post-collapse px-10 lt-sm:px-5 mx-auto">
    <div w="full" text="center" class="yun-text-light" p="2">
      {{ t('counter.archives', posts.length) }}
    </div>

    <div class="post-collapse-action" text="center">
      <button class="yun-icon-btn shadow hover:shadow-md" @click="isDesc = !isDesc">
        <div v-if="isDesc" i-ri-sort-desc />
        <div v-else i-ri-sort-asc />
      </button>
    </div>

    <div v-for="year in sortedYears" :key="year" class="ml-1/3">
      <h2 :id="`#archive-year-${year}`" class="archive-year ml--8" text="2xl">
        {{ year }}年
      </h2>
      <template v-for="month in sortedMonths(year)" :key="month">
        <TransitionGroup name="timeline" tag="ul" class="relative p-0" @mouseenter="handleMouseEnter(year, month)">
          <li v-for="post, j in sortByDate(postListByYear[year][month], isDesc)" :key="`post-${year}-${month}-${j}`" class="post-item relative">
            <header
              class="post-header" flex items-center
              :class="[
                j === 0 ? 'circle-indicator' : 'hover-indicator',
                j !== postListByYear[year][month].length && 'h-$st-c-timeline-height',
              ]"
            >
              <div v-if="j === 0" class="post-meta absolute left--40">
                <time v-if="post.date" class="post-time" font="mono" opacity="80">{{
                  formatDate(post.date, 'MM') }}月
                </time>
                <span class="text-$st-c-text">
                  ({{ originalPostListByYear[year][month].length }} 篇文章)
                </span>
              </div>
              <div v-if="j !== 0" class="post-meta">
                <time v-if="post.date" class="post-time text-$st-c-timeline-text-color" font="mono" opacity="80">{{
                  formatDate(post.date, 'dd') }}日
                </time>
                <h2 class="post-title" inline-flex items-center font="serif black">
                  <RouterLink :to="post.path || ''" class="post-title-link text-$st-c-text hover:text-$st-c-accent">
                    {{ post.title }}
                  </RouterLink>
                </h2>
              </div>
            </header>
          </li>
        </TransitionGroup>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.timeline-move, .timeline-enter-active, .timeline-leave-active {
  transition: transform 0.5s cubic-bezier(0.55, 0, 0.1, 1), opacity 0.5s ease;
}
.timeline-enter-from, .timeline-leave-to {
  opacity: 0;
  transform: scaleY(0) translateX(40px);
}
.timeline-enter-to, .timeline-leave-from {
  opacity: 1;
  transform: scaleY(1) translateX(0px);
}
.timeline-leave-active {
  position: absolute;
}

.post-collapse {
  .collection-title {
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      width: 2px;
      height: 50%;
      background: rgba(var(--va-c-primary-rgb), 0.3);
    }

    .archive-year {
      color: var(--st-c-timeline-color);
      margin: 0 1.5rem;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 35%;
        margin-left: -7px;
        margin-top: 14px;
        width: 1rem;
        height: 1rem;
        background: var(--va-c-primary);
        border-radius: 50%;
      }
    }
  }

  .post-item {
    &::before {
      content: '';
      position: absolute;
      width: 3px;
      height: 100%;
      box-sizing: border-box;
      background: var(--st-c-timeline-color);
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
      margin: 1rem 0 1rem 1.2rem;
      white-space: nowrap;
    }
  }
}

.hover-indicator {
  &::before {
      content: '';
      position: absolute;
      left: 0;
      width: 10px;
      height: 10px;
      margin-left: -4px;
      border-radius: 50%;
      border: 1px solid var(--st-c-timeline-color);
      background-color: var(--va-c-bg-light);
      z-index: 1;
      transition: background var(--va-transition-duration);
    }

    &:hover {
      &::before {
        background: var(--st-c-timeline-color);
      }
    }
}

.circle-indicator::before {
  content: '';
  position: absolute;
  left: 0;
  top: 35%;
  margin-left: -7px;
  width: 1rem;
  height: 1rem;
  background: var(--st-c-timeline-color);
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 1px 1px 1px #bbb;
}
</style>
