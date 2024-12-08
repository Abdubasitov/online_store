import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { addCart, removeCart } from '../../Store/redusers/cart/cart';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { toggleFavorites } from '../../Store/redusers/favorites/favorites';
import './ProductPage .css'

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const product = data.find((item) => item.id === parseInt(id));


  const handleFavoriteClick = (id) => {
    dispatch(toggleFavorites(id));
  };

  if (!product) {
    return <h2>Продукт не найден</h2>;
  }

  return (
    <div>

    <div className="container">
     
      <div className="row">
      <div className='Item'>
        <div className="conteiner_img">
        <img src={product.img} alt={product.name} className="Item__col-img" />
        </div>

        <div className='conteiner_title'>
        <h4 className='row_name'>{product.name}</h4>
        <h6 className='row_title'>{product.title}</h6>
    
        </div>
        <div>
<div className='conteiner_row'>
        <p className='row_price'>{product.price} сом</p>
<div className='row_icons'>
        <FaHeart
                        size={20}
                        className="favorites-icon"
                        onClick={() => handleFavoriteClick(product.id)}
                        style={{ color: favorites.data.includes(product.id) ? 'red' : 'black' }}
                      />
                      {cart.data?.some(el => el.id === product.id) ? (
                        <div className="catalog__cart">
                          <button onClick={() => dispatch(removeCart(product.id))} className='catalog__minus'>-</button>
                          <input
                            value={cart.data.find(el => el.id === product.id)?.count || 0}
                            className="catalog__input"
                            type="text"
                            readOnly 
                          />
                          <button onClick={() => dispatch(addCart(product.id))} className='catalog__plus'>+</button>
                        </div>
                      ) : (
                        <FaShoppingCart
                          onClick={() => dispatch(addCart(product.id))}
                          size={20}
                          className="shoping-icon"
                        />
                      )}
                      </div>

                      </div>
                      <button onClick={() => navigate(-1)} className="back_button">← Назад</button>
                      </div>
                      </div>
      </div>

    </div>

    </div>
  );
};

export default ProductPage;
