import axios from 'axios';
import { FiltersType } from '../store/useCampersStore';

export type Gallery = {
  thumb: string;
  original: string;
};

export type Review = {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
};

export type Camper = {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: string;
  engine: string;
  AC: boolean;
  bathroom: boolean;
  kitchen: boolean;
  TV: boolean;
  radio: boolean;
  refrigerator: boolean;
  microwave: boolean;
  gas: boolean;
  water: boolean;
  gallery: Gallery[];
  reviews: Review[];
};

export type camperListResponse = {
  items: Camper[];
  total: number;
};

const nextServer = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true, // дозволяє axios працювати з cookie
});

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getCampers = async (
  filters: FiltersType & { page?: number; limit?: number }
): Promise<camperListResponse> => {
  await delay(1000); // Reduced delay for better UX
  const params = new URLSearchParams();
  if (filters.location) params.append('location', filters.location);
  if (filters.bodyType) params.append('form', filters.bodyType);
  if (filters.transmission) params.append('transmission', filters.transmission);
  filters.equipment.forEach((eq: string) => params.append(eq, 'true'));
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.limit) params.append('limit', filters.limit.toString());

  const res = await nextServer.get<camperListResponse>(
    `/campers?${params.toString()}`
  );
  return res.data;
};

export const getSingleCamper = async (id: string) => {
  const res = await nextServer.get<Camper>(`/campers/${id}`);
  return res.data;
};
