<template>
  <Header />

  <section class="p-6 flex flex-col gap-6">
    <div
      class="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-6"
    >
      <p class="text-3xl font-semibold text-pink-600">Overview</p>
      <button
        @click="showModal = true"
        class="bg-pink-600 hover:bg-pink-800 cursor-pointer text-white px-4 py-2 rounded-full shadow"
      >
        Add Product
      </button>
    </div>

    <div
      class="inline-block w-full align-middle rounded-lg bg-white ring-1 ring-[#EAECF0] divide-y divide-[#EAECF0] overflow-x-hidden"
    >
      <!-- Table Header with Search-->
      <div class="px-6 py-3 w-full">
        <div class="w-full space-y-4 sm:flex sm:space-x-4 sm:space-y-0">
          <!-- Table search -->
          <div class="w-full flex-grow sm:w-auto">
            <div class="relative rounded-md border-[0.5px] border-[#EAECF0]">
              <div
                class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
              >
                <svg
                  class="h-5 w-5 text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M7.791 14.666a6.375 6.375 0 1 0 0-12.75 6.375 6.375 0 0 0 0 12.75Zm5.618.489c.375 1.134 1.232 1.247 1.891.255.602-.906.206-1.65-.885-1.65-.808-.007-1.261.623-1.006 1.395Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                name="search"
                id="search"
                class="pl-10 w-full p-2 rounded-md border border-[#EAECF0] focus:outline-none focus:ring-1 focus:ring-pink-600 focus:border-pink-600"
                placeholder="Search inventory..."
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-scroll">
        <table class="w-full py-3 border-t border-gray-200">
          <thead>
            <tr class="bg-pink-50">
              <th
                class="py-3 px-4 text-start text-sm font-medium text-gray-600"
              >
                Item Name
              </th>
              <th
                class="py-3 px-4 text-start text-sm font-medium text-gray-600"
              >
                Category
              </th>

              <th
                class="py-3 px-4 text-start text-sm font-medium text-gray-600"
              >
                Quantity
              </th>
              <th
                class="py-3 px-4 text-start text-sm font-medium text-gray-600"
              >
                Unit Price
              </th>
              <th
                class="py-3 px-4 text-start text-sm font-medium text-gray-600"
              >
                Stock Status
              </th>
              
              <th
                class="py-3 px-4 text-start text-sm font-medium text-gray-600"
              >
                Last Restock
              </th>
              <!--Actions-->
              <th
                class="py-3 px-4 text-start text-sm font-medium text-gray-600"
              ></th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200 text-sm text-gray-700">
            <tr v-for="item in inventoryData" :key="item.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                {{ item.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                {{ item.category }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                {{ item.quantity }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                {{ item.price }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  v-if="item.status === 'In Stock'"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                >
                  In Stock
                </span>
                <span
                  v-else-if="item.status === 'Out of Stock'"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                >
                  Out of Stock
                </span>
                <span
                  v-else-if="item.status === 'Low Stock'"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800"
                >
                  Low Stock
                </span>
              </td>             
              <td class="px-6 py-4 whitespace-nowrap text-sm">
               {{ formatDate(item.last_restock) }}
              </td>
              <td> 
                <div class="flex gap-3">
                  <button  @click="openEditModal(item)" class="hover:bg-gray-200 cursor-pointer p-2 rounded-full aspect-square">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                  </button>
                  <button @click="deleteItem(item.id)" class="cursor-pointer hover:bg-gray-200 p-2 rounded-full aspect-square">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </div>       

              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- Add Product Modal-->
  <TransitionRoot as="template" :show="showModal">
    <Dialog as="div" class="relative z-50" @close="showModal = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 backdrop-blur-sm bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6"
            >
              <div class="sm:flex sm:items-start w-full">
                <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <DialogTitle
                    as="h3"
                    class="text-base text-left font-semibold leading-6 text-pink-600"
                  >
                    Add Prroduct
                  </DialogTitle>
                  <hr class="-mx-6 mt-4 !text-gray-50" />
                  <div class="mt-4 flex flex-col gap-4 w-full">
                    <!-- Item Name -->
                    <div>
                      <label class="block font-medium text-gray-700"
                        >Item Name</label
                      >
                      <input
                      v-model="newProduct.name"
                        type="text"
                        class="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      />
                    </div>
                    <!-- Item Category -->
                    <div>
                      <label class="block font-medium text-gray-700"
                        >Item Category</label
                      >
                      <select
                      v-model="newProduct.category"
                        class="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      >
                        <option value="">Select an option</option>
                        <option value="skincare">Skincare</option>
                        <option value="makeup">Makeup</option>
                        <option value="haircare">Haircare</option>
                        <option value="nails">Nails</option>
                      </select>
                    </div>

                    <!-- Item Quantity -->
                    <div>
                      <label class="block font-medium text-gray-700"
                        >Item Quantity</label
                      >
                      <input
                      v-model="newProduct.quantity"
                        type="number"
                        class="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      />
                    </div>

                    <!-- Item Price -->
                    <div>
                      <label class="block font-medium text-gray-700"
                        >Item Price</label
                      >
                      <input
                      v-model="newProduct.price"
                        type="text"
                        class="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="mt-6 gap-4 w-full flex flex-row items-center justify-end"
              >
                <button
                  type="button"
                  class="bg-pink-900 hover:bg-pink-800 cursor-pointer text-white px-4 py-2 rounded-full shadow"
                  @click="showModal = false"
                >
                  Cancel
                </button>

                <button
                 @click="addProduct"
                  type="button"
                  class="bg-pink-600 hover:bg-pink-800 cursor-pointer text-white px-4 py-2 rounded-full shadow"
                >
                 Add Product
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <!-- Edit Product Modal-->
  <TransitionRoot as="template" :show="showEditModal">
    <Dialog as="div" class="relative z-50" @close="showEditModal = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 backdrop-blur-sm bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6"
            >
              <div class="sm:flex sm:items-start w-full">
                <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <DialogTitle
                    as="h3"
                    class="text-base text-left font-semibold leading-6 text-pink-600"
                  >
                    Edit Prroduct
                  </DialogTitle>
                  <hr class="-mx-6 mt-4 !text-gray-50" />
                  <div class="mt-4 flex flex-col gap-4 w-full">
                    <!-- Item Name -->
                    <div>
                      <label class="block font-medium text-gray-700"
                        >Item Name</label
                      >
                      <input
                      v-model="editForm.name"
                        type="text"
                        class="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      />
                    </div>
                    <!-- Item Category -->
                    <div>
                      <label class="block font-medium text-gray-700"
                        >Item Category</label
                      >
                      <select
                      v-model="editForm.category"
                        class="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      >
                        <option value="">Select an option</option>
                        <option value="skincare">Skincare</option>
                        <option value="makeup">Makeup</option>
                        <option value="haircare">Haircare</option>
                        <option value="nails">Nails</option>
                      </select>
                    </div>

                    <!-- Item Quantity -->
                    <div>
                      <label class="block font-medium text-gray-700"
                        >Item Quantity</label
                      >
                      <input
                      v-model="editForm.quantity"
                        type="number"
                        class="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      />
                    </div>                  

                    <!-- Item Price -->
                    <div>
                      <label class="block font-medium text-gray-700"
                        >Item Price</label
                      >
                      <input
                      v-model="editForm.price"
                        type="text"
                        class="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      />
                    </div>   
                    
                     <!--Stock status-->
                     <div>
                      <label class="block font-medium text-gray-700"
                        >Stock Status</label
                      >
                      <select
                      v-model="editForm.status"
                        class="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      >
                        <option value="">Select an option</option>
                        <option value="In Stock">In Stock</option>
                        <option value="Low Stock">Low Stock</option>
                        <option value="Out of Stock">Out of stock</option>
                      </select>
                    </div>

                    <!--Last Restock-->
                    <div>
                      <label class="block font-medium text-gray-700"
                        >Last Restock</label
                      >
                      <input
                      v-model="editForm.last_restock"
                        type="date"
                        class="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="mt-6 gap-4 w-full flex flex-row items-center justify-end"
              >
                <button
                  type="button"
                  class="bg-pink-900 hover:bg-pink-800 cursor-pointer text-white px-4 py-2 rounded-full shadow"
                  @click="showEditModal = false"
                >
                  Cancel
                </button>

                <button
                 @click="saveChanges"
                  type="button"
                  class="bg-pink-600 hover:bg-pink-800 cursor-pointer text-white px-4 py-2 rounded-full shadow"
                >
                  Save Changes
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import Header from "~/components/Header.vue";
import { ref, watch, onMounted, computed, reactive } from "vue";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

