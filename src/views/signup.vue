<template>
	<div>

		<div class="flex-container">
			<div class="flex-item">
				<!-- Signup Form -->
				<div class="login-container">
					<h2 class="">Welcome to PostIt</h2>
					<a href="login.html">Login to your existing account</a>
					<p>or <br /> Create an account</p>

					<form class="login-form" @submit.prevent="onSubmit">
						<input placeholder="Email" type="text" id="username" name="username" v-model="username" required />
						<input placeholder="Password" type="password" id="password" name="password" v-model="password" required />

						<div id="pw-messages" style="color:red;margin-top:8px;" v-if="pwMessages.length">
							<div v-for="(m,i) in pwMessages" :key="i">{{ m }}</div>
						</div>

						<button id="login-btn" type="submit">Sign Up</button>
					</form>
				</div>
			</div>
			<div class="flex-item"></div>
			<div class="flex-item"></div>
		</div>

		<!-- footer provided by App.vue -->
	</div>
</template>

<script>
import "@/css/style.css";
import "@/css/login.css";
import validatePassword from "@/js/passwordCheck.js";
export default {
	name: "SignupView",
	// header/footer provided by top-level App.vue
	data() {
		return {
			username: "",
			password: ""
			,
			pwMessages: []
		};
	},
	methods: {
		onSubmit() {
			var res = validatePassword(this.password || '')
			if (!res.isValid) {
				this.pwMessages = res.messages
				return
			}
			this.pwMessages = []
			if (this.$router) {
				this.$router.push({ name: "main" })
			} else {
				window.location.href = "index.html"
			}
		}
	}
};
</script>

<!-- Keep styles global so imported CSS applies as in original HTML -->
<style>
/* Component-specific adjustments (if any) can go here */
</style>

