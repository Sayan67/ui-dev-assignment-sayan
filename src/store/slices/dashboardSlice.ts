import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface DashboardData {
  customers: {
    count: number;
    change: number;
    trend: "up" | "down";
  };
  orders: {
    count: number;
    change: number;
    trend: "up" | "down";
  };
  revenue: {
    amount: number;
    change: number;
    trend: "up" | "down";
  };
  growth: {
    percentage: number;
    change: number;
    trend: "up" | "down";
  };
  revenueChart: {
    currentWeek: number;
    previousWeek: number;
    data: Array<{ name: string; current: number; previous: number }>;
  };
  projectionsChart: {
    data: Array<{ month: string; projection: number; actual: number }>;
  };
  revenueByLocation: Array<{
    city: string;
    revenue: number;
    coordinates: [number, number];
  }>;
  topProducts: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    amount: number;
  }>;
  salesByChannel: {
    direct: number;
    affiliate: number;
    sponsored: number;
    email: number;
  };
}

interface DashboardState {
  data: DashboardData;
  loading: boolean;
  error: string | null;
  filterDateRange: "week" | "month" | "year";
}

const initialState: DashboardState = {
  data: {
    customers: { count: 3781, change: 11.01, trend: "up" },
    orders: { count: 1219, change: -0.03, trend: "down" },
    revenue: { amount: 695, change: 15.03, trend: "up" },
    growth: { percentage: 30.1, change: 6.08, trend: "up" },
    revenueChart: {
      currentWeek: 58211,
      previousWeek: 68768,
      data: [
        { name: "Jan", current: 15000, previous: 12000 },
        { name: "Feb", current: 18000, previous: 16000 },
        { name: "Mar", current: 20000, previous: 15000 },
        { name: "Apr", current: 16000, previous: 22000 },
        { name: "May", current: 25000, previous: 20000 },
        { name: "Jun", current: 28000, previous: 18000 },
      ],
    },
    projectionsChart: {
      data: [
        { month: "Jan", projection: 18, actual: 24 },
        { month: "Feb", projection: 22, actual: 30 },
        { month: "Mar", projection: 20, actual: 22 },
        { month: "Apr", projection: 26, actual: 26 },
        { month: "May", projection: 24, actual: 32 },
        { month: "Jun", projection: 28, actual: 34 },
      ],
    },
    revenueByLocation: [
      { city: "New York", revenue: 72000, coordinates: [-74.006, 40.7128] },
      {
        city: "San Francisco",
        revenue: 39000,
        coordinates: [-122.4194, 37.7749],
      },
      { city: "Sydney", revenue: 25000, coordinates: [151.2093, -33.8688] },
      { city: "Singapore", revenue: 61000, coordinates: [103.8198, 1.3521] },
    ],
    topProducts: [
      {
        id: "1",
        name: "ASOS Ridley High Waist",
        price: 79.49,
        quantity: 82,
        amount: 6518.18,
      },
      {
        id: "2",
        name: "Marco Lightweight Shirt",
        price: 128.5,
        quantity: 37,
        amount: 4754.5,
      },
      {
        id: "3",
        name: "Half Sleeve Shirt",
        price: 39.99,
        quantity: 64,
        amount: 2559.36,
      },
      {
        id: "4",
        name: "Lightweight Jacket",
        price: 20.0,
        quantity: 184,
        amount: 3680.0,
      },
      {
        id: "5",
        name: "Marco Shoes",
        price: 79.49,
        quantity: 64,
        amount: 1965.81,
      },
    ],
    salesByChannel: {
      direct: 300.56,
      affiliate: 135.18,
      sponsored: 154.02,
      email: 48.96,
    },
  },
  loading: false,
  error: null,
  filterDateRange: "week",
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardData: (state, action: PayloadAction<DashboardData>) => {
      state.data = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setFilterDateRange: (
      state,
      action: PayloadAction<"week" | "month" | "year">
    ) => {
      state.filterDateRange = action.payload;
    },
  },
});

export const { setDashboardData, setLoading, setError, setFilterDateRange } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;
