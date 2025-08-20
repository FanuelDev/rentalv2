<template>
  <section class="container">
    <!-- <div class="row">
      <div class="col-md-4 offset-md-4 my-5" id="voiture">
        <h1 class="text-center" data-aos="fade-up">
          Rechercher ici quelques voitures à réserver
        </h1>
      </div>
    </div> -->
    <div class="my-4 row">
      <div class="col-md-8 offset-md-2">
        <div class="row mb-4" data-aos="fade-up" id="voiture">
          <div class="col-md-6 my-2">
            <small>Periode de reservation</small>
            <a-range-picker v-model:value="disponibility" style="width: 100%" @change="fetchVehicles()" />
          </div>
          <div class="col-md-6 my-2">
            <small>Type de véhicule</small>
            <a-select v-model:value="vehicleType" style="width: 100%" @change="fetchVehicles()">
              <a-select-option value="Citadine">Citadines</a-select-option>
              <a-select-option value="Berline">Berlines</a-select-option>
              <a-select-option value="SUV">SUV</a-select-option>
              <a-select-option value="4x4">4x4</a-select-option>
              <a-select-option value="Van">Vans</a-select-option>
              <a-select-option value="Minibus">Minibus</a-select-option>
              <a-select-option value="Luxe">Voitures de Luxe</a-select-option>
              <a-select-option value="Utilitaire">Utilitaires</a-select-option>
            </a-select>
          </div>
          <!-- <div class="col-md-3 my-2">
            <small>Budget & Gamme</small>
            <a-select v-model:value="budgetRange" style="width: 100%" @change="fetchVehicles()">
              <a-select-option value="Économique">Économique</a-select-option>
              <a-select-option value="Moyenne gamme">Moyenne gamme</a-select-option>
              <a-select-option value="Haut de gamme">Haut de gamme</a-select-option>
            </a-select>
          </div>
          <div class="col-md-3 my-2">
            <small>Type d’Énergie</small>
            <a-select v-model:value="energyType" style="width: 100%" @change="fetchVehicles()">
              <a-select-option value="Thermique (Essence/Diesel)">Thermique (Essence/Diesel)</a-select-option>
              <a-select-option value="Hybride">Hybride</a-select-option>
              <a-select-option value="Électrique">Électrique</a-select-option>
            </a-select>
          </div> -->
        </div>
      </div>
    </div>
    <!-- Vos véhicules filtrés s'affichent ici -->
    <div class="my-4 row">
      <div v-if="isLoading" class="loading">Chargement...</div>

      <div v-for="vehicle in vehicles" :key="vehicle.id" class="col-md-3 my-3" data-aos="fade-up"
        data-aos-duration="1000">
        <a @click="showModal(vehicle)" class="a">
          <a-badge-ribbon :text="vehicle.gamme" :color="vehicle.gamme === 'Economique' ? 'green' : 'blue'">
            <a-card>
              <a-tag :color="vehicle.statut === 'Disponible' ? 'green' : 'red'">{{ vehicle.statut }}</a-tag>
              <a-tag color="blue">{{ vehicle.climatisation ? 'Climatisée' : 'Non climatisée' }}</a-tag>
              <div>
                <img :src="`https://aaa-backend-3hqc.onrender.com/${JSON.parse(vehicle.image)[0]}`" class="img-fluid img-voiture3" alt="" />
              </div>
              <div class="d-flex justify-content-between align-items-end">
                <div>
                  <span class="text-decorate">{{ vehicle.marque }} | {{ vehicle.modele }}</span>
                  <br />
                  <h6>{{ vehicle.annee }}</h6>
                </div>
                <div>
                  <h6>{{ vehicle.prix_journalier }} XOF / Jour</h6>
                </div>
              </div>
            </a-card>
          </a-badge-ribbon>
        </a>
      </div>
    </div>
  </section>
  <a-modal v-model:open="open" title="Détail de la voiture" width="100%" wrap-class-name="full-modal">
    <template #footer>
      <!-- Footer vide ou personnalisé -->
    </template>

    <div class="container my-5">
      <div class="row">
        <div class="col-md-6">
          <img :src="`https://aaa-backend-3hqc.onrender.com/${JSON.parse(vehiculeChoise.image)[0]}`" class="img-fluid w-100" alt="Image voiture" />
          <div class="row mt-4">
          <div class="col-md-3">
            <img :src="`https://aaa-backend-3hqc.onrender.com/${vehiculeChoise.image ? JSON.parse(vehiculeChoise.image)[0] : ''}`" class="img-fluid" alt="Image du véhicule" />
          </div>
          <div class="col-md-3">
            <img :src="`https://aaa-backend-3hqc.onrender.com/${vehiculeChoise.image ? JSON.parse(vehiculeChoise.image)[1] : ''}`" class="img-fluid" alt="Image du véhicule" />
          </div>
          <div class="col-md-3">
            <img :src="`https://aaa-backend-3hqc.onrender.com/${vehiculeChoise.image ? JSON.parse(vehiculeChoise.image)[2] : ''}`" class="img-fluid" alt="Image du véhicule" />
          </div>
          <div class="col-md-3">
            <img :src="`https://aaa-backend-3hqc.onrender.com/${vehiculeChoise.image ? JSON.parse(vehiculeChoise.image)[3] : ''}`" class="img-fluid" alt="Image du véhicule" />
          </div>
        </div>
        </div>
        <div class="col-md-6">
          <div class="p-4">
            <!-- Badges de statut -->
            <a-tag :color="vehiculeChoise.statut === 'Disponible' ? 'green' : 'red'">
              {{ vehiculeChoise.statut }}
            </a-tag>
            <a-tag v-if="vehiculeChoise.climatisation" color="blue">Climatisée</a-tag>
            <a-tag v-if="vehiculeChoise.gps" color="purple">GPS</a-tag>
            <a-tag v-if="vehiculeChoise.wifi" color="geekblue">WiFi</a-tag>
            <a-tag v-if="vehiculeChoise.boite_auto" color="cyan">Boîte auto</a-tag>

            <div class="d-flex justify-content-between align-items-end my-4">
              <div>
                <span class="text-decorate">{{ vehiculeChoise.marque }}</span>
                <br />
                <h5>{{ vehiculeChoise.modele }}, {{ vehiculeChoise.annee }}</h5>
              </div>
              <div>
                <h5>{{ vehiculeChoise.prix_journalier.toLocaleString() }} XOF / Jour</h5>
              </div>
            </div>

            <div class="my-4">
              <a-row gutter="16">
                <a-col :span="8">
                  <a-statistic title="Places" :value="vehiculeChoise.places" />
                </a-col>
                <a-col :span="8">
                  <a-statistic title="Type" :value="vehiculeChoise.type_vehicule" />
                </a-col>
                <a-col :span="8">
                  <a-statistic title="Energie" :value="vehiculeChoise.energie" />
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
                Notre {{ vehiculeChoise.marque }} {{ vehiculeChoise.modele }} offre un excellent confort avec son moteur
                {{
                  vehiculeChoise.energie }} et sa capacité de {{ vehiculeChoise.places }} places.
              </p>
            </div>

            <div class="my-5">
              <a :href="'/search/' + vehiculeChoise.id" class="btn btn-dark mx-2">Réserver maintenant</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center">
      <small>&copy; Copyright aaa-rental - 2025</small>
    </div>
  </a-modal>


  <section class="top bg-banner3" id="usage">
    <div class="darker3">

      <div class="container">
        <div class="row">
          <div class="col-md-4 offset-md-4">
            <h1 class="text-center text-white" data-aos="fade-up" data-aos-duration="1000">
              consultez <br />
              notre marché
            </h1>
            <p class="text-center text-white" data-aos="fade-up" data-aos-duration="1000">Lorem ipsum dolor sit amet.
            </p>
          </div>
        </div>
        <div class="row my-3">
          <div class="col-md-4 p-lg-5 mb-3" data-aos="fade-up" data-aos-duration="1000">
            <div class="card p-lg-5 p-2 border-0 bg-blue-tr text-center">
              <div class="my-4 d-flex justify-content-center">
                <div class="rond">
                  <h5><i class="fas fa-certificate"></i></h5>
                </div>
              </div>
              <h6>Créez votre compte</h6>
              <p>
                Inscrivez-vous en quelques clics avec votre numéro de téléphone et votre adresse e-mail. Une fois
                connecté, vous accédez à toutes nos offres.
              </p>
            </div>
          </div>
          <div class="col-md-4 p-lg-5 mb-3" data-aos="fade-up" data-aos-duration="1500">
            <div class="card p-lg-5 p-2 border-0 bg-light-tr text-center">
              <div class="my-4 d-flex justify-content-center">
                <div class="rond">
                  <h5><i class="far fa-chart-bar"></i></h5>
                </div>
              </div>
              <h6>Recherchez votre voiture</h6>
              <p>
                Indiquez le type de véhicule , les dates de location et filtrez selon vos besoins. Vous verrez
                instantanément les véhicules disponibles
              </p>
            </div>
          </div>
          <div class="col-md-4 p-lg-5 mb-3" data-aos="fade-up" data-aos-duration="2000">
            <div class="card p-lg-5 p-2 border-0 bg-orange-tr text-center">
              <div class="my-4 d-flex justify-content-center">
                <div class="rond">
                  <h5><i class="fab fa-opencart"></i></h5>
                </div>
              </div>
              <h6>Réservez en ligne</h6>
              <p>
                Choisissez le véhicule qui vous convient, ajoutez les options souhaitées, puis validez la réservation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="bg-white py-5">
    <div class="container">
      <div class="row align-items-end">
        <div class="col-md-6 p-5">
          <h1 class="text-left" data-aos="fade-up" data-aos-duration="1000">
            Vos véhicules prêts pour <br> la réservation

          </h1>
        </div>
        <div class="col-md-6 p-5" data-aos="fade-up" data-aos-duration="1000">
          <p>
            Du citadin économique au SUV tout confort, découvrez le véhicule qui s’adapte à chacun de vos besoins
          </p>
        </div>
      </div>
      <div class="row my-4">
        <div class="col-md-12 d-lg-flex justify-content-center" data-aos="fade-up" data-aos-duration="1000">
          <button class="btn btn-outline-primary m-2">Citadines</button>
          <button class="btn btn-outline-primary m-2">Berlines</button>
          <button class="btn btn-outline-primary m-2">SUV & 4x4</button>
          <button class="btn btn-outline-primary m-2">Vans & Minibus</button>
          <button class="btn btn-outline-primary active m-2">
            Voitures de Luxe
          </button>
          <button class="btn btn-outline-primary m-2">Utilitaires</button>
        </div>
      </div>
      <div class="row my-5">
        <div class="col-md-4 my-2" data-aos="fade-up" data-aos-duration="1000">
          <img src="/src/assets/img/ban1.jpg" class="img-fluid img-voiture" alt="" />
        </div>
        <div class="col-md-4 my-2" data-aos="fade-up" data-aos-duration="1000">
          <img src="/src/assets/img/ban2.jpg" class="img-fluid img-voiture" alt="" />
        </div>
        <div class="col-md-4 my-2" data-aos="fade-up" data-aos-duration="1000">
          <img src="/src/assets/img/ban3.jpg" class="img-fluid img-voiture" alt="" />
        </div>
        <div class="col-md-3 my-2" data-aos="fade-up" data-aos-duration="1000">
          <img src="/src/assets/img/ban4.jpg" class="img-fluid img-voiture1" alt="" />
        </div>
        <div class="col-md-3 my-2" data-aos="fade-up" data-aos-duration="1000">
          <img src="/src/assets/img/ban5.jpg" class="img-fluid img-voiture1" alt="" />
        </div>
        <div class="col-md-3 my-2" data-aos="fade-up" data-aos-duration="1000">
          <img src="/src/assets/img/ban6.jpg" class="img-fluid img-voiture1" alt="" />
        </div>
        <div class="col-md-3 my-2" data-aos="fade-up" data-aos-duration="1000">
          <img src="/src/assets/img/ban7.jpg" class="img-fluid img-voiture1" alt="" />
        </div>
      </div>
      <div class="text-center">
        <button class="btn btn-outline-primary mx-2">
          Voir plus <i class="fa fa-arrow-right"></i>
        </button>
      </div>
    </div>
  </section>

  <!-- <section class="container top" id="partner">
    <div class="row">
      <div class="col-md-4 offset-md-4">
        <h1 class="text-center" data-aos="fade-up" data-aos-duration="1000">Partenaires</h1>
        <p class="text-center" data-aos="fade-up" data-aos-duration="1000">
          Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet <br />
          consectetur adipisicing.
        </p>
      </div>
    </div>

    <div class="row my-5">
      <div class="col-md-3" data-aos="fade-up" data-aos-duration="1000">
        <img src="/src/assets/img/5.jpg" class="img-fluid img-article" alt="" />
        <div class="m-3">
          <p>lorem</p>
          <h5 class="mb-3">Lorem ipsum dolor sit amet consectetur adip.</h5>
          <small>Mars 12, 2025</small>
        </div>
      </div>
      <div class="col-md-3" data-aos="fade-up" data-aos-duration="1000">
        <img src="/src/assets/img/6.jpg" class="img-fluid img-article" alt="" />
        <div class="m-3">
          <p>lorem</p>
          <h5 class="mb-3">Lorem ipsum dolor sit amet consectetur adip.</h5>
          <small>Mars 12, 2025</small>
        </div>
      </div>
      <div class="col-md-3" data-aos="fade-up" data-aos-duration="1000">
        <img src="/src/assets/img/2.jpg" class="img-fluid img-article" alt="" />
        <div class="m-3">
          <p>lorem</p>
          <h5 class="mb-3">Lorem ipsum dolor sit amet consectetur adip.</h5>
          <small>Mars 12, 2025</small>
        </div>
      </div>
      <div class="col-md-3" data-aos="fade-up" data-aos-duration="1000">
        <img src="/src/assets/img/4.jpg" class="img-fluid img-article" alt="" />
        <div class="m-3">
          <p>lorem</p>
          <h5 class="mb-3">Lorem ipsum dolor sit amet consectetur adip.</h5>
          <small>Mars 12, 2025</small>
        </div>
      </div>

      <div class="text-center my-5" data-aos="fade-up" data-aos-duration="1000">
        <button class="btn btn-outline-primary mx-2">
          Voir plus <i class="fa fa-arrow-right"></i>
        </button>
      </div>
    </div>
  </section> -->

  <section class="top"></section>

  <section class="top">
    <div class="container bg-banner2" data-aos="fade-up" data-aos-duration="1000">
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
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import apiServices from '../services/apiService'; // Adjust the import path if necessary

