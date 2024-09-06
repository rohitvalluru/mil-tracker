// store.js
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

const useStore = create(
  persist(
    (set, get) => ({
      vehicles: [],
      vehicleName: "",
      engineCC: "",
      vehicleType: "",
      imageUri: "",
      refuelRecords: {}, // Use an object to map vehicle IDs to records
      selectedVehicle: null, // New state for the selected vehicle

      name: "",
      nickname: "",
      email: "",
      password: "",
      users: [], // Array to store user profiles

      setName: (name) => set({ name }),
      setNickname: (nickname) => set({ nickname }),
      setEmail: (email) => set({ email }),
      setPassword: (password) => set({ password }),

      setVehicleName: (name) => set({ vehicleName: name }),
      setEngineCC: (cc) => set({ engineCC: cc }),
      setVehicleType: (type) => set({ vehicleType: type }),
      setImageUri: (uri) => set({ imageUri: uri }),

      addVehicle: (vehicle) =>
        set((state) => ({
          vehicles: [...state.vehicles, vehicle],
        })),

      addRefuelRecord: (vehicleId, record) =>
        set((state) => ({
          refuelRecords: {
            ...state.refuelRecords,
            [vehicleId]: [...(state.refuelRecords[vehicleId] || []), record],
          },
        })),

      addFuelData: (data) =>
        set((state) => {
          const { vehicleId, distance, fuelUsed, date } = data;
          const existingRecords = state.refuelRecords[vehicleId] || [];
          const updatedRecords = [
            ...existingRecords,
            { distance, fuelUsed, date },
          ];
          return {
            refuelRecords: {
              ...state.refuelRecords,
              [vehicleId]: updatedRecords,
            },
          };
        }),

      addUser: (user) =>
        set((state) => ({
          users: [...state.users, user],
        })),

      loadUsers: async () => {
        try {
          const storedUsers = await AsyncStorage.getItem("users");
          if (storedUsers) {
            set({ users: JSON.parse(storedUsers) });
          } else {
            console.log("No users found in storage");
          }
        } catch (error) {
          console.error("Failed to load users from AsyncStorage", error);
        }
      },

      setSelectedVehicle: (vehicle) => set({ selectedVehicle: vehicle }),

      clearrefuelrecordsforvehicle: (vehicleId) =>
        set((state) => {
          const newRefuelRecords = { ...state.refuelRecords };
          delete newRefuelRecords[vehicleId];
          return { refuelRecords: newRefuelRecords };
        }),

      clearAllUsers: () => set({ users: [] }),
    }),
    {
      name: "vehicle-storage", // Key for AsyncStorage
      storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage
    }
  )
);

export default useStore;
