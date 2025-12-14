<template>
	<div>
		<div class="flex-container">
			<div class="flex-item">
				<!-- Signup Form -->
				<div class="login-container">
					<h2 class="">Welcome to PostIt</h2>
					<router-link to="/login">Login to your existing account</router-link>
					<p>or <br /> Create an account</p>

					<form class="login-form" @submit.prevent="onSubmit">
						<input
							placeholder="Email"
							type="email"
							id="email"
							name="email"
							v-model="email"
							required
						/>
						<input
							placeholder="Password"
							type="password"
							id="password"
							name="password"
							v-model="password"
							required
						/>

						<div id="pw-messages" style="color:red;margin-top:8px;" v-if="pwMessages.length">
							<div v-for="(m,i) in pwMessages" :key="i">{{ m }}</div>
						</div>

						<p v-if="error" style="color:red;margin-top:8px;">{{ error }}</p>

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
			email: "",
			password: "",
			pwMessages: [],
			error: "",
		};
	},
	methods: {
		async onSubmit() {
			this.error = "";
			const res = validatePassword(this.password || "");
			if (!res.isValid) {
				this.pwMessages = res.messages;
				return;
			}
			this.pwMessages = [];

			try {
				const response = await fetch("/auth/signup", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
					body: JSON.stringify({ email: this.email, password: this.password }),
				});

				if (!response.ok) {
					const data = await response.json().catch(() => ({}));
					this.error = data.message || "Signup failed";
					return;
				}

				if (this.$router) {
					this.$router.push("/home");
				} else {
					window.location.href = "/";
				}
			} catch (e) {
				this.error = "Network error";
			}
		},
	},
};
</script>

<!-- Keep styles global so imported CSS applies as in original HTML -->
<style>
/* Component-specific adjustments (if any) can go here */
</style>

