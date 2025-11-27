const PostCard = {
  props: { postId: Number },
  computed: {
    post() { return this.$store.getters.getPostById(this.postId) || {}; }
  },
  methods: {
    like() { this.$store.dispatch('likePost', this.postId); }
  },
  template: `
    <article class="post-card">
      <div class="post-header">
        <span class="post-date">{{ post.date }}</span>
        <h2 class="post-title">{{ post.title }}</h2>
      </div>

      <img :src="post.image" alt="" class="post-image" />
      <p class="post-author">by {{ post.author }}</p>
      <p class="post-content">{{ post.content }}</p>

      <button class="like-btn" type="button" @click="like">
        Like <span class="like-count">{{ post.likes }}</span>
      </button>
    </article>
  `
};
