<template>
  <div class="p-4">
    <h5 class="fw-bold mb-4 pb-2">Liste des réservations</h5>
    <a-table :columns="reservationColumns" :data-source="reservations" row-key="id" size="middle">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'actions'">
          <a-popconfirm
            title="Valider cette réservation ?"
            ok-text="Oui"
            cancel-text="Non"
            @confirm="validateReservation(record.id)"
          >
            <a-button type="primary" size="small">Valider</a-button>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { message } from 'ant-design-vue'

interface Reservation {
  id: number
  client: string
  voiture: string
  dateReservation: string
  statut: string
}

const reservations = ref<Reservation[]>([])

const reservationColumns = [
  { title: 'Client', dataIndex: 'client', key: 'client' },
  { title: 'Voiture', dataIndex: 'voiture', key: 'voiture' },
  { title: 'Date de réservation', dataIndex: 'dateReservation', key: 'dateReservation' },
  { title: 'Statut', dataIndex: 'statut', key: 'statut' },
  { title: 'Actions', key: 'actions' },
]

const validateReservation = async (id: number) => {
  try {
    const response = await fetch(`/api/dashboard/reservations/${id}/validate`, {
      method: 'POST',
    })
    if (!response.ok) throw new Error()
    message.success("Réservation validée avec succès")
    await loadReservations()
  } catch (err) {
    message.error("Erreur lors de la validation de la réservation")
  }
}

const loadReservations = async () => {
  try {
    const res = await fetch('/api/dashboard/reservations')
    reservations.value = await res.json()
  } catch (error) {
    message.error("Erreur lors du chargement des réservations")
  }
}

onMounted(() => {
  loadReservations()
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
