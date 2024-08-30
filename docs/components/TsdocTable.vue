<script setup lang="ts">
import { members } from 'virtual:tsdoc-module'
</script>

<template>
  <div class="markdown-body">
    <table class="table-container">
      <thead>
        <tr>
          <th>属性名</th>
          <th>类型</th>
          <th>默认值</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody v-for="(member, memberIndex) in members" :key="memberIndex" class="member-table">
        <tr>
          <td>
            <strong>{{ member.name }}</strong>
          </td>
          <td>
            <template v-for="(type, typeIndex) in member.types" :key="typeIndex">
              <code>
                {{ type }}
              </code>
              <template v-if="typeIndex < member.types.length - 1">
                |
              </template>
            </template>
          </td>
          <td>
            <template v-if="member.jsDocTags?.find(tag => tag.tagName === 'default')">
              <code>
                {{ member.jsDocTags?.find(tag => tag.tagName === 'default')?.comment }}
              </code>
            </template>
            <template v-else>
              —
            </template>
          </td>
          <td>
            <template v-for="(tag, tagIndex) in member.jsDocTags" :key="tagIndex">
              <span v-if="tag.tagName === 'zh'" lang="zh-CN">
                {{ tag.comment }}
              </span>
              <span v-else-if="tag.tagName === 'en'" lang="en">
                {{ tag.comment }}
              </span>
            </template>
            <template v-if="!member.jsDocTags || !member.jsDocTags.length">
              —
            </template>
          </td>
        </tr>
        <!-- children -->
        <tr v-for="(memberItem, subIndex) in member.children" :key="subIndex" class="child-row">
          <td style="padding-left: 20px;">
            {{ memberItem.name }}
          </td>
          <td>
            <template v-for="(type, typeIndex) in memberItem.types" :key="typeIndex">
              <code>
                {{ type }}
              </code>
              <template v-if="typeIndex < memberItem.types.length - 1">
                |
              </template>
            </template>
          </td>
          <td>
            <template v-if="memberItem.jsDocTags?.find(tag => tag.tagName === 'default')">
              <code>
                {{ memberItem.jsDocTags?.find(tag => tag.tagName === 'default')?.comment }}
              </code>
            </template>
            <template v-else>
              —
            </template>
          </td>
          <td>
            <template v-for="(tag, tagIndex) in memberItem.jsDocTags" :key="tagIndex">
              <span v-if="tag.tagName === 'zh'" lang="zh-CN">
                {{ tag.comment }}
              </span>
              <span v-if="tag.tagName === 'en'" lang="en">
                {{ tag.comment }}
              </span>
            </template>
            <template v-if="!memberItem.jsDocTags || !memberItem.jsDocTags.length">
              —
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
