import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  sidebarOpen: boolean;
  rightSidebarOpen: boolean;
  searchQuery: string;
  activeView: string;
}

const initialState: UIState = {
  sidebarOpen: true,
  rightSidebarOpen: false,
  searchQuery: '',
  activeView: 'Default',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    toggleRightSidebar: (state) => {
      state.rightSidebarOpen = !state.rightSidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setRightSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setActiveView: (state, action: PayloadAction<string>) => {
      state.activeView = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarOpen, setSearchQuery, setActiveView, toggleRightSidebar } = uiSlice.actions;
export default uiSlice.reducer;