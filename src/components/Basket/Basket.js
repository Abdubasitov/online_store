import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addCart, deleteCartItem, removeCart } from '../../Store/redusers/cart/cart';
import { FaShoppingCart } from 'react-icons/fa';
import { Navigate, NavLink } from 'react-router-dom';
import './Basket.css';

const Basket = () => {
    const cart = useSelector(state => state.cart);
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();
    const { user, status } = useSelector((state) => state.user);

    if (status !== 'success') {
        return <Navigate to='/login' />;
    }

    const cartItems = products.data.filter(item => cart.data.some(el => el.id === item.id));

    // Вычисление итогов
    const calculateTotalPrice = (item) => {
        const cartItem = cart.data.find(el => el.id === item.id);
        return cartItem ? item.price * cartItem.count : 0;
    };

    const calculateGrandTotal = () => {
        return cartItems.reduce((total, item) => {
            const cartItem = cart.data.find(el => el.id === item.id);
            return total + (cartItem ? item.price * cartItem.count : 0);
        }, 0);
    };

    return (
        <section className='cart'>
            <div>
                {cartItems.length === 0 ? (
                    <div className="empty-cart">
                        <h1>Корзина пуста</h1>
                    </div>
                ) : (
                    <div>
                        {/* Хлебные крошки */}
                        <div className="breadcrumbs">Главная → Корзина</div>

                        {/* Заголовок корзины */}
                        <div className="cart-header">
                            <div>Товар</div>
                            <div>Цена</div>
                            <div>Количество</div>
                            <div>Всего</div>
                        </div>

                        {/* Список товаров */}
                        {cartItems.map((item) => {
                            const totalPrice = calculateTotalPrice(item); // Цена за один товар
                            return (
                                <div className="cart-item" key={item.id}>
                                
                                    <div className="product-info">
                                      <h5 onClick={() => dispatch(deleteCartItem(item.id))} className='delete'>x</h5>
                                        <img src={item.img} alt={item.name} />
                                        <span>{item.name}</span>
                                    </div>
                                    <div className="price">{item.price} сом</div>
                                    <div className="quantity">
                                        {cart.data.some(el => el.id === item.id) ? (
                                            <div className="catalog__cart">
                                                <button onClick={() => dispatch(removeCart(item.id))} className="catalog__minus">-</button>
                                                <input
                                                    value={cart.data.find(el => el.id === item.id)?.count || 0}
                                                    className="catalog__input"
                                                    type="text"
                                                    readOnly
                                                />
                                                <button onClick={() => dispatch(addCart(item.id))} className="catalog__plus">+</button>
                                            </div>
                                        ) : (
                                            <FaShoppingCart onClick={() => dispatch(addCart(item.id))} size={20} className="shopping-icon" />
                                        )}
                                    </div>
                                    <div className="total">{totalPrice} сом</div>
                                </div>
                            );
                        })}

                        {/* Итог */}
                        <div className="cart-summary">
                            <div>Итого: {calculateGrandTotal()} сом</div>
                        <NavLink to='/check'>
                            <button className="checkout-button">Оформить заказ</button>
                        </NavLink>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Basket;
