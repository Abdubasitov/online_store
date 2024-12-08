import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchToys = createAsyncThunk(
  'products/fetchToys',
   async (arg, { rejectWithValue }) => {
  try {
    console.log(arg);
    let api = arg === 'default' ? 'http://localhost:8080/Toys' : `http://localhost:8080/Toys?_sort=price&_order=${arg}`;
    
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
const toys = createSlice({
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
      .addCase(fetchToys.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchToys.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(fetchToys.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});


export const { changePage, changeFilterPrice } = toys.actions;
export default toys.reducer;
