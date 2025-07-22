<template>
  <a-layout class="bg-white">
    <nav class="navbar navbar-expand-sm navbar-dark shadow-lg py-3 sticky-top" style="background-color: #1E40AF;">
      <div class="container">
        <a class="navbar-brand" href="/">
          <img src="/src/assets/img/logo.png" alt="" id="img-logo" /></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarID"
          aria-controls="navbarID" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse text-white d-lg-flex justify-content-between" id="navbarID">
          <div class="navbar-nav"></div>
          <div class="navbar-nav">
            <a class="nav-link mx-2 active" aria-current="page" href="/#accueil">Accueil</a>
            <a class="nav-link mx-2 active" aria-current="page" href="/#voiture">Mes voitures</a>
            <a class="nav-link mx-2 active" aria-current="page" href="/#usage">Comment ça marche</a>
            <!-- <a class="nav-link mx-2 active" aria-current="page" href="#partner">Partenaires</a> -->
          </div>
          <div class="navbar-nav">
            <!-- <a
              class="nav-link mx-2 active btn btn-dark"
              aria-current="page"
              href="/search"
              >Reserver une voiture</a
            > -->
            <a class="nav-link mx-2 btn btn-outline-light" aria-current="page" href="/auth/login" v-if="!dataLog">Se
              connecter</a>
            <a-dropdown>
              <a class="nav-link mx-2 btn btn-outline-light" v-if="dataLog" @click="handleButtonClick">
                {{ dataLog.info.nom }} </a>
              <template #overlay>
                <a-menu @click="handleMenuClick">
                  <a-menu-item key="3">
                    <UserOutlined />
                    Mon profil
                  </a-menu-item>
                  <a-menu-item key="2">
                    <UserOutlined />
                    Mes reservations
                  </a-menu-item>
                  <a-menu-item key="1">
                    <UserOutlined />
                    Deconnexion
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
      </div>
    </nav>

    <div class="container my-5">
      <router-view />
    </div>

    <footer class="mt-5 bg-blue text-white pt-5">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <a class="navbar-brand" href="#">
              <img src="/src/assets/img/logo.png" alt="" class="img-fluid" id="img-logo1" /></a>
            <p class="mx-5 my-4 text-decorate text-white">
              Nous sommes une entreprise locale spécialisée
              dans la location de véhicules depuis 2022.
              Notre mission : offrir un service fiable,
              flexible et accessible à tous.
            </p>
            <p class="my-4 mx-5">
              <a href="" class="a mx-2 text-white"><i class="fab fa-facebook"></i></a>
              <a href="" class="a mx-2 text-white"><i class="fab fa-instagram"></i></a>
              <a href="" class="a mx-2 text-white"><i class="fab fa-linkedin"></i></a>
              <a href="" class="a mx-2 text-white"><i class="fab fa-whatsapp"></i></a>
            </p>
          </div>
          <div class="col-md-2 col-6 my-4">
            <h6 class="text-primar">Categorie</h6>
            <ul>
              <li><a class="text-light" href="">4X4</a></li>
              <li><a class="text-light" href="">Voitures de luxe</a></li>
              <li><a class="text-light" href="">Mini Bus</a></li>
              <li><a class="text-light" href="">Citadines</a></li>
              <li><a class="text-light" href="">Berlines</a></li>
            </ul>
          </div>
          <div class="col-md-2 col-6 my-4">
            <h6 class="text-primar">Liens utiles</h6>
            <ul>
              <li><a class="text-light" href="#accueil">Accueil</a></li>
              <li><a class="text-light" href="#voiture">Mes voiture</a></li>
              <li><a class="text-light" href="#usage">Comment ça marche</a></li>
              <li><a class="text-light" href="#partner">Partenaires</a></li>
            </ul>
          </div>
          <div class="col-md-2 col-6 my-4">
            <h6 class="text-primar">Help</h6>
            <ul>
              <li><a class="text-light" href="/auth/register">Creer un compte</a></li>
              <li><a class="text-light" href="/auth/login">Se connecter</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="bg-primary pt-4 mt-4">
        <div class="container d-flex justify-content-between align-items-center text-white">
          <p>&copy; Copyright by aaa-rental, 2025</p>
          <p>Tous droits reservés</p>
        </div>
      </div>
    </footer>
  </a-layout>
</template>

<script lang="ts" setup>
import type { MenuProps } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const dataLog = ref();

const handleButtonClick = (e: Event) => {
  console.log('click left button', e);
};
const handleMenuClick: MenuProps['onClick'] = e => {
  console.log('click', e.key);
  if (e.key == '1') {
    localStorage.clear()
    router.push('/auth/login');
  } else if (e.key == '2') {
    router.push('/reserve');
  } else {
    router.push('/reserve');
  }
};

onMounted(() => {
  dataLog.value = JSON.parse(localStorage.getItem('dataLog')!);
})
</script>

<style scoped>
.bg-white {
  background-color: #fff !important;
}
</style>