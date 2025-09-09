<template>
  <div class="p-4">
    <h5 class="fw-bold mb-4 pb-2">Liste des véhicules enregistrés</h5>
    <div class="row g-4">
      <div class="d-flex justify-content-end">
        <a-button type="primary" @click="openDrawer">Ajouter une voiture</a-button>
      </div>

      <div class="col-md-4" v-for="vehicle in vehicles" :key="vehicle.id">
        <a-badge-ribbon :text="vehicle.gamme"
          :color="vehicle.gamme === 'Economique' ? 'green' : vehicle.gamme === 'Moyenne gamme' ? 'blue' : 'gold'">
          <a-card class="shadow rounded" style="padding-bottom: 5px">
            <div class="mb-2">
              <a-tag :color="vehicle.statut === 'Disponible' ? 'green' : 'red'">{{ vehicle.statut }}</a-tag>
              <a-tag color="blue">{{ vehicle.climatisation ? 'Climatisée' : 'Non climatisée' }}</a-tag>
            </div>
            <div>
              <img :src="`https://aaa-backend-3hqc.onrender.com/${JSON.parse(vehicle.image)[0]}`"
                class="img-fluid img-voiture3 rounded mb-3" alt="Image véhicule" />
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
            <div class="d-flex justify-content-between align-items-center mt-4">
              <a-button type="primary" @click="openDrawerUpdate(vehicle)">Mettre à jour</a-button>
              <a-popconfirm title="Êtes-vous sûr de supprimer?" ok-text="Oui" cancel-text="Non" @confirm="confirmDelete(vehicle.id)"
                @cancel="cancel"><a-button type="primary" danger>Supprimer</a-button></a-popconfirm>
            </div>
          </a-card>
        </a-badge-ribbon>
      </div>
    </div>
  </div>

  <!-- Drawer Form -->
  <a-drawer :visible="visible" title="Enregistrer un véhicule" placement="right" width="520" @close="closeDrawer">
    <div class="row" v-if="isUpdate">
      <div class="col-md-3">
        <img :src="`https://aaa-backend-3hqc.onrender.com/${JSON.parse(vehicle.image)[0]}`"
             class="img-fluid img-voiture3 rounded mb-3" alt="Image véhicule" />
      </div>
      <div class="col-md-3">
        <img :src="`https://aaa-backend-3hqc.onrender.com/${JSON.parse(vehicle.image)[1]}`"
             class="img-fluid img-voiture3 rounded mb-3" alt="Image véhicule" />
      </div>
      <div class="col-md-3">
        <img :src="`https://aaa-backend-3hqc.onrender.com/${JSON.parse(vehicle.image)[2]}`"
             class="img-fluid img-voiture3 rounded mb-3" alt="Image véhicule" />
      </div>
      <div class="col-md-3">
        <img :src="`https://aaa-backend-3hqc.onrender.com/${JSON.parse(vehicle.image)[3]}`"
             class="img-fluid img-voiture3 rounded mb-3" alt="Image véhicule" />
      </div>
    </div>
    <a-form :model="form" ref="carForm" layout="vertical">
      <a-form-item label="Marque" required>
        <a-input v-model:value="form.marque" placeholder="Ex: Toyota" />
      </a-form-item>

      <a-form-item label="Modèle" required>
        <a-input v-model:value="form.modele" placeholder="Ex: Corolla" />
      </a-form-item>

      <a-row :gutter="12">
        <a-col :span="12">
          <a-form-item label="Année" required>
            <a-input-number v-model:value="form.annee" :min="1980" style="width: 100%" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Prix journalier (XOF)" required>
            <a-input-number v-model:value="form.prix_journalier" :min="0" style="width: 100%" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-form-item label="Gamme" required>
        <a-select v-model:value="form.gamme" placeholder="Choisir la gamme">
          <a-select-option value="Economique">Économique</a-select-option>
          <a-select-option value="Moyenne gamme">Moyenne gamme</a-select-option>
          <a-select-option value="Haut de gamme">Haut de gamme</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Type de véhicule" required>
        <a-select v-model:value="form.type_vehicule">
          <a-select-option value="Citadine">Citadine</a-select-option>
          <a-select-option value="Berline">Berline</a-select-option>
          <a-select-option value="SUV & 4x4">SUV & 4x4</a-select-option>
          <a-select-option value="Vans & Minibus">Vans & Minibus</a-select-option>
          <a-select-option value="Voitures de Luxe">Voitures de Luxe</a-select-option>
          <a-select-option value="Utilitaire">Utilitaire</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Énergie" required>
        <a-select v-model:value="form.energie">
          <a-select-option value="Essence">Essence</a-select-option>
          <a-select-option value="Hybride">Hybride</a-select-option>
          <a-select-option value="Electrique">Électrique</a-select-option>
        </a-select>
      </a-form-item>

      <!-- Options booléennes -->
      <!-- <a-row :gutter="12">
        <a-col :span="12" v-for="option in booleanOptions" :key="option.key">
          <a-form-item :label="option.label">
            <a-switch v-model:checked="form[option.key]" />
          </a-form-item>
        </a-col>
      </a-row> -->

      <a-form-item label="Nombre de places" required>
        <a-input-number v-model:value="form.places" :min="1" style="width: 100%" />
      </a-form-item>

      <a-form-item label="Statut" required>
        <a-select v-model:value="form.statut">
          <a-select-option value="Disponible">Disponible</a-select-option>
          <a-select-option value="Indisponible">Indisponible</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Images (max 4)" required>
        <a-upload list-type="picture-card" :file-list="fileList" :before-upload="beforeUpload" :on-remove="onRemove"
          @preview="onPreview">
          <div v-if="fileList.length < 4">
            <PlusOutlined />
            <div style="margin-top: 8px">Téléverser</div>
          </div>
        </a-upload>
      </a-form-item>

      <a-space>
        <a-button @click="closeDrawer">Annuler</a-button>
        <a-button type="primary" v-if="isUpdate" @click="submitUpdateForm" :disabled="isLoader"><a-spin :indicator="indicator" :spinning="isLoader"/> Mettre à jour</a-button>
        <a-button type="primary" v-if="!isUpdate" @click="submitForm" :disabled="isLoader"><a-spin :indicator="indicator" :spinning="isLoader"/> Enregistrer</a-button>
      </a-space>
    </a-form>
  </a-drawer>

  <a-modal v-model:visible="previewVisible" :footer="null">
    <img :src="previewImage" style="width: 100%" />
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import apiService from "../../services/apiService";
import { PlusOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue';
import { LoadingOutlined } from '@ant-design/icons-vue';
import { h } from 'vue';

const visible = ref(false)
const carForm = ref(null)

const isLoader = ref(false)

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '10px',
    marginRight: '10px',
  },
  spin: true,
});

