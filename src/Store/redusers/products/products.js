import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (sortOrder, { rejectWithValue }) => {
    try {
      const api =
        sortOrder === 'default'
          ? 'http://localhost:8080/All' // API без сортировки
          : `http://localhost:8080/All?_sort=price&_order=${sortOrder}`; // Сортировка по цене

      const response = await axios.get(api);

      if (response.status !== 200) {
        throw new Error('Ошибка загрузки данных');
      }

      const data = response.data;

      // Если "default", то рандомизируем массив
      if (sortOrder === 'default') {
        const shuffleArray = (array) => {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        };

        return shuffleArray(data);
      }

      return data; // Возвращаем отсортированные данные (asc/desc)
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const productsSlice = createSlice({
  name: 'products',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
    filter: {
      page: 1,
      filterPrice: 'default',
    },
  },
  reducers: {
    changePage: (state, action) => {
      state.filter.page = action.payload;
    },
    changeFilterPrice: (state, action) => {
      state.filter.filterPrice = action.payload;
    },
    updateSearchQuery(state, action) {
      state.searchQuery = action.payload; // Обновление строки поиска
  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { changePage, changeFilterPrice, updateSearchQuery } = productsSlice.actions;
export default productsSlice.reducer;
