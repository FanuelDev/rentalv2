<template>
  <div class="p-4">
    <h5 class="fw-bold mb-4 pb-2">Liste des comptes créés</h5>
    <a-table :columns="accountColumns" :data-source="accounts" row-key="id" size="middle">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'piece_justificative'">
          <a-button type="link" @click="viewFile(record.piece_justificative)">Voir</a-button>
        </template>
        <template v-else-if="column.key === 'preuve_adresse'">
          <a-button type="link" @click="viewFile(record.preuve_adresse)">Voir</a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import apiService from "../../services/apiService";

const baseUrlFront = import.meta.env.VITE_FRONT_URL

interface Account {
  id: number
  name: string
  email: string
  piece_justificative: string
  preuve_adresse: string
}

const accounts = ref<Account[]>([])

const accountColumns = [
  { title: 'Nom', dataIndex: 'name', key: 'name' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Pièce d’identité', key: 'piece_justificative' },
  { title: 'Justificatif d’adresse', key: 'preuve_adresse' },
  // { title: 'Actions', dataIndex: 'actions', key: 'actions' },
]

function viewFile(url: string) {
  console.log(url)
  window.open(`${baseUrlFront}/${url}`, '_blank')
}

onMounted(async () => {
  getAmountList()
})

const getAmountList = () => {
  apiService.adminGetAccount().then(res => {
    console.log(res)
    accounts.value = res.data
  })
}
</script>

<style scoped>
.shadow {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
}
.rounded {
  border-radius: 0.75rem;
}
</style>