<template>
  <div>
    <h5 class="mb-5 text-primar">Connexion | Admin</h5>
    <a-form :model="formState" name="basic" :label-col="{ span: 24 }" :wrapper-col="{ span: 24 }" layout="vertical"
      autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
      <a-form-item label="Adresse email" name="email"
        :rules="[{ required: true, message: 'Please input your email!' }]">
        <a-input v-model:value="formState.email" style="width: 100%" />
      </a-form-item>

      <a-form-item label="Mot de passe" name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]">
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item name="remember">
        <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
      </a-form-item>

      <a-form-item>
        <button class="btn btn-dark" type="submit">Se connecter</button>
      </a-form-item>
    </a-form>
    <!-- <div class="my-5">
      <small>J'ai pas de compte,
        <a href="/auth/register">s'inscrire</a>
      </small>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { notification } from "ant-design-vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import apiService from "../../services/apiService";

interface FormState {
  email: string;
  password: string;
  remember: boolean;
}


const router = useRouter()

const formState = reactive<FormState>({
  email: "",
  password: "",
  remember: true,
});
const onFinish = async (values: FormState) => {
  apiService.adminLogin(values.email, values.password).then(res => {
    console.log(res.data)
    localStorage.setItem('dataLog', JSON.stringify(res.data))
    notification.success({
      message: "Connexion réussie",
      description: "Bienvenue ! Vous êtes connecté.",
    });

    router.push('/admin/dashboard');
  }).catch(error => {
    notification.error({
      message: "Erreur de connexion",
      description: error.response?.data?.message || "Erreur inconnue",
    });
  });
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
</script>