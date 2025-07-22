<template>
    <div class="container my-5">
        <div class="m-4">
            <a-descriptions title="Information de compte">
                <a-descriptions-item label="Nom & Prénoms">{{ log.info.nom }}</a-descriptions-item>
                <a-descriptions-item label="Email">{{ log.info.email }}</a-descriptions-item>
            </a-descriptions>
        </div>
        <a-card title="Mes réservations" bordered>
            <a-spin :spinning="loading" tip="Chargement des réservations...">
                <a-table :columns="columns" :data-source="reservations" row-key="id" :pagination="{ pageSize: 5 }" />
            </a-spin>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, h } from "vue"
import apiService from "../services/apiService"
import { notification } from "ant-design-vue"
import dayjs from "dayjs"

interface Reservation {
    id: number
    voiture: string
    image: string
    date_debut: string
    date_fin: string
    montant: number
    etat: string
    date_reservation: string
}

const log = JSON.parse(localStorage.getItem("dataLog")!)
const loading = ref(false)
const reservations = ref<Reservation[]>([])

const columns = [
    {
        title: "Réservé le",
        dataIndex: "date_reservation",
        key: "date_reservation",
        customRender: ({ text }: any) => dayjs(text).format("DD/MM/YYYY HH:mm"),
    },
    {
        title: "Voiture",
        dataIndex: "voiture",
        key: "voiture",
    },
    {
        title: "Image",
        dataIndex: "image",
        key: "image",
        customRender: ({ text }: any) => {
            return h('img', {
                src: import.meta.env.VITE_FRONT_URL + '/' + text, // si tu utilises Vite
                alt: "Voiture",
                style: "width: 100px; border-radius: 8px;",
            });
        },
    },
    {
        title: "Date début",
        dataIndex: "date_debut",
        key: "date_debut",
    },
    {
        title: "Date fin",
        dataIndex: "date_fin",
        key: "date_fin",
    },
    {
        title: "Montant",
        dataIndex: "montant",
        key: "montant",
        customRender: ({ text }: any) => `${text.toLocaleString()} FCFA`,
    },
    {
        title: "État",
        dataIndex: "etat",
        key: "etat",
        customRender: ({ text }: any) => {
            let color = "orange"
            if (text === "validee") color = "green"
            else if (text === "annulee") color = "red"
            return h("span", { style: { color } }, text)
        },
    },
]

onMounted(() => {
    loading.value = true
    apiService.getMyReservations(log.info.id)
        .then((res: any) => {
            console.log(res.data)
            reservations.value = res.data.map((item: any) => ({
                id: item.id,
                voiture: item.voiture,
                image: item.image,
                date_debut: dayjs(item.date_debut).format("DD/MM/YYYY"),
                date_fin: dayjs(item.date_fin).format("DD/MM/YYYY"),
                montant: item.montant,
                etat: item.etat || "en attente",
                date_reservation: item.date_reservation,
            }))
        })
        .catch(err => {
            notification.error({
                message: "Erreur",
                description: err?.response?.data?.message || "Impossible de charger vos réservations.",
            })
        })
        .finally(() => {
            loading.value = false
        })
})
</script>
