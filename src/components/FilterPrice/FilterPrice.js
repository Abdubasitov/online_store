import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilterPrice, changePage } from '../../Store/redusers/products/products';

const FilterPrice = () => {
  const { filter } = useSelector((state) => state.products); // Доступ к состоянию filter
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(changeFilterPrice(event.target.value)); // Обновляем порядок фильтрации
    dispatch(changePage(1)); // Сбрасываем на первую страницу
  };

  return (
    <div className="containerFilter">
      <label className="titlePrice">Сортировка:</label>
      <select
        value={filter.filterPrice}
        onChange={handleChange}
        className="filterPrice"
      >
        <option value="default">По умолчанию</option>
        <option value="asc">По возрастанию цены</option>
        <option value="desc">По убыванию цены</option>
      </select>
    </div>
  );
};

export default FilterPrice;
