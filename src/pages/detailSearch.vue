<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-md-4">
        <img :src="`https://aaa.troispuissances.fr/${car?.image}`" class="img-fluid" alt="Image du véhicule" />


        <div class="p-4">
          <a-tag v-if="car?.statut === 'Disponible'" color="green">Disponible</a-tag>
          <a-tag v-if="car?.climatisation" color="blue">Climatisée</a-tag>
          <a-tag color="orange">Populaire</a-tag> <!-- à adapter si cette info vient de l'API -->


          <div class="d-flex justify-content-between align-items-end my-4">

            <div>
              <span class="text-decorate">{{ car?.marque }} | {{ car?.modele }}</span> <br>
              <h5>{{ car?.gamme }}, {{ car?.annee }}</h5>

              <!-- <a-rate v-model:value="value" allow-half /> -->
            </div>
            <div>
              <h5>{{ car?.prix_journalier.toLocaleString() }} XOF / Jour</h5>
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
                <small>Quand voulez-vous reserver?</small> <br> <a-range-picker v-model:value="dates"
                  :disabled-date="disabledDate" @change="updateTotal" />
              </div>

              <div class="w-100 py-4">
                <h6 class="mb-4">Options & Équipements</h6>
                <div class="d-flex justify-content-between align-items-center my-3">
                  <span>Boîte automatique</span>
                  <a-switch :checked="!!car?.boite_auto" disabled />
                </div>
                <div class="d-flex justify-content-between align-items-center my-3">
                  <span>Climatisation</span>
                  <a-switch :checked="!!car?.climatisation" disabled />
                </div>
                <div class="d-flex justify-content-between align-items-center my-3">
                  <span>GPS intégré</span>
                  <a-switch :checked="!!car?.gps" disabled />
                </div>
                <div class="d-flex justify-content-between align-items-center my-3">
                  <span>Siège bébé / Rehausseur</span>
                  <a-switch :checked="!!car?.siege_bebe" disabled />
                </div>
                <div class="d-flex justify-content-between align-items-center my-3">
                  <span>Wi-Fi à bord</span>
                  <a-switch :checked="!!car?.wifi" disabled />
                </div>
                <div class="d-flex justify-content-between align-items-center my-3">
                  <span>Chauffeur</span>
                  <a-switch :checked="!!car?.chauffeur" disabled />
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
                  <h6>{{ car?.prix_journalier.toLocaleString() }} XOF</h6>
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
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta ipsum reiciendis voluptas mollitia
                possimus cumque, nesciunt totam eius accusamus dolorum facilis sapiente, odio ipsa et, distinctio
                repellat aliquam earum? Consequatur?</p>
            </div>
            <div class="my-5 d-flex justify-content-end">
              <a @click="reserve()" class="btn btn-dark btn-lg mx-2">Reserver maintenant</a>
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
            <h2 class="text-white">Conduisons avec un contrat aujourd'hui.</h2>
            <p class="text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
              saepe blanditiis dolor animi vitae ullam? Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Quas, delectus.
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
import { onMounted, ref } from "vue";
import apiService from "../services/apiService";
import { useRoute, useRouter } from "vue-router";
import dayjs from "dayjs";
import { notification } from "ant-design-vue";

const car = ref<any>(null);

const prixJournalier = ref(0); // à remplacer dynamiquement avec data.prix_journalier

const dates = ref<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);
const total = ref<number>(0);


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
      const [start, end] = dates.value!;
      let body = { car_id: car.value.id, start_date: start.toDate().toISOString().split('T')[0], end_date: end.toDate().toISOString().split('T')[0] }
      console.log(body)
      apiService.reserve(body).then(res => {
        console.log(res)
        if (res.data) {
          notification.success({
            message: "Réservation effectuée",
            description: "Votre réservation a été enregistrée avec succès.",
          });
        }
      })
    } else {
      notification.warning({
        message: "Date de réservation vide",
        description: "Veuillez sélectionner une période de réservation avant de continuer.",
      });
    }
  } else {
    router.push('/auth/register');
  }
}

const disabledDate = (current: dayjs.Dayjs) => {
  return current && current < dayjs().startOf('day');
}


onMounted(() => {
  apiService.getCarById(id).then(res => {
    console.log(res.data)
    car.value = res.data;
    prixJournalier.value = car.value.prix_journalier
  })
})
</script>