const form = reactive({
  marque: '',
  modele: '',
  annee: null as number | null,
  gamme: '',
  prix_journalier: null as number | null,
  type_vehicule: '',
  energie: '',
  boite_auto: false,
  climatisation: false,
  gps: false,
  wifi: false,
  siege_bebe: false,
  chauffeur: false,
  longue_duree: false,
  mariage_event: false,
  marchandises: false,
  places: null as number | null,
  statut: '',
})

// const booleanOptions = [
//   { key: 'boite_auto', label: 'Boîte automatique' },
//   { key: 'climatisation', label: 'Climatisation' },
//   { key: 'gps', label: 'GPS' },
//   { key: 'wifi', label: 'WiFi' },
//   { key: 'siege_bebe', label: 'Siège bébé' },
//   { key: 'chauffeur', label: 'Chauffeur' },
//   { key: 'longue_duree', label: 'Longue durée' },
//   { key: 'mariage_event', label: 'Mariage/Évènement' },
//   { key: 'marchandises', label: 'Marchandises' },
// ]

const fileList = ref<any[]>([])
const previewVisible = ref(false)
const previewImage = ref('')
const isUpdate = ref(false)
const idValue = ref()

function openDrawerUpdate(data: any) { idValue.value = data.id; vehicle.value = data; Object.assign(form, data); isUpdate.value = true; visible.value = true }
function openDrawer() {
  idValue.value = null;
  Object.assign(form, {
    marque: '',
    modele: '',
    annee: null,
    gamme: '',
    prix_journalier: null,
    type_vehicule: '',
    energie: '',
    boite_auto: false,
    climatisation: false,
    gps: false,
    wifi: false,
    siege_bebe: false,
    chauffeur: false,
    longue_duree: false,
    mariage_event: false,
    marchandises: false,
    places: null,
    statut: '',
  }); isUpdate.value = false; visible.value = true
}
function closeDrawer() { visible.value = false }

