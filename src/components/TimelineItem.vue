<script setup lang="ts">
import { TimelinePost } from '../posts.js'

defineProps<{
  post: TimelinePost
}>()
</script>

<template>
    <RouterLink
    :to="`/posts/${post.id}`"
    class="panel-block is-flex is-flex-direction-column is-align-items-flex-start">
      <a>{{ post.title }}</a>
      <div>{{ post.created.toFormat("yyyy-MM-dd") }}</div>
    </RouterLink>
</template>