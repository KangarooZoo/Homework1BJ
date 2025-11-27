<template>
  <article v-if="post" class="post">
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
  name: "BlogPost",

  props: {
    postId: {
      type: Number,
      required: true
    }
  },

  computed: {
    post() {
      return this.$store.getters.postById(this.postId);
    }
  },

  methods: {
    like() {
      this.$store.dispatch('IncreaseLikeAct', this.postId);
    }
  }
};
</script>