function beforeUpload(file: any) {
  const isAllowed = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type)
  if (!isAllowed) {
    message.error('Seules les images JPG/PNG/WebP sont autorisées')
    return false
  }
  if (fileList.value.length >= 4) {
    message.error('Maximum 4 images')
    return false
  }
  const reader = new FileReader()
  reader.addEventListener('load', () => {
    file.thumbUrl = reader.result
    fileList.value.push(file)
  })
  reader.readAsDataURL(file)
  return false
}

function onRemove(file: any) {
  const idx = fileList.value.indexOf(file)
  if (idx > -1) fileList.value.splice(idx, 1)
}

function onPreview(file: any) {
  previewImage.value = file.thumbUrl || file.url
  previewVisible.value = true
}

const confirmDelete = (e: number) => {
  console.log(e);
  apiService.deleteCar(e).then(() => {
    message.success('Véhicule supprimé avec succès')
    getCarList()
  })
};

const cancel = (e: MouseEvent) => {
  console.log(e);
  message.error('Click on No');
};

const submitUpdateForm = () => {
  console.log('cpicpi')
  isLoader.value = true;
  const fd = new FormData()
  Object.keys(form).forEach(key => {
    fd.append(key, (form as any)[key])
  })
  fileList.value.forEach(f => fd.append('images[]', f))

  apiService.updateCar(idValue.value, fd).then(() => {
    isLoader.value = false;
    message.success('Véhicule mise a jour')
    Object.assign(form, {
      marque: '',
      modele: '',
      annee: null,
      gamme: '',
      prix_journalier: null,
      type_vehicule: '',
      energie: '',
      boite_auto: false,
      climatisation: false,
      gps: false,
      wifi: false,
      siege_bebe: false,
      chauffeur: false,
      longue_duree: false,
      mariage_event: false,
      marchandises: false,
      places: null,
      statut: '',
    })
    fileList.value = []
    closeDrawer()
    getCarList()
  }).catch(() => {
    isLoader.value = false;message.error("Erreur lors de l'enregistrement")})
}

function submitForm() {
  isLoader.value = true;
  const fd = new FormData()
  Object.keys(form).forEach(key => {
    fd.append(key, (form as any)[key])
  })
  fileList.value.forEach(f => fd.append('images[]', f))

  apiService.saveCar(fd).then(() => {
    message.success('Véhicule enregistré')
    isLoader.value = false;
    Object.assign(form, {
      marque: '',
      modele: '',
      annee: null,
      gamme: '',
      prix_journalier: null,
      type_vehicule: '',
      energie: '',
      boite_auto: false,
      climatisation: false,
      gps: false,
      wifi: false,
      siege_bebe: false,
      chauffeur: false,
      longue_duree: false,
      mariage_event: false,
      marchandises: false,
      places: null,
      statut: '',
    })
    fileList.value = []
    closeDrawer()
    getCarList()
  }).catch(() => {
    isLoader.value = false; message.error("Erreur lors de l'enregistrement")})
}

interface Vehicle {
  id: number
  image: string
  marque: string
  modele: string
  annee: number
  gamme: 'Economique' | 'Moyenne gamme' | 'Haut de gamme'
  prix_journalier: number
  type_vehicule: string
  energie: string
  boite_auto: boolean
  climatisation: boolean
  gps: boolean
  wifi: boolean
  siege_bebe: boolean
  chauffeur: boolean
  longue_duree: boolean
  mariage_event: boolean
  marchandises: boolean
  places: number
  statut: 'Disponible' | 'Indisponible'
}

const vehicles = ref<Vehicle[]>([])
const vehicle = ref<Vehicle>({})

function getCarList() {
  apiService.adminGetCar().then(res => {
    vehicles.value = res.data
  })
}

onMounted(getCarList)
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
