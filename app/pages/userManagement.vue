<template>
  <section class="flex flex-col gap-6">
    <Header />

    <section class="px-6 flex flex-col gap-6">
      <h1 class="text-3xl font-semibold text-pink-900">User Management</h1>

      <div v-if="loading" class="text-gray-500">Loading users...</div>

      <div
        v-else
        class="bg-white border border-pink-400 rounded-xl md:overflow-hidden overflow-x-scroll"
      >
        <table class="min-w-full divide-y divide-pink-400">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left font-medium text-gray-500 capitalize tracking-wider whitespace-nowrap"
              >
                ID
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left font-medium text-gray-500 capitalize tracking-wider"
              >
                Username
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left font-medium text-gray-500 capitalize tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left font-medium text-gray-500 capitalize tracking-wider"
              >
                Role
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left font-medium text-gray-500 capitalize tracking-wider whitespace-nowrap"
              >
                Action
              </th>
            </tr>
          </thead>

          <tbody class="bg-white divide-y divide-gray-200">
            <!-- Dynamic rows -->
            <tr v-for="user in paginatedUsers" :key="user.id">
              <td class="px-6  whitespace-nowrap text-sm w-1/4">
                <p>{{ user.id }}</p>
              </td>
              <td class="px-6  whitespace-nowrap text-sm w-1/4">
                <p>{{ user.username }}</p>
              </td>
              <td class="px-6  whitespace-nowrap text-sm w-1/4">
                <p>{{ user.email }}</p>
              </td>
              <td class="px-6 py-2 whitespace-nowrap text-sm w-1/4">
                <div>
                  
                  <select
                    v-model="user.newRole"
                    class="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                  >
                    <option value="user">User</option>
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </td>
              <td class="p-3 ">
                <button
                  @click="updateUserRole(user)"
                    :disabled="user.role === 'admin'"
                  class="text-pink-600 hover:text-pink-800 px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Update
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Pagination -->
        <PaginationNavigation
          :current_page="currentPage"
          :page_size="itemsPerPage"
          :total_entries="users.length"
          :total_pages="Math.ceil(users.length / itemsPerPage)"
          @payload="onPageChange"
        />
      </div>

      <p v-if="message" :class="messageType" class="mt-4">{{ message }}</p>
    </section>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import Header from "../components/Header.vue";
import PaginationNavigation from "../components/pagination.vue";

const currentPage = ref(1);
const itemsPerPage = ref(5);
const users = ref([]);
const loading = ref(true);
const message = ref("");
const messageType = ref("text-green-600");

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return users.value.slice(start, end);
});

// Fetch all users
const fetchUsers = async () => {
  try {
    const res = await $fetch("/api/users/all");
    users.value = res.users.map((u) => ({ ...u, newRole: u.role }));
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// Update role
const updateUserRole = async (user) => {
  try {
    const res = await $fetch("/api/users/updateRole", {
      method: "POST",
      body: { userId: user.id, newRole: user.newRole },
    });
    message.value = res.message;
    messageType.value = "text-green-600";
  } catch (err) {
    message.value = err.data?.statusMessage || "Failed to update role";
    messageType.value = "text-red-600";
  }
};

onMounted(fetchUsers);
</script>
