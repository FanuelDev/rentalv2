<template>
    <a-layout>
        <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible
            :style="{ minHeight: '100vh', width: '350px' }">
            <div class="logo p-4">
                <h5 class="text-white mb-4">AAA-Rental</h5>
            </div>
            <a-menu v-model:selectedKeys="selectedKeys" @click="redirection" theme="dark" mode="inline">
                <a-menu-item key="1">
                    <dashboard-outlined />
                    <span>Tableau de bord</span>
                </a-menu-item>
                <a-menu-item key="2">
                    <user-outlined />
                    <span>Comptes</span>
                </a-menu-item>
                <a-menu-item key="3">
                    <video-camera-outlined />
                    <span>Produit</span>
                </a-menu-item>
                <a-menu-item key="4">
                    <upload-outlined />
                    <span>Reservations</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <!-- <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" /> -->
                <div class="d-flex justify-content-end p-3">
                    <a-button danger type="primary" @click="logout">
                        <logout-outlined />
                    </a-button>
                </div>
            </a-layout-header>
            <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">

                <router-view />
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import {
    LogoutOutlined,
    DashboardOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons-vue';
import type { MenuProps } from 'ant-design-vue';
import router from '../router';
import { useRoute } from 'vue-router'

const route = useRoute()

const selectedKeys = ref<string[]>(['1']);
const collapsed = ref<boolean>(false);

onMounted(() => {
    let url = route.path;

    console.log(url)
    if (url == '/admin/dashboard') {
        selectedKeys.value = ['1']
    } else if (url == '/admin/account') {
        selectedKeys.value = ['2']
    } else if (url == '/admin/cars') {
        selectedKeys.value = ['3']
    } else if (url == '/admin/reservation') {
        selectedKeys.value = ['4']
    }
});

const logout = () => {
    router.push('/admin/auth/login')
}

const redirection: MenuProps['onClick'] = e => {
  console.log('click', e);
  if (e.key == 1) {
    router.push("/admin/dashboard")
  } else if (e.key == "2") {
    router.push("/admin/account")
  } else if (e.key == "3") {
    router.push("/admin/cars")
  } else if (e.key == "4") {
    router.push("/admin/reservation")
  }
};
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
}

.site-layout .site-layout-background {
    background: #fff;
}
</style>
