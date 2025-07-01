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
import { notification } from "ant-design-vue";
import { ref, onMounted } from 'vue'
import apiService from "../../services/apiService";

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
  { title: 'Actions', key: 'actions' },
]

const validateReservation = async (id: number) => {
  apiService.adminValidReservation(id).then(res => {
    console.log(res)
    notification.success({
      message: "Reservation validée",
      description: "Votre reservation est validée avec success.",
    });
    loadReservations()
  })
}

const loadReservations = async () => {
  apiService.adminGetReservation().then(res => {
    console.log(res)
    reservations.value = res.data
  })
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
