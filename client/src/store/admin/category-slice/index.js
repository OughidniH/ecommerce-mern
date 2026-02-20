import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  categoryList: [],
};

// ✅ FETCH ALL
export const fetchAllCategories = createAsyncThunk(
  "adminCategory/fetchAll",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/admin/category`
    );

    return response.data;
  }
);

// ✅ ADD
export const addNewCategory = createAsyncThunk(
  "adminCategory/addNew",
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/admin/category/add`,
      formData
    );

    return response.data;
  }
);

// ✅ EDIT
export const editCategory = createAsyncThunk(
  "adminCategory/edit",
  async ({ id, formData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/api/admin/category/edit/${id}`,
      formData
    );

    return response.data;
  }
);

// ✅ DELETE
export const deleteCategory = createAsyncThunk(
  "adminCategory/delete",
  async (id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_SERVER_URL}/api/admin/category/delete/${id}`
    );

    return response.data;
  }
);

const adminCategorySlice = createSlice({
  name: "adminCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryList = action.payload.data;
      })
      .addCase(fetchAllCategories.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default adminCategorySlice.reducer;