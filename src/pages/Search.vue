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
            <div class="w-100 py-4">
              <a-range-picker
                v-model:value="valueDate"
                show-time
                size="large"
              />
            </div>
            <div class="w-100 py-4">
              <h6 class="mb-4">Type de vehicule</h6>
              <a-checkbox-group
                v-model:value="state.checkedList"
                :options="plainOptions"
              />
            </div>

            <div class="w-100 py-4">
              <h6 class="mb-4">Gamme</h6>
              <a-checkbox-group
                v-model:value="state.checkedList"
                :options="gammeOptions"
              />
            </div>

            <div class="w-100 py-4">
              <h6 class="mb-4">Budget (XOF)</h6>
              <a-slider
                v-model:value="budget"
                :min="25000"
                :max="1000000"
                :step="1000"
                range
              />
            </div>

            <div class="w-100 py-4">
              <h6 class="mb-4">Type d’énergie</h6>
              <a-checkbox-group
                v-model:value="state.checkedList"
                :options="energieOptions"
              />
            </div>
            <div class="w-100 py-4">
              <h6 class="mb-4">Usage Spécifique</h6>
              <a-checkbox-group
                v-model:value="state.checkedList"
                :options="usageOptions"
              />
            </div>

            <div class="w-100 py-4">
              <h6 class="mb-4">Options & Équipements</h6>
              <div
                class="d-flex justify-content-between align-items-center my-3"
              >
                <span>Boîte automatique</span>
                <a-switch v-model:checked="checked" />
              </div>
              <div
                class="d-flex justify-content-between align-items-center my-3"
              >
                <span>Climatisation</span>
                <a-switch v-model:checked="checked1" />
              </div>
              <div
                class="d-flex justify-content-between align-items-center my-3"
              >
                <span>Nombre de places</span>
                <a-input-number
                  id="inputNumber"
                  v-model:value="place"
                  :min="2"
                  :max="45"
                />
              </div>
              <div
                class="d-flex justify-content-between align-items-center my-3"
              >
                <span>GPS intégré</span>
                <a-switch v-model:checked="checked2" />
              </div>
              <div
                class="d-flex justify-content-between align-items-center my-3"
              >
                <span>Siège bébé / Rehausseur</span>
                <a-switch v-model:checked="checked3" />
              </div>
              <div
                class="d-flex justify-content-between align-items-center my-3"
              >
                <span>Wi-Fi à bord</span>
                <a-switch v-model:checked="checked4" />
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
          <div class="col-md-6 my-3">
            <a @click="showModal" class="a">
              <a-badge-ribbon text="Nouveauté" color="green">
                <a-card>
                  <a-tag color="green">Disponible</a-tag>
                  <a-tag color="blue">Climatisée</a-tag>
                  <div>
                    <img
                      src="/src/assets/img/v1.png"
                      class="img-fluid img-voiture3"
                      alt=""
                    />
                  </div>
                  <div class="d-flex justify-content-between align-items-end">
                    <div>
                      <span class="text-decorate">Akfa Romeo | Guilla</span>
                      <br />
                      <h5>Veloce, 2024</h5>
                    </div>
                    <div>
                      <h5>150.000 XOF / Jour</h5>
                    </div>
                  </div>
                </a-card>
              </a-badge-ribbon>
            </a>
          </div>
          <div class="col-md-6 my-3">
            <a @click="showModal" class="a">
              <a-badge-ribbon text="Populaire" color="blue">
                <a-card>
                  <a-tag color="green">Disponible</a-tag>
                  <a-tag color="blue">Climatisée</a-tag>
                  <div>
                    <img
                      src="/src/assets/img/v2.png"
                      class="img-fluid img-voiture3"
                      alt=""
                    />
                  </div>
                  <div class="d-flex justify-content-between align-items-end">
                    <div>
                      <span class="text-decorate">Akfa Romeo | Guilla</span>
                      <br />
                      <h5>Veloce, 2024</h5>
                    </div>
                    <div>
                      <h5>300.000 XOF / Jour</h5>
                    </div>
                  </div>
                </a-card>
              </a-badge-ribbon>
            </a>
          </div>
          <div class="col-md-6 my-3">
            <a @click="showModal" class="a">
              <a-badge-ribbon text="Populaire" color="blue">
                <a-card>
                  <a-tag color="green">Disponible</a-tag>
                  <a-tag color="blue">Climatisée</a-tag>
                  <div>
                    <img
                      src="/src/assets/img/v3.png"
                      class="img-fluid img-voiture3"
                      alt=""
                    />
                  </div>
                  <div class="d-flex justify-content-between align-items-end">
                    <div>
                      <span class="text-decorate">Akfa Romeo | Guilla</span>
                      <br />
                      <h5>Veloce, 2024</h5>
                    </div>
                    <div>
                      <h5>150.000 XOF / Jour</h5>
                    </div>
                  </div>
                </a-card>
              </a-badge-ribbon>
            </a>
          </div>
          <div class="col-md-6 my-3">
            <a @click="showModal" class="a">
              <a-badge-ribbon text="Voiture d'exeption" color="orange">
                <a-card>
                  <a-tag color="green">Disponible</a-tag>
                  <a-tag color="blue">Climatisée</a-tag>
                  <div>
                    <img
                      src="/src/assets/img/v4.png"
                      class="img-fluid img-voiture3"
                      alt=""
                    />
                  </div>
                  <div class="d-flex justify-content-between align-items-end">
                    <div>
                      <span class="text-decorate">Akfa Romeo | Guilla</span>
                      <br />
                      <h5>Veloce, 2024</h5>
                    </div>
                    <div>
                      <h5>150.000 XOF / Jour</h5>
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

  
  <a-modal v-model:open="open" title="Detail de la voiture" width="100%" wrap-class-name="full-modal">
      <template #footer>
        <!-- <a-button key="back" @click="handleCancel">Return</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">Submit</a-button> -->
      </template>
      <div class="container my-5">
        <div class="row">
          <div class="col-md-6">
            <img src="/src/assets/img/v1.png" class="img-fluid" alt="" />
          </div>
          <div class="col-md-6">
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
                <a-row>
                  <a-col :span="8">
                    <a-statistic title="Active Users" :value="112893" style="margin-right: 50px" />
                  </a-col>
                  <a-col :span="8">
                    <a-statistic title="Account Balance (CNY)" :precision="2" :value="112893" />
                  </a-col>
                  <a-col :span="8">
                    <a-statistic title="Active Users" :value="112893" style="margin-right: 50px" />
                  </a-col>
                </a-row>
              </div>
              <div class="my-4">
                <div class="row">
                  <div class="col-md-4">
                    <small>Perfomence</small>
                    <a-progress :percent="60" size="small" />
                  </div>
                  <div class="col-md-4">
                    <small>Perfomence vitesse</small>
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Exercitationem corporis quasi quisquam consequatur! Doloremque ex
                  velit dignissimos aliquid ratione sit temporibus, sed rerum
                  impedit autem est possimus ad eos ipsam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Exercitationem corporis quasi quisquam consequatur! Doloremque ex
                  velit dignissimos aliquid ratione sit temporibus, sed rerum
                  impedit autem est possimus ad eos ipsam.
                </p>
              </div>
              <div class="my-5">
                <a href="/search/1" class="btn btn-dark mx-2">Reserver maintenant</a>
                <!-- <a href="/auth/register">
              <button class="btn btn-outline-primary mx-2">
                Créer un compte
              </button>
            </a> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center">
        <small>&copy; Copyright by aaa-rental - 2025</small>
      </div>
    </a-modal>
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

</script>