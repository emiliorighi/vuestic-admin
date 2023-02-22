<template>
  <div class="row align-center">
    <va-input v-model="filter.filter" label="search user" class="flex lg4 md4 sm12 xs12"></va-input>
    <va-button :disabled="filter.filter.length <= 2" icon="search" @click="handleSubmit"> Search </va-button>
  </div>
  <va-data-table :items="users" :columns="['name', 'role', 'actions']">
    <template #cell(actions)="{ rowData }">
      <va-chip color="danger" icon="delete" @click="deleteConfirmation(rowData)">Delete User</va-chip>
    </template>
  </va-data-table>
  <div class="row justify-center">
    <div class="flex">
      <va-pagination
        v-model="offset"
        :page-size="pagination.limit"
        :total="total"
        :visible-pages="3"
        buttons-preset="secondary"
        rounded
        gapped
        border-color="primary"
        @update:model-value="handlePagination"
      />
    </div>
  </div>
  <va-modal v-model="showModal" hide-default-actions>
    <template #header>
      <h2 style="color: red">Delete {{ userToDelete.name }}</h2>
    </template>
    <div style="padding: 10px">
      Are you sure you want to delete user: <strong>{{ userToDelete.name }}</strong> ?
    </div>
    <template #footer>
      <va-button color="danger" @click="deleteUser()"> Delete </va-button>
    </template>
  </va-modal>
</template>
<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import UserService from '../../../services/clients/UserService'

  const initPagination = {
    offset: 0,
    limit: 10,
  }

  const initFilter = {
    filter: '',
    filter_option: '',
  }

  const showModal = ref(false)
  const filter = ref({ ...initFilter })
  const pagination = ref({ ...initPagination })
  const offset = ref(1 + pagination.value.offset)
  const users = ref([])
  const total = ref(0)

  const userToDelete = ref({
    name: null,
  })
  onMounted(async () => {
    const { data } = await UserService.getUsers({ ...pagination.value })
    users.value = data.data
    total.value = data.total
  })

  async function handlePagination(value: number) {
    pagination.value.offset = value - 1
    const { data } = await UserService.getUsers({ ...pagination.value, ...filter.value })
    users.value = data.data
    total.value = data.total
  }
  async function handleSubmit() {
    const { data } = await UserService.getUsers({ ...pagination.value, ...filter.value })
    users.value = data.data
    total.value = data.total
    pagination.value = { ...initPagination }
  }

  function deleteConfirmation(rowData) {
    userToDelete.value.name = rowData.accession
    showModal.value = true
  }

  async function deleteUser() {
    const { data } = await UserService.deleteUser(userToDelete.value.name)
    console.log(data)
  }
</script>
