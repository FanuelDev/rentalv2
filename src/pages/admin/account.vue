<template>
  <div class="p-4">
    <h5 class="fw-bold mb-4 pb-2">Liste des comptes créés</h5>
    <a-table :columns="accountColumns" :data-source="accounts" row-key="id" size="middle">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'pieceIdentite'">
          <a-button type="link" @click="viewFile(record.pieceIdentite)">Voir</a-button>
        </template>
        <template v-else-if="column.key === 'justificatifAdresse'">
          <a-button type="link" @click="viewFile(record.justificatifAdresse)">Voir</a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { message } from 'ant-design-vue'

interface Account {
  id: number
  nom: string
  prenom: string
  email: string
  pieceIdentite: string
  justificatifAdresse: string
}

const accounts = ref<Account[]>([])

const accountColumns = [
  { title: 'Nom', dataIndex: 'nom', key: 'nom' },
  { title: 'Prénom', dataIndex: 'prenom', key: 'prenom' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Pièce d’identité', key: 'pieceIdentite' },
  { title: 'Justificatif d’adresse', key: 'justificatifAdresse' },
  { title: 'Actions', dataIndex: 'actions', key: 'actions' },
]

function viewFile(url: string) {
  window.open(url, '_blank')
}

onMounted(async () => {
  try {
    const resAccounts = await fetch('/api/dashboard/accounts')
    accounts.value = await resAccounts.json()
  } catch (error) {
    message.error("Erreur lors du chargement des comptes")
  }
})
</script>

<style scoped>
.shadow {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
}
.rounded {
  border-radius: 0.75rem;
}
</style>