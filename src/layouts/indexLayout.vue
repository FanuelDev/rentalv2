<template>
  <a-layout class="bg-white">
    <div class="p-4">
      <div class="bg-banner">
        <nav class="navbar navbar-expand-sm navbar-light bg-whiter1 py-3">
          <div class="container">
            <a class="navbar-brand" href="/">
              <img src="/src/assets/img/logo.png" alt="" id="img-logo" /></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarID"
              aria-controls="navbarID" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse d-lg-flex justify-content-between" id="navbarID">
              <div class="navbar-nav"></div>
              <div class="navbar-nav">
            <a class="nav-link mx-2 active" aria-current="page" href="/index.html">Accueil</a>
            <a class="nav-link mx-2 active" aria-current="page" href="#">Compagnies</a>
            <a class="nav-link mx-2 active" aria-current="page" href="#">Comment ça marche</a>
            <a class="nav-link mx-2 active" aria-current="page" href="#">Partenaires</a>
              </div>
              <div class="navbar-nav">
                <a class="nav-link mx-2 active btn btn-dark" aria-current="page" href="/search">Reserver une voiture</a>
                <a class="nav-link mx-2 btn btn-outline-primary" aria-current="page" href="/auth/login"
                  v-if="!dataLog">Se connecter</a>
                <a-dropdown>
                  <a class="nav-link mx-2 btn btn-outline-primary" v-if="dataLog" @click="handleButtonClick">
                    {{ dataLog.info.name }} </a>
                  <template #overlay>
                    <a-menu @click="handleMenuClick">
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

        <div class="topy">
          <h1 class="text-center py-5 text-white">
            Profitez de notre large gamme de véhicules pour vos déplacements personnels ou professionnels <br />
            Réservez en ligne ou contactez-nous dès aujourd’hui !
          </h1>
        </div>
        <div class="py-5" id="top">
          <div class="scroller mt-5">
            <a href="#top">
              <button class="btn btn-outline-light">
                <i class="fa fa-arrow-down"></i>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="container my-3">
      <router-view />
    </div>

    <footer class="mt-5 bg-light pt-5">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <a class="navbar-brand" href="#">
              <img src="/src/assets/img/logo.png" alt="" class="img-fluid" id="img-logo1" /></a>
            <p class="mx-5 my-4 text-decorate">
              Nous sommes une entreprise locale spécialisée
              dans la location de véhicules depuis 2022.
              Notre mission : offrir un service fiable, 
              flexible et accessible à tous.
            </p>
            <p class="my-4 mx-5">
              <a href="" class="a mx-2"><i class="fab fa-facebook"></i></a>
              <a href="" class="a mx-2"><i class="fab fa-instagram"></i></a>
              <a href="" class="a mx-2"><i class="fab fa-linkedin"></i></a>
              <a href="" class="a mx-2"><i class="fab fa-whatsapp"></i></a>
            </p>
          </div>
          <div class="col-md-2 my-4">
            <h6>Categorie</h6>
            <ul>
              <li><a href="">Lorem, ipsum.</a></li>
              <li><a href="">Lorem, ipsum.</a></li>
              <li><a href="">Lorem, ipsum.</a></li>
              <li><a href="">Lorem, ipsum.</a></li>
              <li><a href="">Lorem, ipsum.</a></li>
              <li><a href="">Lorem, ipsum.</a></li>
            </ul>
          </div>
          <div class="col-md-2 my-4">
            <h6>Liens utiles</h6>
            <ul>
              <li><a href="">Lorem, ipsum.</a></li>
              <li><a href="">Lorem, ipsum.</a></li>
              <li><a href="">Lorem, ipsum.</a></li>
              <li><a href="">Lorem, ipsum.</a></li>
              <li><a href="">Lorem, ipsum.</a></li>
              <li><a href="">Lorem, ipsum.</a></li>
            </ul>
          </div>
          <div class="col-md-2 my-4">
            <h6>Liens rapides</h6>
            <ul>
              <li><a href="">Lorem, ipsum.</a></li>
              <li><a href="">Lorem, ipsum.</a></li>
              <li><a href="">Lorem, ipsum.</a></li>
              <li><a href="">Lorem, ipsum.</a></li>
              <li><a href="">Lorem, ipsum.</a></li>
              <li><a href="">Lorem, ipsum.</a></li>
            </ul>
          </div>
          <div class="col-md-2 my-4">
            <h6>Help</h6>
            <ul>
              <li><a href="">Lorem, ipsum.</a></li>
              <li><a href="">Lorem, ipsum.</a></li>
              <li><a href="">Lorem, ipsum.</a></li>
              <li><a href="">Lorem, ipsum.</a></li>
              <li><a href="">Lorem, ipsum.</a></li>
              <li><a href="">Lorem, ipsum.</a></li>
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
  if (e.key = '1') {
    localStorage.clear()

    router.push('/auth/login');
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