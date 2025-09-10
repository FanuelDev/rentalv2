<template>
  <div class="p-4">
    <h5 class="fw-bold mb-4 pb-2">Liste des réservations</h5>
    <div>
      <a-radio-group v-model:value="size" @change="filterReserve" style="margin-bottom: 16px">
        <a-radio-button value="all">Tous</a-radio-button>
        <a-radio-button value="en_attente">En attente</a-radio-button>
        <a-radio-button value="validee">Validée</a-radio-button>
        <a-radio-button value="annulee">Annulée</a-radio-button>
      </a-radio-group>
    </div>
    <a-table :columns="reservationColumns" :data-source="reservations" row-key="id" size="middle">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'piece_justificative'">
          <a-button type="link" @click="viewFile(record.piece_justificative)">Voir</a-button>
        </template>
        <template v-if="column.key === 'statut'">
          <a-tag :color="record.statut == 'en_attente' ? 'blue' : record.statut == 'validee' ? 'green' : 'red'">{{ record.statut }}</a-tag>
        </template>
        <template v-if="column.key === 'actions'">
          <a-popconfirm v-if="record.statut == 'en_attente'" title="Valider cette réservation ?" ok-text="Oui" cancel-text="Non"
            @confirm="validateReservation(record.id)">
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



const size = ref<any>('all');

interface Reservation {
  id: number
  client: string
  voiture: string
  dateReservation: string
  statut: string
}

const baseUrlFront = import.meta.env.VITE_FRONT_URL

const reservations = ref<Reservation[]>([])
const reservations_d = ref<Reservation[]>([])


const reservationColumns = [
  { title: 'Date de réservation', dataIndex: 'dateReservation', key: 'dateReservation' },
  { title: 'Client', dataIndex: 'client', key: 'client' },
  { title: 'Pièce d’identité', dataIndex: 'piece_justificative', key: 'piece_justificative' },
  { title: 'Voiture', dataIndex: 'voiture', key: 'voiture' },
  { title: 'Date de debut', dataIndex: 'dateDebut', key: 'dateDebut' },
  { title: 'Date de fin', dataIndex: 'dateFin', key: 'dateFin' },
  { title: 'Montant (XOF)', dataIndex: 'montant', key: 'montant' },
  { title: 'Statut', dataIndex: 'statut', key: 'statut' },
  { title: 'Actions', key: 'actions' },
]

const filterReserve = () => {
  console.log(size.value)
  if (size.value === 'all') {
    reservations.value = reservations_d.value
  } else {
    reservations.value = reservations_d.value.filter(reserve => reserve.statut === size.value)
  }
}

function viewFile(url: string) {
  console.log(url)
  window.open(`${baseUrlFront}/${JSON.parse(url)[0]}`, '_blank')
}

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
    reservations_d.value = res.data
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
