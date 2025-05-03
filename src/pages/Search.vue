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
              <a-slider v-model:value="state.budget" :min="25000" :max="1000000" :step="1000" range />
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
          <div class="col-md-6 my-3" v-for="car in cars" :key="car.id">
            <a @click="showModal(car)" class="a">
              <a-badge-ribbon :text="car.tag" color="blue">
                <a-card>
                  <a-tag v-if="car.available" color="green">Disponible</a-tag>
                  <a-tag v-if="car.climatisation" color="blue">Climatisée</a-tag>
                  <div>
                    <img :src="`https://aaa.a07.agency/uploads/cars/${car.image}`" class="img-fluid img-voiture3"
                      alt="Image voiture" />
                  </div>
                  <div class="d-flex justify-content-between align-items-end">
                    <div>
                      <span class="text-decorate">{{ car.name }} | {{ car.model }}</span>
                      <br />
                      <h5>{{ car.year }}</h5>
                    </div>
                    <div>
                      <h5>{{ car.price }} XOF / Jour</h5>
                    </div>
                  </div>
                </a-card>
              </a-badge-ribbon>
            </a>
          </div>
        </div>

        <div class="d-flex justify-content-end">
          <a-pagination v-model:current="current" :total="500" />
        </div>
      </div>
    </div>
  </div>

  <a-modal v-model:open="open" title="Détail de la voiture" width="100%" wrap-class-name="full-modal">
    <template #footer></template>
    <div v-if="vehiculeChoice" class="container my-5">
      <div class="row">
        <div class="col-md-6">
          <img :src="`https://aaa.a07.agency/uploads/cars/${vehiculeChoice.image}`" class="img-fluid"
            alt="Image voiture" />
        </div>
        <div class="col-md-6">
          <div class="p-4">
            <a-tag v-if="vehiculeChoice.available" color="green">Disponible</a-tag>
            <a-tag v-if="vehiculeChoice.climatisation" color="blue">Climatisée</a-tag>

            <div class="d-flex justify-content-between align-items-end my-4">
              <div>
                <span class="text-decorate">{{ vehiculeChoice.name }}</span>
                <br />
                <h5>{{ vehiculeChoice.model }}, {{ vehiculeChoice.year }}</h5>
              </div>
              <div>
                <h5>{{ vehiculeChoice.price }} XOF / Jour</h5>
              </div>
            </div>

            <div class="my-4">
              <a-row>
                <a-col :span="8">
                  <a-statistic title="Kilométrage" :value="vehiculeChoice.kilometrage" />
                </a-col>
                <a-col :span="8">
                  <a-statistic title="Nombre de places" :value="vehiculeChoice.nbPlace" />
                </a-col>
                <a-col :span="8">
                  <a-statistic title="Boîte" :value="vehiculeChoice.transmission" />
                </a-col>
              </a-row>
            </div>

            <div class="my-4">
              <p>{{ vehiculeChoice.description }}</p>
            </div>

            <div class="my-5">
              <a :href="`/search/${vehiculeChoice.id}`" class="btn btn-dark mx-2">Réserver maintenant</a>
            </div>
          </div>
        </div>
      </div>
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
const current = ref(1)
const total = ref(0)
const loading = ref(false)
const cars = ref<any[]>([])
const vehiculeChoice = ref<any | null>(null)

interface FiltersState {
  valueDate: [string, string] | [],
  checkedTypes: string[],
  checkedGammes: string[],
  checkedEnergies: string[],
  checkedUsages: string[],
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
  budget: [25000, 1000000],
  place: 5,
  checkedAutomatic: false,
  checkedAirConditioner: false,
  checkedGps: false,
  checkedBabySeat: false,
  checkedWifi: false,
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
    const filters = {
      type_vehicule: state.checkedTypes,
      gamme: state.checkedGammes,
      energie: state.checkedEnergies,
      usage: state.checkedUsages, // faudra mapper usage (expliqué juste après)
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
    const { data } = await apiServices.getVehicles(filters)
    cars.value = data.cars
    total.value = data.total
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

// Watchers pour appliquer les filtres
watch(
  state,
  () => {
    fetchCars()
  },
  { deep: true },
)

onMounted(() => {
  fetchCars()
})
</script>
