<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-md-4">
        <img src="/src/assets/img/v2.png" class="img-fluid" alt="" />

        <div class="p-4">
          <a-tag color="green">Disponible</a-tag>
          <a-tag color="blue">Climatisée</a-tag>
          <a-tag color="orange">Populaire</a-tag>

          <div class="d-flex justify-content-between align-items-end my-4">
            <div>
              <span class="text-decorate">Akfa Romeo | Guilla</span>
              <br />
              <h5>Veloce, 2024</h5>
              <!-- <a-rate v-model:value="value" allow-half /> -->
            </div>
            <div>
              <h5>300.000 XOF / Jour</h5>
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
                <small>Quand voulez-vous reserver?</small>
                <a-range-picker v-model:value="valueDate" show-time size="large" />
              </div>

              <div class="w-100 py-4">
                <h6 class="mb-4">Options & Équipements</h6>
                <div class="d-flex justify-content-between align-items-center my-3">
                  <span>Boîte automatique</span>
                  <a-switch v-model:checked="checked" />
                </div>
                <div class="d-flex justify-content-between align-items-center my-3">
                  <span>Climatisation</span>
                  <a-switch v-model:checked="checked1" />
                </div>
                <!-- <div
                class="d-flex justify-content-between align-items-center my-3"
              >
                <span>Nombre de places</span>
                <a-input-number
                  id="inputNumber"
                  v-model:value="place"
                  :min="2"
                  :max="45"
                />
              </div> -->
                <div class="d-flex justify-content-between align-items-center my-3">
                  <span>GPS intégré</span>
                  <a-switch v-model:checked="checked2" />
                </div>
                <div class="d-flex justify-content-between align-items-center my-3">
                  <span>Siège bébé / Rehausseur</span>
                  <a-switch v-model:checked="checked3" />
                </div>
                <div class="d-flex justify-content-between align-items-center my-3">
                  <span>Wi-Fi à bord</span>
                  <a-switch v-model:checked="checked4" />
                </div>
                <div class="d-flex justify-content-between align-items-center my-3">
                  <span>Chauffeur</span>
                  <a-switch v-model:checked="checked5" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="my-4">
              <div class="d-flex justify-content-between align-items-end my-4">
                <div>
                  <h6>Prix de la reservation</h6>
                  <!-- <a-rate v-model:value="value" allow-half /> -->
                </div>
                <div>
                  <h6>300.000 XOF</h6>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-end my-4">
                <div>
                  <h6>Options supplementaires</h6>
                  <!-- <a-rate v-model:value="value" allow-half /> -->
                </div>
                <div>
                  <h6>50.000 XOF</h6>
                </div>
              </div>
              <hr>
              <div class="d-flex justify-content-between align-items-end my-4 text-primar">
                <div>
                  <h6>Prix total</h6>
                  <!-- <a-rate v-model:value="value" allow-half /> -->
                </div>
                <div>
                  <h6>350.000 XOF</h6>
                </div>
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
              <a href="/auth/register" class="btn btn-dark btn-lg mx-2">Reserver maintenant</a>
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
const checked5 = ref<boolean>(false);

const place = ref<number>(2);

type RangeValue = [Dayjs, Dayjs];
const valueDate = ref<RangeValue>();
</script>