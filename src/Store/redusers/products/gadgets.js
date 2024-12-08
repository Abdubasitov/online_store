import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchGadgets = createAsyncThunk(
  'products/fetchGadgets',
   async (arg, { rejectWithValue }) => {
  try {
    console.log(arg);
    let api = arg === 'default' ? 'http://localhost:8080/Gadgets' : `http://localhost:8080/Gadgets?_sort=price&_order=${arg}`;
    
    const res = await axios(api);
    if (res.status !== 200) {
      throw new Error('Ошибка при запросе');
    }
    return res.data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

// В редьюсере products.js
const gadgets = createSlice({
  name: 'products',
  initialState: {
    data: [], // массив продуктов
    status: 'idle', // состояние запроса
    error: null, // ошибка
    filter: { 
      page: 1, // текущая страница
      filterPrice: 'default' // порядок сортировки
    }
  },
  reducers: {
    changePage: (state, action) => {
      state.filter.page = action.payload; // изменение страницы
    },
    changeFilterPrice: (state, action) => {
      state.filter.filterPrice = action.payload; // изменение фильтра
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGadgets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGadgets.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(fetchGadgets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});


export const { changePage, changeFilterPrice } = gadgets.actions;
export default gadgets.reducer;
