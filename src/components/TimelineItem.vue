<script setup lang="ts">
import { TimelinePost } from '../posts.js'

defineProps<{
  post: TimelinePost
}>()
</script>

<template>
    <a class="panel-block is-flex is-flex-direction-column is-align-items-flex-start">
      <a>{{ post.title }}</a>
      <div>{{ post.created.toFormat("yyyy-MM-dd") }}</div>
    </a>
</template>