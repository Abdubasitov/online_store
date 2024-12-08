import { clearCart } from "../cart/cart";

export const saveOrder = (orderData) => async (dispatch) => {
    try {
        const response = await fetch("http://localhost:8080/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
        });
        if (response.ok) {
            const data = await response.json();
            dispatch(clearCart()); // Очистить корзину
            alert("Заказ успешно сохранен!");
        } else {
            alert("Ошибка при сохранении заказа!");
        }
    } catch (error) {
        console.error("Ошибка при сохранении заказа:", error);
        alert("Ошибка при сохранении заказа!");
    }
};
