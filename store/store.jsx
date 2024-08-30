import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

const useStore = create(persist(
  (set) => ({
    vehicles: [],
    vehicleName: '',
    engineCC: '',
    vehicleType: '',
    imageUri: '',

    setVehicleName: (name) => set({ vehicleName: name }),
    setEngineCC: (cc) => set({ engineCC: cc }),
    setVehicleType: (type) => set({ vehicleType: type }),
    setImageUri: (uri) => set({ imageUri: uri }),

    addVehicle: (vehicle) => set((state) => ({
      vehicles: [...state.vehicles, vehicle],
    })),
  }),
  {
    name: 'vehicle-storage', // Key for AsyncStorage
    storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage
  }
));

export default useStore;
