<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <div class="bg-light p-4 brr">
          <div class="d-flex justify-content-between align-items-center">
            <h4>Filtres</h4>
            <h6 class="text-primar">Reset</h6>
          </div>
          <div class="my-4">
            <div class="w-100 py-4"><a-range-picker v-model:value="state.valueDate" show-time size="large" />
            </div>
            <div class="w-100 py-4">
              <h6 class="mb-4">Type de vehicule</h6>
              <a-checkbox-group v-model:value="state.checkedTypes" :options="plainOptions" />
            </div>

            <div class="w-100 py-4">
              <h6 class="mb-4">Gamme</h6>
              <a-checkbox-group v-model:value="state.checkedGammes" :options="gammeOptions" />
            </div>

            <div class="w-100 py-4">
              <h6 class="mb-4">Budget (XOF)</h6>
              <a-slider v-model:value="state.budget" :min="5000" :max="150000" :step="10000" range />
            </div>

            <div class="w-100 py-4">
              <h6 class="mb-4">Type d’énergie</h6>
              <a-checkbox-group v-model:value="state.checkedEnergies" :options="energieOptions" />
            </div>
            <div class="w-100 py-4">
              <h6 class="mb-4">Usage Spécifique</h6>
              <a-checkbox-group v-model:value="state.checkedUsages" :options="usageOptions" />
            </div>

            <div class="w-100 py-4">
              <h6 class="mb-4">Options & Équipements</h6>
              <div class="d-flex justify-content-between align-items-center my-3">
                <span>Boîte automatique</span>
                <a-switch v-model:checked="state.checkedAutomatic" />
              </div>
              <div class="d-flex justify-content-between align-items-center my-3">
                <span>Climatisation</span>
                <a-switch v-model:checked="state.checkedAirConditioner" />
              </div>
              <div class="d-flex justify-content-between align-items-center my-3">
                <span>Nombre de places</span>
                <a-input-number id="inputNumber" v-model:value="state.place" :min="2" :max="45" />
              </div>
              <div class="d-flex justify-content-between align-items-center my-3">
                <span>GPS intégré</span>
                <a-switch v-model:checked="state.checkedGps" />
              </div>
              <div class="d-flex justify-content-between align-items-center my-3">
                <span>Siège bébé / Rehausseur</span>
                <a-switch v-model:checked="state.checkedBabySeat" />
              </div>
              <div class="d-flex justify-content-between align-items-center my-3">
                <span>Wi-Fi à bord</span>
                <a-switch v-model:checked="state.checkedWifi" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8 py-4">
        <div class="d-flex justify-content-between align-items-center">
          <h4>24 voitures trouvées</h4>
          <h6 class="text-primar">Voir tout</h6>
        </div>
        <div class="my-4 row">
          <div class="col-md-12" v-if="cars.length == 0"><a-alert message="Aucune voiture trouvée" description="🚗 Aucune voiture ne correspond à vos critères.
  Essayez de modifier les filtres pour afficher plus de résultats." type="warning" show-icon />
          </div>
          <div class="col-md-6 my-3" v-for="car in cars" :key="car.id">
            <a @click="showModal(car)" class="a">
              <a-badge-ribbon :text="car.gamme" :color="car.gamme === 'Economique' ? 'green' : 'blue'">
                <a-card>
                  <a-tag :color="car.statut === 'Disponible' ? 'green' : 'red'">{{ car.statut }}</a-tag>
                  <a-tag color="blue">{{ car.climatisation ? 'Climatisée' : 'Non climatisée' }}</a-tag>
                  <div>
                    <img :src="`https://aaa.a07.agency/${car.image}`" class="img-fluid img-voiture3"
                      alt="Image voiture" />
                  </div>
                  <div class="d-flex justify-content-between align-items-end">
                    <div>
                      <span class="text-decorate">{{ car.marque }} | {{ car.modele }}</span>
                      <br />
                      <h6>{{ car.annee }}</h6>
                    </div>
                    <div>
                      <h6>{{ car.prix_journalier }} XOF / Jour</h6>
                    </div>
                  </div>
                </a-card>
              </a-badge-ribbon>
            </a>
          </div>
        </div>

        <div class="d-flex justify-content-end">
          <!-- <a-pagination v-model:current="current" :total="500" /> -->
        </div>
      </div>
    </div>
  </div>

  <a-modal v-model:open="open" title="Détail de la voiture" width="100%" wrap-class-name="full-modal">
    <template #footer></template>
    <div v-if="vehiculeChoice" class="container my-5">
      <div class="row">
        <div class="col-md-6">
          <img :src="`https://aaa.a07.agency/${vehiculeChoice.image}`" class="img-fluid" alt="Image voiture" />
        </div>
        <div class="col-md-6">
          <div class="p-4">
            <!-- Badges de statut -->
            <a-tag :color="vehiculeChoice.statut === 'Disponible' ? 'green' : 'red'">
              {{ vehiculeChoice.statut }}
            </a-tag>
            <a-tag v-if="vehiculeChoice.climatisation" color="blue">Climatisée</a-tag>
            <a-tag v-if="vehiculeChoice.gps" color="purple">GPS</a-tag>
            <a-tag v-if="vehiculeChoice.wifi" color="geekblue">WiFi</a-tag>
            <a-tag v-if="vehiculeChoice.boite_auto" color="cyan">Boîte auto</a-tag>

            <div class="d-flex justify-content-between align-items-end my-4">
              <div>
                <span class="text-decorate">{{ vehiculeChoice.marque }}</span>
                <br />
                <h5>{{ vehiculeChoice.modele }}, {{ vehiculeChoice.annee }}</h5>
              </div>
              <div>
                <h5>{{ vehiculeChoice.prix_journalier.toLocaleString() }} XOF / Jour</h5>
              </div>
            </div>

            <div class="my-4">
              <a-row gutter="16">
                <a-col :span="8">
                  <a-statistic title="Places" :value="vehiculeChoice.places" />
                </a-col>
                <a-col :span="8">
                  <a-statistic title="Type" :value="vehiculeChoice.type_vehicule" />
                </a-col>
                <a-col :span="8">
                  <a-statistic title="Energie" :value="vehiculeChoice.energie" />
                </a-col>
              </a-row>
            </div>

            <div class="my-4">
              <div class="row">
                <div class="col-md-4">
                  <small>Performance</small>
                  <a-progress :percent="60" size="small" />
                </div>
                <div class="col-md-4">
                  <small>Vitesse</small>
                  <a-progress :percent="55" size="small" />
                </div>
                <div class="col-md-4">
                  <small>Tout terrain</small>
                  <a-progress :percent="75" size="small" />
                </div>
              </div>
            </div>

            <div class="my-4">
              <p>
                Notre {{ vehiculeChoice.marque }} {{ vehiculeChoice.modele }} offre un excellent confort avec son moteur
                {{
                vehiculeChoice.energie }} et sa capacité de {{ vehiculeChoice.places }} places.
              </p>
            </div>

            <div class="my-5">
              <a :href="'/search/'+ vehiculeChoice.id" class="btn btn-dark mx-2">Réserver maintenant</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center">
      <small>&copy; Copyright aaa-rental - 2025</small>
    </div>
  </a-modal>

