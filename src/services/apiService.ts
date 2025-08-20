import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://aaa.troispuissances.fr/api",
});

api.interceptors.request.use((config) => {
  const authStore = JSON.parse(localStorage.getItem('dataLog')!);
  console.log(authStore)
  if (authStore) {
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

  
  async adminLogin(email: string, password: string) {
    const res = await api.post("/admin/login", { email, password });
    // const authStore = useAuthStore();
    // authStore.setUser(res.data.info, res.data.token);
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

  async saveCar(body: any) {
    return await api.post("/cars", body);
  },

  
  async deleteCar(id: number) {
    return await api.delete("/cars/"+ id);
  },
  
  async updateCar(id: number, body: any) {
    return await api.put("/cars/"+ id, body);
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

  async getMyReservations(id: string) {
    return await api.get("/reservations/me/"+id);
  },

  
  async adminGetAccount() {
    return await api.get("/admin/accounts");
  },

  async adminGetReservation() {
    return await api.get("/admin/reservations");
  },

  
  async adminValidReservation(id: number) {
    return await api.post(`/admin/reservations/${id}/validate`, {});
  },
  
  async adminGetCar() {
    return await api.get("/admin/vehicles");
  },

  async adminStat() {
    return await api.get("/admin/stats");
  },
};
