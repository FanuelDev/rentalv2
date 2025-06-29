<template>
  <div class="row g-4 p-3">
    <div class="col-md-3 col-sm-6" v-for="(item, index) in statCards" :key="index">
      <a-card class="text-center shadow rounded">
        <p class="text-muted mb-1">{{ item.label }}</p>
        <p class="h4 fw-bold mb-0">{{ item.value }}</p>
      </a-card>
    </div>

    <div class="col-12">
      <a-card title="📝 5 dernières réservations" class="shadow rounded">
        <a-table :columns="columns" :data-source="latestReservations" row-key="id" size="small" :pagination="true" />
      </a-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { message } from 'ant-design-vue'

interface Reservation {
  id: number
  client: string
  voiture: string
  date: string
}

const stats = ref({
  accounts: 0,
  reservations: 0,
  vehicles: 0,
  available: 0,
})

const latestReservations = ref<Reservation[]>([])

const columns = [
  { title: 'Client', dataIndex: 'client', key: 'client' },
  { title: 'Voiture', dataIndex: 'voiture', key: 'voiture' },
  { title: 'Date', dataIndex: 'date', key: 'date' },
  { title: 'Actions', dataIndex: 'actions', key: 'actions' },
]

const statCards = computed(() => [
  { label: 'Comptes créés', value: stats.value.accounts },
  { label: 'Réservations', value: stats.value.reservations },
  { label: 'Voitures enregistrées', value: stats.value.vehicles },
  { label: 'Disponibles', value: stats.value.available },
])

onMounted(async () => {
  try {
    const resStats = await fetch('/api/dashboard/stats')
    stats.value = await resStats.json()

    const resLatest = await fetch('/api/dashboard/latest-reservations')
    latestReservations.value = await resLatest.json()
  } catch (error) {
    message.error("Erreur lors du chargement des données du dashboard")
  }
})
</script>

<style scoped>
.shadow {
  box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.05);
}
.rounded {
  border-radius: 0.75rem;
}
</style>