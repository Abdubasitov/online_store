import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBeatiful = createAsyncThunk(
  'products/fetchBeatiful',
   async (arg, { rejectWithValue }) => {
  try {
    console.log(arg);
    let api = arg === 'default' ? 'http://localhost:8080/Beatiful' : `http://localhost:8080/Beatiful?_sort=price&_order=${arg}`;
    
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
const beatiful = createSlice({
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
      .addCase(fetchBeatiful.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBeatiful.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(fetchBeatiful.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});


export const { changePage, changeFilterPrice } = beatiful.actions;
export default beatiful.reducer;
