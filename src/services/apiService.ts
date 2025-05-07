import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://aaa.a07.agency/api",
});

api.interceptors.request.use((config) => {
  const authStore = JSON.parse(localStorage.getItem('dataLog')!);
  console.log(authStore)
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }
  return config;
});

export default {
  async login(email: string, password: string) {
    const res = await api.post("/auth/login", { email, password });
    const authStore = useAuthStore();
    authStore.setUser(res.data.info, res.data.token);
    return res;
  },

  async register(payload: any) {
    const res = await api.post("/auth/register", payload);
    const authStore = useAuthStore();
    authStore.setUser(res.data.info, res.data.token);
  },

  // Fonction pour récupérer les voitures filtrées
  async getCars(filters: any) {
    return await api.get("/cars", { params: filters });
  },

  async getCarById(id: string | string[]) {
    return await api.get("/cars/" + id);
  },

  // Fonction pour récupérer les voitures filtrées
  async getVehicles(filters: {
    type_vehicule?: string | string[];
    gamme?: string | string[];
    energie?: string | string[];
    usage?: string | string[]; // Ajouté pour la gestion des usages
    prix_min?: number;
    prix_max?: number;
    places?: number;
    boite_auto?: boolean;
    climatisation?: boolean;
    gps?: boolean;
    wifi?: boolean;
    siege_bebe?: boolean;
    chauffeur?: boolean;
    longue_duree?: boolean;
    mariage_event?: boolean;
    marchandises?: boolean;
  }) {
    try {
      const response = await api.get("/cars/list/filter", { params: filters });
      return response.data; // Return the vehicle data
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      throw error;
    }
  },

  async reserve(payload: any) {
    return await api.post("/reservations", payload);
  },

  async getMyReservations() {
    return await api.get("/reservations/mine");
  },
};