// const apiUrl = import.meta.env.VITE_FRONT_URL

import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
type RangeValue = [Dayjs, Dayjs];

const disponibility = ref<RangeValue>();

const vehicles = ref<any[]>([]);
const vehiculeChoise = ref<any>()
const isLoading = ref(true);
const open = ref(false)

const vehicleType = ref();
const budgetRange = ref();
const energyType = ref();

const fetchVehicles = async () => {
  try {
    if (disponibility.value) {
      const date_debut = disponibility.value![0]
        ? dayjs(disponibility.value![0]).format('YYYY-MM-DD HH:mm:ss')
        : null

      const date_fin = disponibility.value![1]
        ? dayjs(disponibility.value![1]).format('YYYY-MM-DD HH:mm:ss')
        : null

      let dateFilter = [date_debut, date_fin];
      localStorage.setItem('dateFilter', JSON.stringify(dateFilter))
      const filters = {
        date_debut: date_debut,
        date_fin: date_fin,
        type_vehicule: [vehicleType.value], // Example filter, you can update as needed
        gamme: [budgetRange.value],
        energie: [energyType.value]
      };
      console.log(filters)
      const data = await apiServices.getVehicles(filters);
      vehicles.value = data;
      console.log(vehicles.value)

    } else {
      const filters = {
        type_vehicule: [vehicleType.value], // Example filter, you can update as needed
        gamme: [budgetRange.value],
        energie: [energyType.value]
      };
      console.log(filters)
      const data = await apiServices.getVehicles(filters);
      vehicles.value = data;
      console.log(vehicles.value)
    }
  } catch (error) {
    console.error('Error loading vehicles:', error);
  } finally {
    isLoading.value = false;
  }
};

const showModal = (data: any) => {
  console.log(data)
  vehiculeChoise.value = data;
  open.value = true;
}

onMounted(() => {
  fetchVehicles();
});
</script>


<!-- <script lang="ts" setup>
import { ref } from "vue";
const value1 = ref("Citadines");
const value2 = ref("Économique");
const value3 = ref("Thermique (Essence/Diesel)");

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const open = ref<boolean>(false);

const showModal = () => {
  open.value = true;
};

// const handleOk = (e: MouseEvent) => {
//   console.log(e);
//   open.value = false;
// };
</script> -->
