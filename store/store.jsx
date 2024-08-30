import {create} from 'zustand';

const useStore = create((set) => ({
    vehicleName: '',
    engineCC: '',
    vehicleType: null,
    imageUri: '',


    setVehicleName: (name) => set({ vehicleName: name }),
    setEngineCC: (cc) => set({ engineCC: cc }),
    setVehicleType:(value)=>set({vehicleType: value}),
    setImageUri: (uri) => set({ imageUri: uri }),
  }));

export default useStore;
