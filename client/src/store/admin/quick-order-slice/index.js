import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/api";

export const updateQuickOrderStatus = createAsyncThunk(
  "adminQuickOrder/updateQuickOrderStatus",
  async ({ id, orderStatus }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/quick-order/${id}`, { orderStatus });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getAllQuickOrdersForAdmin = createAsyncThunk(
  "adminQuickOrder/getAllQuickOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/quick-order");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);


export const getQuickOrderDetailsForAdmin = createAsyncThunk(
  "adminQuickOrder/getQuickOrderDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/quick-order/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);


const quickOrderSlice = createSlice({
  name: "adminQuickOrder",
  initialState: {
    quickOrderList: [],
    quickOrderDetails: null,
    isLoading: false,
  },
  reducers: {
    resetQuickOrderDetails: (state) => {
      state.quickOrderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder

      /* GET ALL */
      .addCase(getAllQuickOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllQuickOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quickOrderList = action.payload;
      })
      .addCase(getAllQuickOrdersForAdmin.rejected, (state) => {
        state.isLoading = false;
      })

      /* GET DETAILS */
      .addCase(getQuickOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuickOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quickOrderDetails = action.payload;
      })
      .addCase(getQuickOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { resetQuickOrderDetails } = quickOrderSlice.actions;

export default quickOrderSlice.reducer;