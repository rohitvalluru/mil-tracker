import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

const useStore = create(persist(
  (set, get) => ({
    vehicles: [],
    vehicleName: '',
    engineCC: '',
    vehicleType: '',
    imageUri: '',
    refuelRecords: [],

    setVehicleName: (name) => set({ vehicleName: name }),
    setEngineCC: (cc) => set({ engineCC: cc }),
    setVehicleType: (type) => set({ vehicleType: type }),
    setImageUri: (uri) => set({ imageUri: uri }),

    addVehicle: (vehicle) => set((state) => ({
      vehicles: [...state.vehicles, vehicle],
    })),

    addRefuelRecord: (record) => set((state) => ({
      refuelRecords: [...state.refuelRecords, record],
    })),
    clearRefuelRecords: () => set({ refuelRecords: [] }),
  }),
  
  {
    name: 'vehicle-storage', // Key for AsyncStorage
    storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage
  }
));

export default useStore;
