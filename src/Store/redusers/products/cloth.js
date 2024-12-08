import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCloth = createAsyncThunk(
  'products/fetchCloth',
   async (arg, { rejectWithValue }) => {
  try {
    console.log(arg);
    let api = arg === 'default' ? 'http://localhost:8080/Clothes' : `http://localhost:8080/Clothes?_sort=price&_order=${arg}`;
    
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
const cloth = createSlice({
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
      .addCase(fetchCloth.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCloth.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(fetchCloth.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});


export const { changePage, changeFilterPrice } = cloth.actions;
export default cloth.reducer;
