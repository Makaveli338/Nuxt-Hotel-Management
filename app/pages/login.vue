<template>
  <div
    class="min-h-screen bg-[url('/Landing-page.jpg')] bg-cover bg-center w-full flex items-center justify-center px-4 relative"
  >
    <NuxtLink
      to="/"
      class="absolute top-10 left-10 bg-purple-900 hover:bg-purple-700 text-white py-2 px-3 rounded-3xl h-fit flex gap-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
        />
      </svg>
      Back to Home
    </NuxtLink>

    <!--Main Container-->
    <div
      class="relative w-full sm:w-[500px] bg-transparent border-1 rounded-2xl backdrop-blur-[55px] text-white border-pink-200 p-6"
    >
      <div v-if="activeTab === 'login'" class="flex flex-col gap-4">
        <h1 class="text-2xl font-semibold">Login</h1>

        <!--Email-->
        <div>
          <label class="block font-medium">Email:</label>
          <input
            v-model="loginForm.email"
            type="email"
            class="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          />
        </div>

        <!--Password-->
        <div>
          <label class="block font-medium">Password:</label>
          <input
            v-model="loginForm.password"
            type="password"
            class="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          />
        </div>

        <!--Dont have an Account?-->
        <div class="flex gap-4">
          <p>Don't have an account?</p>
          <button
            @click="activeTab = 'register'"
            class="text-purple-900 hover:text-purple-950 font-medium cursor-pointer"
          >
            Register
          </button>
        </div>
        <p v-if="message" :class="messageType">{{ message }}</p>
        <button
          @click="handleLogin"
          class="bg-purple-500 cursor-pointer hover:bg-purple-600 text-white py-2 px-4 rounded-3xl text-center h-fit"
        >
          Login
        </button>
      </div>

      <!--Register Form-->
      <div v-else class="flex flex-col gap-4">
        <h1 class="text-2xl font-semibold">Register</h1>
        <!--Email-->
        <div>
          <label class="block font-medium">Email:</label>
          <input
          v-model="registerForm.email"
            type="email"
            class="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          />
        </div>

        <!--Password-->
        <div>
          <label class="block font-medium">Password:</label>
          <input
          v-model="registerForm.password"
            type="password"
            class="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          />
        </div>

        <!--Username-->
        <div>
          <label class="block font-medium">Username:</label>
          <input
          v-model="registerForm.username"
            type="text"
            class="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          />
        </div>

        <!--Have an Account?-->
        <div class="flex gap-4">
          <p>Have an account?</p>
          <button
            @click="activeTab = 'login'"
            class="text-purple-900 hover:text-purple-950 font-medium cursor-pointer"
          >
            Login
          </button>
        </div>
        <button  @click="handleRegister"
          class="bg-purple-500 cursor-pointer hover:bg-purple-600 text-white py-2 px-4 rounded-3xl text-center h-fit"
        >
          Register
        </button>
          <p v-if="message" :class="messageType">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useUserStore } from '../../stores/user'


const userStore = useUserStore()

const activeTab = ref("login");
const router = useRouter()
// Forms
const loginForm = reactive({ email: '', password: '' })
const registerForm = reactive({ username: '', email: '', password: '' })


// Feedback messages
const message = ref('')
const messageType = ref('text-green-500')


//  LOGIN HANDLER
const handleLogin = async () => {
  message.value = ''
  try {
    const res = await $fetch('/api/auth/login', {
      method: 'POST',
      body: loginForm
    })

    // Save user credentials globally
    userStore.setUser(res)

    message.value = res.message || 'Login successful!'
    messageType.value = 'text-green-500'

    // Redirect based on role
    if (res.role === 'admin') {
      router.push('/admindashboard')
    } else {
      router.push('/staffdashboard')
    }

  } catch (err) {
    message.value = err.data?.statusMessage || 'Login failed'
    messageType.value = 'text-red-500'
  }
}

//  REGISTER HANDLER
const handleRegister = async () => {
  message.value = ''
  try {
    const res = await $fetch('/api/auth/register', {
      method: 'POST',
      body: registerForm
    })

    message.value = `User ${res.user.username} registered successfully!`
    messageType.value = 'text-green-500'

    // Redirect user to login page
    setTimeout(() => {
      activeTab.value = 'login'
    }, 1000)

  } catch (err) {
    message.value = err.data?.statusMessage || 'Registration failed'
    messageType.value = 'text-red-500'
  }
}


</script>
