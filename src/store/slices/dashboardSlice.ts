import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
interface DashboardData {
  customers: {
    count: number;
    change: number;
  };
  orders: {
    count: number;
    change: number;
  };
  revenue: {
    amount: number;
    change: number;
  };
  growth: {
    percentage: number;
    change: number;
  };
  revenueChart: {
    currentWeek: number;
    previousWeek: number;
  };
}

interface DashboardState {
  data: DashboardData;
  loading: boolean;
  error: string | null;
  filterDateRange: 'week' | 'month' | 'year';
}

const initialState: DashboardState = {
  data: {
    customers: { count: 3781, change: 11.01 },
    orders: { count: 1219, change: -0.03 },
    revenue: { amount: 695, change: 15.03 },
    growth: { percentage: 30.1, change: 6.08 },
    revenueChart: { currentWeek: 58211, previousWeek: 68768 },
  },
  loading: false,
  error: null,
  filterDateRange: 'week',
};

const dashboardSlice = createSlice({
  name: 'dashboard',
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
    setFilterDateRange: (state, action: PayloadAction<'week' | 'month' | 'year'>) => {
      state.filterDateRange = action.payload;
    },
  },
});

export const { setDashboardData, setLoading, setError, setFilterDateRange } = dashboardSlice.actions;
export default dashboardSlice.reducer;