<template>
  <div class="p-4">
    <h5 class="fw-bold mb-4 pb-2">Liste des véhicules enregistrés</h5>
    <div class="row g-4">
      <div class="col-md-4" v-for="vehicle in vehicles" :key="vehicle.id">
        <a-badge-ribbon :text="vehicle.gamme" :color="vehicle.gamme === 'Economique' ? 'green' : 'blue'">
          <a-card class="shadow rounded">
            <div class="mb-2">
              <a-tag :color="vehicle.statut === 'Disponible' ? 'green' : 'red'">{{ vehicle.statut }}</a-tag>
              <a-tag color="blue">{{ vehicle.climatisation ? 'Climatisée' : 'Non climatisée' }}</a-tag>
            </div>
            <div>
              <img :src="`https://aaa.troispuissances.fr/${vehicle.image}`" class="img-fluid img-voiture3 rounded mb-3" alt="Image véhicule" />
            </div>
            <div class="d-flex justify-content-between align-items-end">
              <div>
                <span class="fw-semibold">{{ vehicle.marque }} | {{ vehicle.modele }}</span>
                <br />
                <h6 class="text-muted">{{ vehicle.annee }}</h6>
              </div>
              <div>
                <h6 class="text-primary">{{ vehicle.prix_journalier }} XOF / Jour</h6>
              </div>
            </div>
          </a-card>
        </a-badge-ribbon>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { message } from 'ant-design-vue'

interface Vehicle {
  id: number
  marque: string
  modele: string
  annee: string
  prix_journalier: number
  image: string
  statut: string
  gamme: string
  climatisation: boolean
}

const vehicles = ref<Vehicle[]>([])

onMounted(async () => {
  try {
    const res = await fetch('/api/dashboard/vehicles')
    vehicles.value = await res.json()
  } catch (error) {
    message.error("Erreur lors du chargement des véhicules")
  }
})
</script>

<style scoped>
.img-voiture3 {
  width: 100%;
  height: auto;
  object-fit: cover;
}
.shadow {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
}
.rounded {
  border-radius: 0.75rem;
}
</style>
