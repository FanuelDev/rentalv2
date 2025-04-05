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


        <a-upload-dragger v-model:fileList="fileList" name="file" :multiple="true" class="my-4"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76" @change="handleChange" @drop="handleDrop">
          <p class="ant-upload-drag-icon">
            <inbox-outlined></inbox-outlined>
          </p>
          <p class="ant-upload-text">Joindre votre piece d'identité</p>
          <p class="ant-upload-hint">
            Joindre en fichier image ou pdf
          </p>
        </a-upload-dragger>
        
        <a-upload-dragger v-model:fileList="fileList" name="file" :multiple="true" class="my-4"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76" @change="handleChange" @drop="handleDrop">
          <p class="ant-upload-drag-icon">
            <inbox-outlined></inbox-outlined>
          </p>
          <p class="ant-upload-text">Joindre une preuve d'adresse</p>
          <p class="ant-upload-hint">
            Joindre en fichier image ou pdf
          </p>
        </a-upload-dragger>

        <a-form-item>
          <button type="button" class="btn btn-dark">Valider le compte</button>
        </a-form-item>
      </div>
    </a-form>
    <div class="my-5">
      <small>J'ai déjà un compte, <a href="/auth/login">connectez vous</a> </small>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { reactive } from "vue";
import { notification } from 'ant-design-vue';

const fileList = ref([]);

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
  step.value = 2;
}

const onFinish = (values: any) => {
  console.log("Success:", values);
  notification['success']({
    message: 'Notification Title',
    description:
      'I will never close automatically. I will be close automatically. I will never close automatically.',
  });
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);

};
</script>