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

        
        <a-form-item label="Numéro de téléphone" name="email"
          :rules="[{ required: true, message: 'Numéro de téléphone vide!' }]">
          <a-input v-model:value="formState.tel" style="width: 100%" placeholder="Ex: +228XXXXXXXX"/>
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

        <a-upload-dragger v-model:fileList="fileListId" :multiple="false" :beforeUpload="beforeUpload"
          :customRequest="handleCustomUpload" :showUploadList="true" class="my-4" name="piece_identite"
          @change="handleChangeId" @drop="handleDrop">
          <p class="ant-upload-drag-icon">
            <inbox-outlined />
          </p>
          <p class="ant-upload-text">Joindre votre pièce d'identité et permis</p>
          <p class="ant-upload-hint">Formats: JPG, PNG, PDF</p>
        </a-upload-dragger>

        <a-upload-dragger v-model:fileList="fileListAddress" name="justificatif_domicile" :multiple="false"
          :beforeUpload="beforeUpload" :showUploadList="true" class="my-4" @change="handleChangeAddress"
          :customRequest="handleCustomUpload" @drop="handleDrop">
          <p class="ant-upload-drag-icon">
            <inbox-outlined />
          </p>
          <p class="ant-upload-text">Joindre une preuve d'adresse</p>
          <p class="ant-upload-hint">Formats: JPG, PNG, PDF</p>
        </a-upload-dragger>

        <a-form-item>
          <button type="button" class="btn btn-dark my-4" @click="validateAccount" :disabled="isLoading">
            <a-spin :indicator="indicator" :spinning="isLoading" />
            Valider le compte
          </button>
        </a-form-item>
      </div>
    </a-form>
    <div class="my-5">
      <small>J'ai déjà un compte, <a href="/auth/login">connectez vous</a> </small>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, h } from "vue";
import { message, notification, Upload } from 'ant-design-vue';
import type { UploadChangeParam } from 'ant-design-vue';
import apiService from "../services/apiService"; // Ton fichier service
import { useRouter } from "vue-router";
import type { UploadRequestOption } from "ant-design-vue/es/vc-upload/interface";
import { LoadingOutlined } from '@ant-design/icons-vue';

const router = useRouter()
const isLoading = ref(false)

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '24px',
  },
  spin: true,
});

const fileListId = ref<any[]>([]);
const fileListAddress = ref<any[]>([]);

interface FormState {
  email: string;
  tel: string;
  name: string;
  password: string;
  confirm: string;
  remember: boolean;
}

const step = ref(1);

const formState = reactive<FormState>({
  email: "",
  tel: "",
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


const beforeUpload = (file: File) => {
  const isAllowedType = ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type);
  if (!isAllowedType) {
    message.error('Seuls les fichiers JPG, PNG et PDF sont autorisés.');
    return Upload.LIST_IGNORE;
  }

  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Le fichier doit faire moins de 2 Mo.');
    return Upload.LIST_IGNORE;
  }

  return true;
};

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
    isLoading.value = true;
    const formData = new FormData();

    formData.append('email', formState.email);
    formData.append('tel', formState.tel);
    formData.append('name', formState.name);
    formData.append('password', formState.password);
    formData.append('confirm', formState.confirm);

    let valuePieceJ = fileListId.value

    console.log(valuePieceJ)
    // Ajoute fichiers
    for (let i = 0; i < valuePieceJ.length; i++) {
      formData.append('piece_justificative[]', valuePieceJ[i].originFileObj); // [] important
    }
    // if (fileListId.value.length > 0) {
    //   formData.append('piece_justificative', valuePieceJ);
    // }
    if (fileListAddress.value.length > 0) {
      formData.append('preuve_adresse', fileListAddress.value[0].originFileObj);
    }

    // Appelle ton service
    await apiService.register(formData);

    notification.success({
      message: 'Inscription réussie',
      description: 'Votre compte a été créé avec succès !',
    });

    isLoading.value = false;
    router.push('/auth/login');
  } catch (error: any) {
    console.error(error);
    notification.error({
      message: "Erreur d'inscription",
      description: error.response?.data?.message || "Erreur inconnue",
    });

    isLoading.value = false;
  }
};

const onFinish = (values: any) => {
  console.log("Formulaire étape 1 validé:", values);
  // rien ici car tu passes au step suivant
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Erreur:", errorInfo);
};

const handleCustomUpload = async (options: UploadRequestOption) => {
  const { file, onSuccess } = options;
  // Tu peux envoyer `file` à ton backend ici avec axios ou fetch
  console.log('Fichier à envoyer manuellement :', file);
  setTimeout(() => {
    onSuccess && onSuccess("ok"); // Simuler succès
  }, 1000);
};
</script>
