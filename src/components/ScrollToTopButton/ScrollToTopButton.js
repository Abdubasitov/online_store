import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa'; // Иконка стрелки вверх из React Icons
import './ScrollToTopButton.css';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Показать кнопку, когда страница прокручена вниз на 300px
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Прокрутка вверх при нажатии
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Плавная прокрутка
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        isVisible && (
            <div className="scroll-to-top" onClick={scrollToTop}>
                <FaArrowUp size={20} />
            </div>
        )
    );
};

export default ScrollToTopButton;
