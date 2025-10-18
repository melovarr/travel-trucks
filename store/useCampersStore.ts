import { create } from 'zustand';
import { Camper } from '../lib/api';

export type FiltersType = {
  location: string;
  equipment: string[];
  bodyType: string;
  transmission?: string;
};

type Store = {
  campers: Camper[];
  filters: FiltersType;
  selectedCampers: Camper[];

  setCampers: (campers: Camper[]) => void;
  addCampers: (campers: Camper[]) => void;
  setFilters: (filters: FiltersType) => void;
  addSelectedCamper: (camper: Camper) => void;
  removeSelectedCamper: (camperId: string) => void;
  clearSelectedCampers: () => void;
};

const useCampersStore = create<Store>(set => ({
  campers: [],
  filters: { location: '', equipment: [], bodyType: '', transmission: '' },
  selectedCampers: [],

  setCampers: campers => set({ campers }),
  addCampers: campers =>
    set(state => ({ campers: [...state.campers, ...campers] })),
  setFilters: filters => set({ filters }),
  addSelectedCamper: camper =>
    set(state => ({
      selectedCampers: state.selectedCampers.some(c => c.id === camper.id)
        ? state.selectedCampers
        : [...state.selectedCampers, camper],
    })),
  removeSelectedCamper: camperId =>
    set(state => ({
      selectedCampers: state.selectedCampers.filter(c => c.id !== camperId),
    })),
  clearSelectedCampers: () => set({ selectedCampers: [] }),
}));

export default useCampersStore;