const showModal = ref(false);
const showEditModal = ref(false);
const selectedCategory = ref(null);
const selectedItem = ref<InventoryItem | null>(null);
const { data: inventoryData, refresh } = await useFetch<InventoryItem[]>('/api/inventory', {
  default: () => [],
});


// Temporary reactive object for form fields
interface EditForm {
  name: string
  category: string
  quantity: number
  price: number
  status: string
  last_restock?: string
}

const editForm = reactive<EditForm>({
  name: '',
  category: '',
  quantity: 0,
  price: 0,
  status: '',
  last_restock: ''
})

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
  status: string;
  last_restock: string;
  created_at?: string;
  updated_at?: string;
}


const openEditModal = (item: InventoryItem) => {
  selectedItem.value = item
  editForm.name = item.name
  editForm.category = item.category
  editForm.quantity = item.quantity
  editForm.price = item.price
  editForm.status = item.status
  editForm.last_restock = (item.last_restock ?? '').split('T')[0];
    showEditModal.value = true
}

// Functionality to add new product
const newProduct = reactive({
  name: "",
  category: "",
  quantity: 0,
  price: "",
  status: "In Stock",
  last_restock: "",
});

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
};


const addProduct = async () => {
  await $fetch("/api/inventory", {
    method: "POST",
    body: newProduct,
  });

  showModal.value = false;
  await refresh(); // reload updated list
  Object.assign(newProduct, {
    name: "",
    category: "",
    quantity: 0,
    price: "",
    status: "In Stock",
    last_restock: "",
  });
};

// Function to update inventory item
const saveChanges = async () => {
  if (!selectedItem.value) return;

  try {
    await $fetch(`/api/inventory/${selectedItem.value.id}`, {
      method: 'PUT',
      body: {
        name: editForm.name,
        category: editForm.category,
        quantity: editForm.quantity,
        price: editForm.price,
        status: editForm.status,
        last_restock: editForm.last_restock,
      },
    });

    await refresh(); // reload updated list
    showEditModal.value = false;
  } catch (err) {
    console.error('Error updating item:', err);
  }
};

// Function to delete an entry
const deleteItem = async (id: number) => {
  if (!confirm("Are you sure you want to delete this item?")) return;

  try {
    await $fetch(`/api/inventory/${id}`, {
      method: "DELETE",
    });

    // Option 1: Refresh all data
    await refresh();

  } catch (err) {
    console.error("Error deleting item:", err);
  }
};







</script>
