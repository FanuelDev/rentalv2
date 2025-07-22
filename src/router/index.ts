import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import MainLayout from '../layouts/mainLayout.vue';
import Search from '../pages/Search.vue';
import DetailSearch from '../pages/detailSearch.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import AuthLayout from '../layouts/authLayout.vue';
import IndexLayout from '../layouts/indexLayout.vue';
import Auth from '../pages/admin/auth.vue';
import AdminAuthLayout from '../layouts/adminAuthLayout.vue';
import Dashboard from '../pages/admin/dashboard.vue';
import AdminDashLayout from '../layouts/adminDashLayout.vue';
import Account from '../pages/admin/account.vue';
import Cars from '../pages/admin/cars.vue';
import Reservation from '../pages/admin/reservation.vue';
import Reserve from '../pages/Reserve.vue';
import Privacy from '../pages/privacy.vue';

const routes = [
    {
        path: '/',
        component: IndexLayout,
        children: [
            { path: '', component: Home },
        ],
    },
    {
        path: '/',
        component: MainLayout,
        children: [
            { path: 'search', component: Search },
            { path: 'search/:id', component: DetailSearch },
            { path: 'reserve', component: Reserve },
            { path: 'privacy', component: Privacy },
        ],
    },
    {
        path: '/auth',
        component: AuthLayout,
        children: [
            { path: 'login', component: Login },
            { path: 'register', component: Register },
        ],
    },
    {
        path: '/admin',
        component: AdminDashLayout,
        children: [
            { path: 'dashboard', component: Dashboard },
            { path: 'account', component: Account },
            { path: 'cars', component: Cars },
            { path: 'reservation', component: Reservation },
        ],
    },
    {
        path: '/admin/auth',
        component: AdminAuthLayout,
        children: [
            { path: 'login', component: Auth },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;