</template>

<!-- <script lang="ts" setup>
import { reactive, ref } from "vue";
import type { Dayjs } from "dayjs";

const plainOptions = [
  "Citadines",
  "Berlines",
  "SUV & 4x4",
  "Vans & Minibus",
  "Voitures de Luxe",
  "Utilitaires",
];
const gammeOptions = ["Économique", "Moyenne gamme", "Haut de gamme"];
const energieOptions = ["Thermique (Essence/Diesel)", "Hybride", "Électrique"];
const usageOptions = [
  "Voiture avec Chauffeur",
  "Location longue durée ",
  "Voiture de Mariage & Événementiel",
  "Transport de Marchandises",
];

const current = ref<number>(1);

const budget = ref<[number, number]>([100000, 500000]);

const state = reactive({
  indeterminate: true,
  checkAll: false,
  checkedList: ["Citadines"],
});

const checked = ref<boolean>(false);
const checked1 = ref<boolean>(false);
const checked2 = ref<boolean>(false);
const checked3 = ref<boolean>(false);
const checked4 = ref<boolean>(false);

const place = ref<number>(2);

type RangeValue = [Dayjs, Dayjs];
const valueDate = ref<RangeValue>();

// const value1 = ref("Citadines");
// const value2 = ref("Économique");
// const value3 = ref("Thermique (Essence/Diesel)");

