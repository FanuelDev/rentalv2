<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-md-4">
        <img :src="`${baseUrlFront}/${car?.image ? JSON.parse(car?.image)[0] : ''}`" class="img-fluid w-100" alt="Image du véhicule" />

        <div class="row mt-4">
          <div class="col-md-3">
            <img :src="`${baseUrlFront}/${car?.image ? JSON.parse(car?.image)[0] : ''}`" class="img-fluid" alt="Image du véhicule" />
          </div>
          <div class="col-md-3">
            <img :src="`${baseUrlFront}/${car?.image ? JSON.parse(car?.image)[1] : ''}`" class="img-fluid" alt="Image du véhicule" />
          </div>
          <div class="col-md-3">
            <img :src="`${baseUrlFront}/${car?.image ? JSON.parse(car?.image)[2] : ''}`" class="img-fluid" alt="Image du véhicule" />
          </div>
          <div class="col-md-3">
            <img :src="`${baseUrlFront}/${car?.image ? JSON.parse(car?.image)[3] : ''}`" class="img-fluid" alt="Image du véhicule" />
          </div>
        </div>
        <div class="p-4 row">
          <a-tag class="col-md-2 my-1" v-if="car?.statut === 'Disponible'" color="green">Disponible</a-tag>
<!--          <a-tag v-if="car?.climatisation" color="blue">Climatisée</a-tag>-->
          <div v-for="option in optionsLabels"
               :key="option.key" class="col-md-4 my-1">
            <a-tag
                v-if="isOptionActive(option.key)"
                :color="option.color"
            >
              {{ option.label }}
            </a-tag>
          </div>

          <div class="d-flex justify-content-between align-items-end my-4">

            <div>
              <span class="text-decorate">{{ car?.marque }} | {{ car?.modele }}</span> <br>
              <h5>{{ car?.gamme }}, {{ car?.annee }}</h5>

              <!-- <a-rate v-model:value="value" allow-half /> -->
            </div>
            <div>
              <h5>{{ car?.prix_journalier?.toLocaleString() }} XOF / Jour</h5>
            </div>
          </div>
          <div class="my-4">
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="row">
          <div class="col-md-6">
            <div class="my-4">
              <h5>De quoi avez-vous besoin?</h5>
            </div>
            <div class="my-4">
              <div class="w-100 py-4">
                <small>Quand voulez-vous reserver?</small> <br>
                <a-range-picker v-model:value="dates" :disabled-date="disabledDate" @change="updateTotal" show-time/>
              </div>

              <div class="w-100 py-4">
                <h6 class="mb-4">Options & Équipements</h6>
                <div class="d-flex justify-content-between align-items-center my-3">
                  <span>Boîte automatique</span>
                  <a-switch v-model:checked="boiteAutoSwitch" />
                </div>

                <div class="d-flex justify-content-between align-items-center my-3">
                  <span>Climatisation</span>
                  <a-switch v-model:checked="climatisationSwitch" />
                </div>

                <div class="d-flex justify-content-between align-items-center my-3">
                  <span>GPS intégré</span>
                  <a-switch v-model:checked="gpsSwitch" />
                </div>

                <div class="d-flex justify-content-between align-items-center my-3">
                  <span>Siège bébé / Rehausseur</span>
                  <a-switch v-model:checked="siegeBebeSwitch" />
                </div>

                <div class="d-flex justify-content-between align-items-center my-3">
                  <span>Wi-Fi à bord</span>
                  <a-switch v-model:checked="wifiSwitch" />
                </div>

                <div class="d-flex justify-content-between align-items-center my-3">
                  <span>Chauffeur</span>
                  <a-switch v-model:checked="chauffeurSwitch" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="my-4">
              <div class="d-flex justify-content-between align-items-end my-4">
                <div>
                  <h6>Prix par jour</h6>
                  <!-- <a-rate v-model:value="value" allow-half /> -->
                </div>
                <div>
                  <h6>{{ car?.prix_journalier?.toLocaleString() }} XOF</h6>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-end my-4">
                <div>
                  <h6>Taxe</h6>
                  <!-- <a-rate v-model:value="value" allow-half /> -->
                </div>
                <div>
                  <h6>0%</h6>
                </div>
              </div>
              <hr>
              <div class="d-flex justify-content-between align-items-start my-3">
                <span>Total à payer</span>
                <h4>{{ total?.toLocaleString() }} XOF</h4>
              </div>

            </div>
            <div class="my-4">
              <hr>
            </div>
            <div class="my-4">
              <h5 class="text-primary">Condition de reservation</h5>
            </div>
            <div class="my-4">

              <p>
                Afin de garantir une expérience fluide et sécurisée pour tous nos clients, nous vous prions de prendre
                connaissance des conditions suivantes avant de finaliser votre réservation : <br>
              </p>
              <p class="text-right">
                <a href="/privacy">lire plus</a>
              </p>
            </div>
            <div class="my-5 d-flex justify-content-end">
              <button @click="reserve()" class="btn btn-dark btn-lg mx-2" :disabled="isLoading">
                <a-spin :indicator="indicator" :spinning="isLoading" />
                Reserver maintenant</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="top">
      <div class="container bg-banner2">
        <div class="row align-items-center">
          <div class="col-md-5"></div>
          <div class="col-md-6 text-center my-4">
            <h2 class="text-white">Louez une voiture en toute simplicité !.</h2>
            <p class="text-white">
              Profitez d’un large choix de véhicules adaptés à tous vos besoins. Que ce soit pour un week-end, un
              déplacement professionnel ou des vacances, réservez rapidement et partez l’esprit tranquille. Confort,
              sécurité et flexibilité sont au rendez-vous !
            </p>
            <div class="my-4">
              <button class="btn btn-primary px-4">
                Télécharger l'application mobile
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import {computed, h, onMounted, ref} from "vue";
import apiService from "../services/apiService";
import { useRoute, useRouter } from "vue-router";
import dayjs from "dayjs";
import { notification } from "ant-design-vue";
import { LoadingOutlined } from '@ant-design/icons-vue';

