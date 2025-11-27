<template>
  <article v-if="post" class="post-card">
    <div class="post-header">
      <span class="post-date">{{ post.date }}</span>
      <h2 class="post-title">{{ post.title }}</h2>
    </div>

    <img :src="post.image" :alt="post.title" class="post-image" />
    <p class="post-author">by {{ post.author }}</p>
    <p class="post-content">{{ post.content }}</p>

    <button class="like-btn" type="button" @click="like">
      Like <span class="like-count">{{ post.likes }}</span>
    </button>
  </article>
</template>

<script>
export default {
name: "Post",
props: ["postList"],
data: function() {
return {

}},
computed: {
}
}
</script>