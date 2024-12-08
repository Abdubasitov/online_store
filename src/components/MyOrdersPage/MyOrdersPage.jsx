import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./MyOrdersPage.css"; // Добавим CSS файл

const MyOrdersPage = () => {
    const user = useSelector((state) => state.user);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Получаем заказы пользователя
        fetch(`http://localhost:8080/orders?userId=${user.id}`)
            .then((response) => response.json())
            .then((data) => setOrders(data))
            .catch((error) => console.error("Ошибка загрузки заказов:", error));
    }, [user.id]);

    if (orders.length === 0) {
        return <h1 className="no-orders">У вас пока нет заказов.</h1>;
    }

    return (
        <section className="conteiner">
            <h1 className="page-title">Мои заказы</h1>
            <ul className="orders-list">
                {orders.map((order) => (
                    <li key={`order-${order.id}`} className="order-item" id={`order-${order.id}`}>
                        <h2 className="order-title">Заказ #{order.id}</h2>
                        <p className="order-date">Дата: {new Date(order.date).toLocaleString()}</p>
                        <p className="order-address">Адрес доставки: {order.address}</p>
                        <p className="order-payment">Метод оплаты: {order.payment}</p>
                        <p className="order-total">Общая сумма: {order.total} сом</p>
                        <ul className="order-items">
                            {order.items.map((item) => (
                                <div key={`item-${item.id}`} className="order-item-card">
                                    <img className="item-image" src={item.img} alt={item.name} />
                                    <li id={`item-${item.id}`} className="item-details">
                                        <p>{item.name}</p>
                                        <p>
                                            {item.count} × {item.price} сом ={" "}
                                            <strong>{item.price * item.count} сом</strong>
                                        </p>
                                    </li>
                                </div>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default MyOrdersPage;
