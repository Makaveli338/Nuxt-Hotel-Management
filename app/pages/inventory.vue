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
                Supplier
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
                {{ item.supplier }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                {{ item.lastRestock }}
              </td>
              <td>        
                <button  @click="showEditModal = true" class="text-pink-600 hover:text-pink-800 cursor-pointer">
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- Add Product Modal-->
  <TransitionRoot as="template" :show="showModal">
    <Dialog as="div" class="relative z-50" @close="open = false">
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
                        class="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      >
                        <option value="">Select an option</option>
                        <option value="skincare">In Stock</option>
                        <option value="makeup">Out of Stock</option>
                        <option value="haircare">Low Stock</option>
                      </select>
                    </div>

                    <!-- Item Supplier -->
                    <div>
                      <label class="block font-medium text-gray-700"
                        >Item Supplier</label
                      >
                      <input
                        type="text"
                        class="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      />
                    </div>

                    <!--Last Restock-->
                    <div>
                      <label class="block font-medium text-gray-700"
                        >Last Restock</label
                      >
                      <input
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
                  @click="showModal = false"
                >
                  Cancel
                </button>

                <button
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

  <!-- Edit Product Modal-->
  <TransitionRoot as="template" :show="showEditModal">
    <Dialog as="div" class="relative z-50" @close="open = false">
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
                        class="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      >
                        <option value="">Select an option</option>
                        <option value="skincare">In Stock</option>
                        <option value="makeup">Out of Stock</option>
                        <option value="haircare">Low Stock</option>
                      </select>
                    </div>

                    <!-- Item Supplier -->
                    <div>
                      <label class="block font-medium text-gray-700"
                        >Item Supplier</label
                      >
                      <input
                        type="text"
                        class="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                      />
                    </div>

                    <!--Last Restock-->
                    <div>
                      <label class="block font-medium text-gray-700"
                        >Last Restock</label
                      >
                      <input
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

<script setup>
import Header from "~/components/Header.vue";
import { ref, watch, onMounted, computed } from "vue";
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
const inventoryData = reactive([
  {
    id: 1,
    name: "Rose Glow Serum",
    category: "Skincare",
    quantity: 45,
    price: "KES 500",
    status: "In Stock",
    supplier: "GlowCo Supplies",
    lastRestock: "2025-09-15",
  },
  {
    id: 2,
    name: "Velvet Matte Lipstick",
    category: "Makeup",
    quantity: 0,
    price: "KES 500",
    status: "Out of Stock",
    supplier: "BeautyEssentials Ltd",
    lastRestock: "2025-08-20",
  },
  {
    id: 3,
    name: "Aloe Soothing Gel",
    category: "Skincare",
    quantity: 120,
    price: "KES 500",
    status: "In Stock",
    supplier: "NatureCare",
    lastRestock: "2025-09-25",
  },
  {
    id: 4,
    name: "Nail Polish Remover",
    category: "Nails",
    quantity: 15,
    price: "KES 500",
    status: "Low Stock",
    supplier: "PolishWorld",
    lastRestock: "2025-09-30",
  },
  {
    id: 5,
    name: "Hydrating Hair Mask",
    category: "Haircare",
    quantity: 5,
    price: "KES 500",
    status: "Low Stock",
    supplier: "HairLux",
    lastRestock: "2025-09-28",
  },
]);
</script>
