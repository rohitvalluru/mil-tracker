import {create} from 'zustand';

const useStore = create((set) => ({
    vehicleName: '',
    engineCC: '',
    vehicleType: null,
    setVehicleName: (name) => set({ vehicleName: name }),
    setEngineCC: (cc) => set({ engineCC: cc }),
    setVehicleType:(value)=>set({vehicleType: value}),
  }));

export default useStore;
