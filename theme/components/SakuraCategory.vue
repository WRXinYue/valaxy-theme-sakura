<script lang="ts" setup>
import type { CategoryList, Post } from 'valaxy'
import { isCategoryList, useInvisibleElement } from 'valaxy'
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useCategoryState } from '../composables'

const props = withDefaults(defineProps<{
  parentKey: string
  // to eliminate the warning
  category: Post | CategoryList
  level?: number

  /**
   * collapse children
   */
  collapsable?: boolean
}>(), {
  collapsable: true,
})

const router = useRouter()
const route = useRoute()
const categoryList = computed(() => {
  const c = (route.query.category as string) || ''
  return Array.isArray(c) ? [c] : c.split('/')
})

const { isExpanded, setExpanded } = useCategoryState()

// Use a unique key for the category (parentKey is the path)
const categoryKey = computed(() => props.parentKey)

// Initialize state: if not in store, use prop.
// However, if collapsable is false (meaning it should be open), we should ensure it's expanded.
// Note: collapsable=true means it CAN be collapsed (and defaults to collapsed usually).
// collapsable=false means it IS open (e.g. current route).
// Let's interpret:
// In the original code: `collapse = ref(props.collapsable)`
// If `collapsable` is true (default), `collapse` is true -> CLOSED.
// If `collapsable` is false (e.g. current path), `collapse` is false -> OPEN.
// So `expanded` should be `!collapse`.

const collapse = computed({
  get: () => {
    // If it's explicitly expanded in store, return false (not collapsed).
    if (isExpanded(categoryKey.value))
      return false
    // If collapsable prop is false (forced open by route), return false.
    if (!props.collapsable)
      return false
    // Otherwise return true (collapsed).
    return true
  },
  set: (val) => {
    // val is new collapse state.
    // if val is true (collapse), remove from expanded.
    // if val is false (expand), add to expanded.
    setExpanded(categoryKey.value, !val)
  },
})

// Sync prop change (when route changes and parent forces expansion)
watch(() => props.collapsable, (newVal) => {
  if (!newVal) {
    setExpanded(categoryKey.value, true)
  }
}, { immediate: true })

const { t } = useI18n()

/**
 * i18n
 */
const { locale } = useI18n()
function getTitle(post: Post | any) {
  const lang = locale.value === 'zh-CN' ? 'zh' : locale.value
  return post[`title_${lang}`] ? post[`title_${lang}`] : post.title
}

const postCollapseElRef = ref<HTMLElement>()
const { show } = useInvisibleElement(postCollapseElRef)
/**
 * scroll to post collapse by category
 * @param category
 */
function jumpToDisplayCategory(category: string) {
  router.push({
    query: {
      category,
    },
  })

  show()
}

onMounted(() => {
  const postCollapseEl = document.querySelector('.post-collapse-container') as HTMLElement
  if (postCollapseEl)
    postCollapseElRef.value = postCollapseEl
})

// Animation hooks
function onEnter(el: Element) {
  const element = el as HTMLElement
  element.style.height = '0'
  element.style.opacity = '0'
  element.offsetHeight // Force reflow
  element.style.height = `${element.scrollHeight}px`
  element.style.opacity = '1'
}

function onAfterEnter(el: Element) {
  const element = el as HTMLElement
  element.style.height = 'auto'
  element.style.opacity = ''
}

function onBeforeLeave(el: Element) {
  const element = el as HTMLElement
  element.style.height = `${element.scrollHeight}px`
  element.style.opacity = '1'
}

function onLeave(el: Element) {
  const element = el as HTMLElement
  element.offsetHeight // Force reflow
  element.style.height = '0'
  element.style.opacity = '0'
}
</script>

<template>
  <li class="sakura-category-item">
    <div class="category-row">
      <span
        class="folder-toggle"
        @click.stop="collapse = !collapse"
      >
        <div v-if="collapse" i-ri-folder-add-line />
        <div v-else class="text-primary" i-ri-folder-reduce-line />
      </span>

      <span
        class="category-link"
        @click="jumpToDisplayCategory(parentKey)"
      >
        <span class="name">{{ category.name === 'Uncategorized' ? t('category.uncategorized') : category.name }}</span>
        <span class="count">{{ category.total }}</span>
      </span>
    </div>

    <Transition
      name="expand"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
    >
      <div v-if="!collapse" class="category-children">
        <ul class="children-list">
          <li v-for="categoryItem, i in category.children.values()" :key="i" class="child-item">
            <template v-if="isCategoryList(categoryItem)">
              <SakuraCategory
                :parent-key="parentKey ? `${parentKey}/${categoryItem.name}` : categoryItem.name"
                :category="categoryItem"
                :collapsable="!categoryList.includes(categoryItem.name)"
              />
            </template>

            <template v-else>
              <RouterLink
                v-if="categoryItem.title"
                :to="categoryItem.path || ''"
                class="post-link"
              >
                <div class="post-icon" i-ri-file-text-line />
                <span class="post-title">{{ getTitle(categoryItem) }}</span>
              </RouterLink>
            </template>
          </li>
        </ul>
      </div>
    </Transition>
  </li>
</template>

<style lang="scss" scoped>
.sakura-category-item {
  list-style: none;
}

.category-children {
  margin-left: 0.75rem;
  padding-left: 0.75rem;
  border-left: 1px dashed var(--sakura-color-divider);
  overflow: hidden;
  transition:
    height 0.3s cubic-bezier(0.25, 0.8, 0.5, 1),
    opacity 0.3s ease;
}

.folder-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  margin-right: 0.25rem;
  color: var(--sakura-color-text-secondary);
  transition: color 0.3s;

  .text-primary {
    color: var(--sakura-color-primary);
  }
}

.category-link {
  flex: 1;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: var(--sakura-color-text);
  transition: color 0.3s;
  overflow: hidden;

  .name {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 0.5rem;
  }

  .count {
    font-size: 0.75rem;
    padding: 0.1rem 0.4rem;
    border-radius: 10px;
    background-color: var(--sakura-color-muted-background);
    color: var(--sakura-color-text-muted);
    transition: all 0.3s;
  }
}

.category-row {
  display: flex;
  align-items: center;
  padding: 0.25rem 0;
  transition: all 0.3s;

  &:hover {
    .folder-toggle {
      color: var(--sakura-color-primary);
    }

    .category-link {
      color: var(--sakura-color-primary);

      .count {
        background-color: var(--sakura-color-primary);
        color: white;
      }
    }
  }
}

.children-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.child-item {
  margin-top: 0.25rem;
}

.post-link {
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  color: var(--sakura-color-text-secondary);
  font-size: 0.9rem;
  border-radius: 4px;
  transition: all 0.3s;

  &:hover {
    color: var(--sakura-color-primary);
    background-color: var(--sakura-color-bg-hover);
  }

  .post-icon {
    margin-right: 0.5rem;
    font-size: 1rem;
  }

  .post-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
