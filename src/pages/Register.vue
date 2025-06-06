<template>
  <div>
    <h5 class="mb-5 text-primar">Créer un compte</h5>
    <a-form :model="formState" name="basic" :label-col="{ span: 24 }" :wrapper-col="{ span: 24 }" layout="vertical"
      autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
      <div v-if="step == 1">
        <a-form-item label="Nom & Prenoms" name="name"
          :rules="[{ required: true, message: 'Please input your name!' }]">
          <a-input v-model:value="formState.name" style="width: 100%" />
        </a-form-item>
        <a-form-item label="Adresse email" name="email"
          :rules="[{ required: true, message: 'Please input your email!' }]">
          <a-input v-model:value="formState.email" style="width: 100%" />
        </a-form-item>

        <a-form-item label="Mot de passe" name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]">
          <a-input-password v-model:value="formState.password" />
        </a-form-item>
        <a-form-item label="Confirmation" name="confirm"
          :rules="[{ required: true, message: 'Please input your confirmation!' }]">
          <a-input-password v-model:value="formState.confirm" />
        </a-form-item>

        <a-form-item name="remember">
          <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
        </a-form-item>

        <a-form-item>
          <button type="button" class="btn btn-dark" @click="nexStep">S'inscrire</button>
        </a-form-item>
      </div>
      <div v-if="step == 2">

        <a-form-item label="Nom & Prenoms" name="name"
          :rules="[{ required: true, message: 'Please input your name!' }]">
          <a-input v-model:value="formState.name" style="width: 100%" />
        </a-form-item>
        <a-form-item label="Adresse email" name="email"
          :rules="[{ required: true, message: 'Please input your email!' }]">
          <a-input v-model:value="formState.email" style="width: 100%" />
        </a-form-item>

        <a-upload-dragger v-model:fileList="fileListId" name="piece_identite" :multiple="false" class="my-4"
          @change="handleChangeId" @drop="handleDrop">
          <p class="ant-upload-drag-icon">
            <inbox-outlined />
          </p>
          <p class="ant-upload-text">Joindre votre pièce d'identité</p>
          <p class="ant-upload-hint">Formats: JPG, PNG, PDF</p>
        </a-upload-dragger>

        <a-upload-dragger v-model:fileList="fileListAddress" name="justificatif_domicile" :multiple="false" class="my-4"
          @change="handleChangeAddress" @drop="handleDrop">
          <p class="ant-upload-drag-icon">
            <inbox-outlined />
          </p>
          <p class="ant-upload-text">Joindre une preuve d'adresse</p>
          <p class="ant-upload-hint">Formats: JPG, PNG, PDF</p>
        </a-upload-dragger>

        <a-form-item>
          <button type="button" class="btn btn-dark my-4" @click="validateAccount">Valider le compte</button>
        </a-form-item>
      </div>
    </a-form>
    <div class="my-5">
      <small>J'ai déjà un compte, <a href="/auth/login">connectez vous</a> </small>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { notification } from 'ant-design-vue';
import type { UploadChangeParam } from 'ant-design-vue';
import apiService from "../services/apiService"; // Ton fichier service
import { useRouter } from "vue-router";

const router = useRouter()

const fileListId = ref<any[]>([]);
const fileListAddress = ref<any[]>([]);

interface FormState {
  email: string;
  name: string;
  password: string;
  confirm: string;
  remember: boolean;
}

const step = ref(1);

const formState = reactive<FormState>({
  email: "",
  name: "",
  password: "",
  confirm: "",
  remember: true,
});

const nexStep = () => {
  if (formState.password.length > 6) {
  step.value = 2;
  } else {
    notification.warning({
      message: 'Warning',
      description: 'Mot de passe incorrect, trop petit!',
    });
  }
}

const handleDrop = (e: DragEvent) => {
  console.log(e);
}

const handleChangeId = (info: UploadChangeParam) => {
  fileListId.value = info.fileList;
};

const handleChangeAddress = (info: UploadChangeParam) => {
  fileListAddress.value = info.fileList;
};

const validateAccount = async () => {
  try {
    const formData = new FormData();

    formData.append('email', formState.email);
    formData.append('name', formState.name);
    formData.append('password', formState.password);
    formData.append('confirm', formState.confirm);

    // Ajoute fichiers
    if (fileListId.value.length > 0) {
      formData.append('piece_justificative', fileListId.value[0].originFileObj);
    }
    if (fileListAddress.value.length > 0) {
      formData.append('preuve_adresse', fileListAddress.value[0].originFileObj);
    }

    // Appelle ton service
    await apiService.register(formData);

    notification.success({
      message: 'Inscription réussie',
      description: 'Votre compte a été créé avec succès !',
    });

    router.push('/auth/login');
  } catch (error: any) {
    console.error(error);
    notification.error({
      message: "Erreur d'inscription",
      description: error.response?.data?.message || "Erreur inconnue",
    });
  }
};

const onFinish = (values: any) => {
  console.log("Formulaire étape 1 validé:", values);
  // rien ici car tu passes au step suivant
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Erreur:", errorInfo);
};
</script>
