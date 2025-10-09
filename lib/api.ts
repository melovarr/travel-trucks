import axios from 'axios';
import { Filters } from 'components/components/Filters/Filters';

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

export const getCampers = async (filters: Filters): Promise<Camper[]> => {
  await delay(3000);
  console.log('Filters:', filters);
  const params = new URLSearchParams();
  if (filters.location) params.append('location', filters.location);
  if (filters.bodyType) params.append('form', filters.bodyType);
  filters.equipment.forEach(eq => params.append(eq, 'true'));
  console.log('Query params:', params.toString());
  const res = await nextServer.get<camperListResponse>(
    `/campers?${params.toString()}`
  );
  // const data = await res.json();
  // return data.items || data;
  return res.data.items;
};

export const getSingleCamper = async (id: string) => {
  const res = await nextServer.get<Camper>(`/campers/${id}`);
  return res.data;
};
