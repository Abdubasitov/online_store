import React, { useEffect } from 'react';
import { FaHeart, FaShoppingCart, FaMobileAlt, FaTshirt, FaHome, FaBabyCarriage, FaThLarge } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorites } from '../../Store/redusers/favorites/favorites';
import Pagination from '@mui/material/Pagination';
import { animateScroll as scroll } from 'react-scroll';
import FilterPrice from '../FilterPrice/FilterPrice';
import { addCart, removeCart } from '../../Store/redusers/cart/cart';
import { changePage, fetchBeatiful } from '../../Store/redusers/products/beatiful';

const Gadgets = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);
  const { data, status, filter } = useSelector(state => state.beatiful);
  const user = useSelector(state => state.user);
  const cart = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(fetchBeatiful(filter.filterPrice)); // Загружаем данные при изменении фильтра
  }, [filter.filterPrice, dispatch]);

  const handleFavoriteClick = (id) => {
    if (user !== 'success' && favorites.data) {
      dispatch(toggleFavorites(id));
    } else {
      console.log("Пользователь не авторизован или данные избранного не загружены");
    }
  };

  return (
    <div>
      <div className="container">
        <div className="conteiner_item">
        <div className="header-item">
            <NavLink to="/all">
            <FaThLarge size={30} color="#555" />
              <p>Все</p>
            </NavLink>
          </div>
          
        <div className="header-item">
            <NavLink to="/gadgets">
              <FaMobileAlt size={30} />
              <p>Электроника и гаджеты</p>
            </NavLink>
          </div>


          <div className="header-item">
            <NavLink to="/cloth">
              <FaTshirt size={30} />
              <p>Одежда и обувь</p>
            </NavLink>
          </div>

          <div className="header-item">
            <NavLink to="/interior">
              <FaHome size={30} />
              <p>Товары для дома и интерьера</p>
            </NavLink>
          </div>


          <div className="header-item">
            <NavLink to="/toys">
              <FaBabyCarriage size={30} />
              <p>Игрушки и детские товары</p>
            </NavLink>
          </div>
        </div>
        <div>
          <FilterPrice />
        </div>
        <div className="Item">
          {status === 'loading' ? (
            <h2>Loading...</h2>
          ) : (
            data.slice((filter.page - 1) * 8, filter.page * 8).map(item => (
              <div key={item.id} className="Item__col">
                    <NavLink to={`/product/${item.id}`}>
                      <img src={item.img} alt={item.name} className="Item__col-img" />
                      <h3 className="Item__col-name">{item.name}</h3>
                      <div className="Item__title">
                        <p className="Item__col-price">{item.price} сом</p>
                        <p className="Item__col-title">{item.title}</p>
                      </div>
                    </NavLink>
                                <div className="Item__actions">
                  <FaHeart
                    size={20}
                    className="favorites-icon"
                    onClick={() => handleFavoriteClick(item.id)}
                    style={{ color: favorites.data.includes(item.id) ? 'red' : 'black' }}
                  />
                 {
                                   (cart.data?.some(el => el.id === item.id)) ?
                                            <div className="catalog__cart">
                                                <button onClick={() => dispatch(removeCart(item.id))} className='catalog__minus'>-</button>
                                                <input
                                                    value={cart.data.find(el => el.id === item.id)?.count || 0} // Ensure count is safely retrieved
                                                    className="catalog__input"
                                                    type="text"
                                                    readOnly 
                                                />
                                                <button onClick={() => dispatch(addCart(item.id))} className='catalog__plus'>+</button>
                                            </div>
                                            :
                                             <FaShoppingCart onClick={() => dispatch(addCart(item.id))} size={20} className="shoping-icon" />
           }
                </div>
              </div>
            ))
          )}
        </div>
        <Pagination
          onChange={(event, page) => {
            dispatch(changePage(page));
            scroll.scrollToTop();
          }}
          page={filter.page}
          count={Math.ceil(data.length / 8)}
        />
      </div>
    </div>
  );
};

export default Gadgets;