const car = ref<any>({
  boite_auto: true,
  climatisation: false,
  gps: true,
  siege_bebe: false,
  wifi: true,
  chauffeur: false
});
const baseUrlFront = ref(import.meta.env.VITE_FRONT_URL)

const prixJournalier = ref(0); // à remplacer dynamiquement avec data.prix_journalier

const dates = ref<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);
const total = ref<number>(0);

const isOptionActive = (key: keyof typeof car.value) => {
  return car.value ? car.value[key] : false
}

const optionsLabels = [
  { key: 'boite_auto', label: 'Boîte automatique', color: 'orange' },
  { key: 'climatisation', label: 'Climatisée', color: 'orange' },
  { key: 'gps', label: 'GPS intégré', color: 'orange' },
  { key: 'siege_bebe', label: 'Siège bébé / Rehausseur', color: 'orange' },
  { key: 'wifi', label: 'Wi-Fi à bord', color: 'orange' },
  { key: 'chauffeur', label: 'Chauffeur', color: 'orange' }
]

const isLoading = ref(false)

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '24px',
  },
  spin: true,
});

const route = useRoute()
const router = useRouter()
const id = route.params.id

const updateTotal = () => {
  if (dates.value && car.value) {
    const [start, end] = dates.value;
    const days = end.diff(start, 'day') + 1; // +1 pour inclure le jour de départ
    total.value = days * car.value.prix_journalier;
  } else {
    total.value = 0;
  }
}

const reserve = () => {
  console.log('commande')
  let log = JSON.parse(localStorage.getItem('dataLog')!)

  if (log) {
    if (total.value) {

      isLoading.value = true;
      const [start, end] = dates.value!;
      let body = { car_id: car.value.id, start_date: start.toDate().toISOString(), end_date: end.toDate().toISOString() }
      console.log(body)
      apiService.reserve(body).then(res => {
        console.log(res)
        notification.success({
          message: "Réservation effectuée",
          description: "Votre réservation a été enregistrée avec succès.",
        });

        router.push('/reserve');
      })
        .catch(err => {
          console.error(err);
          notification.error({
            message: "Échec de la réservation",
            description: err?.response?.data?.message || "Une erreur est survenue lors de la réservation.",
          });
        })
        .finally(() => {
          isLoading.value = false;
        });

    } else {
      notification.warning({
        message: "Date de réservation vide",
        description: "Veuillez sélectionner une période de réservation avant de continuer.",
      });

    }
  } else {
    router.push('/auth/login');
  }
}

const disabledDate = (current: dayjs.Dayjs) => {
  return current && current < dayjs().startOf('day');
}

// Fonction pour créer un computed modifiable pour n'importe quelle propriété
const createSwitch = (prop: keyof typeof car.value) => {
  return computed({
    get: () => car.value?.[prop] ?? false,
    set: (val: boolean) => {
      if (car.value) car.value[prop] = val
    }
  })
}

// Computeds pour chaque option
const boiteAutoSwitch = createSwitch('boite_auto')
const climatisationSwitch = createSwitch('climatisation')
const gpsSwitch = createSwitch('gps')
const siegeBebeSwitch = createSwitch('siege_bebe')
const wifiSwitch = createSwitch('wifi')
const chauffeurSwitch = createSwitch('chauffeur')

onMounted(() => {

  const dateFilter = JSON.parse(localStorage.getItem('dateFilter')!) ?? []

  dates.value = [
    dayjs(dateFilter[0]),
    dayjs(dateFilter[1])
  ]

  localStorage.setItem('isReserve', id.toString())

  apiService.getCarById(id).then(res => {
    console.log(res.data)
    car.value = res.data;
    prixJournalier.value = car.value.prix_journalier

    updateTotal()
  })

})
</script>