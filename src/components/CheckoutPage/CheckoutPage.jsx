import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom"; // Импортируем useNavigate
import { clearCart } from "../../Store/redusers/cart/cart"; // Импортируем действие для очистки корзины
import "./CheckoutPage.css";
import { saveOrder } from "../../Store/redusers/order/order";

const CheckoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Хук для навигации
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);
    const products = useSelector((state) => state.products);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        delivery: "courier",
        payment: "card",
    });
    
    const [isCardModalOpen, setIsCardModalOpen] = useState(false); // Состояние для модального окна
    const [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        expirationDate: "",
        cvv: "",
    });

    if (!user || user.status !== "success") {
        return <Navigate to="/login" />;
    }

    const cartItems = products.data.map(product => {
        const cartItem = cart.data.find(el => el.id === product.id);
        return cartItem ? { ...product, count: cartItem.count } : null;
    }).filter(Boolean);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCardInputChange = (e) => {
        setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Формируем данные заказа
        const orderData = {
            userId: user.id, // ID пользователя
            items: cartItems.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                count: item.count,
                img: item.img
            })),
            total: cartItems.reduce((total, item) => total + item.price * item.count, 0),
            delivery: formData.delivery,
            payment: formData.payment,
            address: formData.address,
            date: new Date().toISOString(), // Дата оформления заказа
        };
    
        // Если оплата картой, сначала показываем модальное окно
        if (formData.payment === "card") {
            setIsCardModalOpen(true);
        } else {
            // Сохраняем заказ сразу, если оплата наличными
            await dispatch(saveOrder(orderData)); // Сохраняем заказ в базу
            navigate("/all"); // Переход на страницу "Мои заказы"
        }
    };
    
    const handlePaymentChange = (e) => {
        setFormData({ ...formData, payment: e.target.value });
    };

    const handleCardModalClose = () => {
        setIsCardModalOpen(false); // Закрыть модальное окно
    };

    const handleCardDetailsSubmit = async (e) => {
        e.preventDefault();
        // Проверка, что все данные карты заполнены
        if (!cardDetails.cardNumber || !cardDetails.expirationDate || !cardDetails.cvv) {
            alert("Пожалуйста, заполните все поля карты!");
            return;
        }
    
        // Формируем данные заказа
        const orderData = {
            userId: user.id,
            items: cartItems.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                count: item.count,
                img: item.img,
            })),
            total: cartItems.reduce((total, item) => total + item.price * item.count, 0),
            delivery: formData.delivery,
            payment: "card", // Оплата картой
            address: formData.address,
            date: new Date().toISOString(),
        };
    
        try {
            await dispatch(saveOrder(orderData)); // Сохраняем заказ
            setIsCardModalOpen(false); // Закрыть модальное окно
            dispatch(clearCart()); // Очистить корзину
            navigate("/all"); // Перейти на страницу заказов
            alert("Заказ успешно оформлен!");
        } catch (error) {
            console.error("Ошибка оформления заказа:", error);
            alert("Ошибка при оформлении заказа!");
        }
    };
    

    return (
        <section className="checkout-page">
            <button onClick={() => navigate(-1)} className="back_button">← Назад</button>

            <h1>Оформление заказа</h1>
            <form onSubmit={handleSubmit} className="checkout-form">
                {/* Данные пользователя */}
                <div className="checkout-section">
                    <h2>Ваши данные</h2>
                    <label>
                        Имя:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Телефон:
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Адрес доставки:
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>

                {/* Метод доставки */}
                <div className="checkout-section">
                    <h2>Способ доставки</h2>
                    <label>
                        <input
                            type="radio"
                            name="delivery"
                            value="courier"
                            checked={formData.delivery === "courier"}
                            onChange={handleInputChange}
                        />
                        Курьер
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="delivery"
                            value="pickup"
                            checked={formData.delivery === "pickup"}
                            onChange={handleInputChange}
                        />
                        Самовывоз
                    </label>
                </div>

                {/* Способ оплаты */}
                <div className="checkout-section">
                    <h2>Способ оплаты</h2>
                    <label>
                        <input
                            type="radio"
                            name="payment"
                            value="card"
                            checked={formData.payment === "card"}
                            onChange={handlePaymentChange}
                        />
                        Банковская карта
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="payment"
                            value="cash"
                            checked={formData.payment === "cash"}
                            onChange={handlePaymentChange}
                        />
                        Наличные
                    </label>
                </div>

                {/* Итоговая информация */}
                <div className="checkout-summary">
                    <h2>Итого</h2>
                    <p>Товары в корзине:</p>
                    <ol>
                        {cartItems.map((item) => (
                            <li key={item.id}>
                                {item.name} × {item.count} = {item.price * item.count} сом
                            </li>
                        ))}
                    </ol>
                    <p>
                        <strong>Общая сумма:</strong>{" "}
                        {cartItems.reduce((total, item) => total + item.price * item.count, 0)} сом
                    </p>
                </div>

                <button
                    type="submit"
                    className="checkout-button"
                >
                    Оформить заказ
                </button>
            </form>

            {/* Модальное окно для ввода данных карты */}
            {isCardModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Введите данные вашей карты</h3>
                        <form onSubmit={handleCardDetailsSubmit}>
                            <label>
                                Номер карты:
                                <input
                                    type="text"
                                    name="cardNumber"
                                    placeholder="1234 5678 9012 3456"
                                    value={cardDetails.cardNumber}
                                    onChange={handleCardInputChange}
                                    required
                                />
                            </label>
                            <label>
                                Срок действия:
                                <input
                                    type="text"
                                    name="expirationDate"
                                    placeholder="MM/YY"
                                    value={cardDetails.expirationDate}
                                    onChange={handleCardInputChange}
                                    required
                                />
                            </label>
                            <label>
                                CVV:
                                <input
                                    type="text"
                                    name="cvv"
                                    placeholder="123"
                                    value={cardDetails.cvv}
                                    onChange={handleCardInputChange}
                                    required
                                />
                            </label>
                            <button type="submit" className="modal-button">Подтвердить</button>
                        </form>
                        <button className="modal-close" onClick={handleCardModalClose}>Закрыть</button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default CheckoutPage;
