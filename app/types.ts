export type AdminStackParamList = {
    dashboard: undefined;
    bookings: undefined;
    parkingArea: undefined;
    editArea: { areaId: string }; // 👈 tell TS that editArea expects this param
    revenueReport: undefined;
    occupancyReport: undefined;
  };