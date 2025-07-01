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
        <a-table :columns="reservationColumns" :data-source="reservations" row-key="id" size="middle">
    </a-table>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import apiService from "../../services/apiService";


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

interface Reservation {
  id: number
  client: string
  voiture: string
  dateReservation: string
  statut: string
}

const reservations = ref<Reservation[]>([])

const reservationColumns = [
  { title: 'Date de réservation', dataIndex: 'dateReservation', key: 'dateReservation' },
  { title: 'Client', dataIndex: 'client', key: 'client' },
  { title: 'Voiture', dataIndex: 'voiture', key: 'voiture' },
  { title: 'Date de debut', dataIndex: 'dateDebut', key: 'dateDebut' },
  { title: 'Date de fin', dataIndex: 'dateFin', key: 'dateFin' },
  { title: 'Montant (XOF)', dataIndex: 'montant', key: 'montant' },
  { title: 'Statut', dataIndex: 'statut', key: 'statut' },
  // { title: 'Actions', key: 'actions' },
]


const statCards = computed(() => [
  { label: 'Comptes créés', value: stats.value.accounts },
  { label: 'Réservations', value: stats.value.reservations },
  { label: 'Voitures enregistrées', value: stats.value.vehicles },
  { label: 'Disponibles', value: stats.value.available },
])

onMounted(async () => {
  getStatistique()
  loadReservations()
})

const getStatistique = () => {
  apiService.adminStat().then(res => {
    console.log(res)
    stats.value = res.data
  })
}


const loadReservations = async () => {
  apiService.adminGetReservation().then(res => {
    console.log(res)
    reservations.value = res.data
  })
}
</script>

<style scoped>
.shadow {
  box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.05);
}
.rounded {
  border-radius: 0.75rem;
}
</style>