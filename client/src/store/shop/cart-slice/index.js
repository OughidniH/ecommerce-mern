import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/api";

const initialState = {
  cartItems: [],
  isLoading: false,
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    const response = await api.post("/shop/cart/add", {
      userId,
      productId,
      quantity,
    });

    return response.data;
  },
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId) => {
    const response = await api.get(`/shop/cart/get/${userId}`);

    return response.data;
  },
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, productId }) => {
    const response = await api.delete(`/shop/cart/${userId}/${productId}`);

    return response.data;
  },
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ userId, productId, quantity }) => {
    const response = await api.put("/shop/cart/update-cart", {
      userId,
      productId,
      quantity,
    });

    return response.data;
  },
);

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCartQuantity.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      /*GCosmosWeb*/
      .addCase(clearCartFromDB.fulfilled, (state, action) => {
        state.cartItems = action.payload.data;
      });
      /*GCosmosWeb*/
  },
});
/*GCosmosWeb*/
export const clearCartFromDB = createAsyncThunk(
  "cart/clearCartFromDB",
  async (userId) => {
    const response = await api.delete(`/shop/cart/clear/${userId}`);
    return response.data;
  }
);
/*GCosmosWeb*/
export default shoppingCartSlice.reducer;