// const handleChange = (value: string) => {
//   console.log(`selected ${value}`);
// };

const open = ref<boolean>(false);

const showModal = () => {
  open.value = true;
};

// const handleOk = (e: MouseEvent) => {
//   console.log(e);
//   open.value = false;
// };

</script> -->

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import apiServices from '../services/apiService' // <-- ta fonction API
import type { Car } from '../types/car' // <-- si tu as un type pour Car
import { message } from 'ant-design-vue'

// États
const open = ref(false)
const loading = ref(false)
const cars = ref<any[]>([])
const vehiculeChoice = ref<any | null>(null)

interface FiltersState {
  valueDate: [string, string] | [],
  checkedTypes: any[],
  checkedGammes: any[],
  checkedEnergies: any[],
  checkedUsages: any[],
  budget: [number, number],
  place: number,
  checkedAutomatic: boolean,
  checkedAirConditioner: boolean,
  checkedGps: boolean,
  checkedBabySeat: boolean,
  checkedWifi: boolean,
}

// Filtres
const state = reactive<FiltersState>({
  valueDate: [],
  checkedTypes: [],
  checkedGammes: [],
  checkedEnergies: [],
  checkedUsages: [],
  budget: [5000, 150000],
  place: 5,
  checkedAutomatic: true,
  checkedAirConditioner: true,
  checkedGps: true,
  checkedBabySeat: true,
  checkedWifi: true,
})

// Options pour les filtres
const plainOptions = ['Citadine', 'SUV', 'Berline', '4x4']
const gammeOptions = ['Économique', 'Moyenne', 'Luxe']
const energieOptions = ['Essence', 'Diesel', 'Électrique', 'Hybride']
const usageOptions = ['Mariage', 'Voyage', 'Aventure', 'Transport de groupe']

// Charger les véhicules
const fetchCars = async () => {
  loading.value = true
  try {
    console.log('Fetching cars with filters:', state)
    // const params = {
    //   page: current.value,
    //   type: state.checkedTypes,
    //   gamme: state.checkedGammes,
    //   energie: state.checkedEnergies,
    //   usage: state.checkedUsages,
    //   budgetMin: budget.value[0],
    //   budgetMax: budget.value[1],
    //   boiteAuto: checkedOptions.boiteAuto,
    //   climatisation: checkedOptions.climatisation,
    //   gps: checkedOptions.gps,
    //   siegeBebe: checkedOptions.siegeBebe,
    //   wifi: checkedOptions.wifi,
    //   nbPlace: place.value,
    // }
    console.log(state)
    const filters = {
      type_vehicule: Array.from(state.checkedTypes),
      gamme: Array.from(state.checkedGammes),
      energie: Array.from(state.checkedEnergies),
      usage: Array.from(state.checkedUsages), // faudra mapper usage (expliqué juste après)
      prix_min: state.budget[0],
      prix_max: state.budget[1],
      places: state.place,
      boite_auto: state.checkedAutomatic,
      climatisation: state.checkedAirConditioner,
      gps: state.checkedGps,
      siege_bebe: state.checkedBabySeat,
      wifi: state.checkedWifi,
      // valueDate pas traité ici (à ajouter selon besoin)
    }
    console.log(filters)
    apiServices.getVehicles(filters).then((res: any) => {
      console.log(res)
      cars.value = res
    })
    // total.value = data.total
  } catch (error) {
    console.error(error)
    message.error('Erreur de chargement des véhicules.')
  } finally {
    loading.value = false
  }
}

// Actions
const showModal = (car: Car) => {
  vehiculeChoice.value = car
  open.value = true
}

const fetchCarsS = () => {
  apiServices.getVehicles({}).then((res: any) => {
    console.log(res)
    cars.value = res
  })
  // total.value = data.total
}
// Watchers pour appliquer les filtres
watch(
  state,
  () => {
    fetchCars()
  },
  { deep: true },
)

onMounted(() => {
  fetchCarsS()
})
</script>
