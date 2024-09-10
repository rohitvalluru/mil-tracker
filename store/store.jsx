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
      refuelRecords: {},
      selectedVehicle: null,
      name: "",
      nickname: "",
      email: "",
      password: "",
      users: [],
      userVehicles: {},
      currentUser: null,

      setName: (name) => set({ name }),
      setNickname: (nickname) => set({ nickname }),
      setEmail: (email) => set({ email }),
      setPassword: (password) => set({ password }),
      setVehicleName: (name) => set({ vehicleName: name }),
      setEngineCC: (cc) => set({ engineCC: cc }),
      setVehicleType: (type) => set({ vehicleType: type }),
      setImageUri: (uri) => set({ imageUri: uri }),
      setCurrentUser: (user) => set({ currentUser: user }),

      addVehicle: (vehicle) => {
        const currentUser = get().currentUser;
        if (!currentUser) {
          console.error("No user is currently logged in.");
          return;
        }
        const userEmail = currentUser.email;

        const trimmedVehicle = {
          ...vehicle,
          vehicleName: vehicle.vehicleName.trim(),
        };
        set((state) => ({
          userVehicles: {
            ...state.userVehicles,
            [currentUser.email]: [
              ...(state.userVehicles[currentUser.email] || []),
              trimmedVehicle,
            ],
          },
        }));
      },

      addRefuelRecord: (vehicleName, refuelRecord) => {
        const currentUser = get().currentUser;
        if (!currentUser) {
          console.error("No user is currently logged in.");
          return;
        }
        const userEmail = currentUser.email;
        set((state) => ({
          refuelRecords: {
            ...state.refuelRecords,
            [vehicleName]: [
              ...(state.refuelRecords[vehicleName] || []),
              refuelRecord,
            ],
          },
        }));
      },

      addFuelData: (data) => {
        const { vehicleId, distance, fuelUsed, date } = data;
        const currentUser = get().currentUser;

        if (!currentUser) {
          console.error("No user is currently logged in.");
          return;
        }

        const userEmail = currentUser.email;

        set((state) => {
          const existingRecords =
            state.refuelRecords[userEmail]?.[vehicleId] || [];
          const updatedRecords = [
            ...existingRecords,
            { distance, fuelUsed, date },
          ];

          const updatedRefuelRecords = {
            ...state.refuelRecords,
            [userEmail]: {
              ...state.refuelRecords[userEmail],
              [vehicleId]: updatedRecords,
            },
          };

          console.log(
            "Updated Refuel Records:",
            JSON.stringify(updatedRefuelRecords, null, 2)
          );
          // Log updated records

          return {
            refuelRecords: updatedRefuelRecords,
          };
        });
      },

      clearrefuelrecordsforvehicle: (vehicleName) => {
        const refuelRecords = get().refuelRecords;
        const updatedRecords = { ...refuelRecords };
        delete updatedRecords[vehicleName];

        set({ refuelRecords: updatedRecords });
      },

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

      setSelectedVehicle: (vehicle) => {
        console.log("Setting selected vehicle:", vehicle);
        set((state) => ({
          selectedVehicle: vehicle,
        }));
      },

      clearVehicleRecords: () => {
        const currentUser = get().currentUser;
        if (!currentUser) {
          console.error("No user is currently logged in.");
          return;
        }
        const userEmail = currentUser.email;

        set((state) => ({
          userVehicles: {
            ...state.userVehicles,
            [userEmail]: [], // Clear the vehicle array for the current user
          },
        }));

        console.log(`Cleared all vehicle records for user: ${userEmail}`);
      },

      clearAllUsers: () => {
        set({
          users: [],
          userVehicles: {},
          refuelRecords: {},
          selectedVehicle: null, // Optionally reset the selected vehicle
        });
        console.log(
          "Cleared all user data, including vehicles and refuel records."
        );
      },
    }),
    {
      name: "vehicle-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useStore;
