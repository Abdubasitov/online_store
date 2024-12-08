    import React, { useState } from 'react';
    import { FaHeart, FaLaptop, FaUser} from 'react-icons/fa';
    import './Header.css'; 
    import logo from '../assets/logo.webp';
    import { NavLink, Outlet, useNavigate } from 'react-router-dom';
    import Footer from '../Footer/Footer';
    import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton';
    import { useDispatch, useSelector } from 'react-redux';
    import { LogOut } from '../../Store/redusers/user/user';
    import Cart from '../Basket/Cart';
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import { updateSearchQuery } from '../../Store/redusers/products/products';


    const Header = () => {
        const user = useSelector((s) => s.user);
        const dispatch = useDispatch();
        const [query, setQuery] = useState("");
        const navigate = useNavigate();

        const handleSearch = () => {
            dispatch(updateSearchQuery(query)); // Сохраняем запрос в Redux
            navigate('/all'); // Переход на страницу поиска
        };
        return (
            <div>
                <div className="header-container">
                    <div className="header-item">
                        <NavLink to='/' >
                            <img src={logo} alt="Логотип"/>
                        </NavLink>
                    </div>
                    <div className="search-section">
                        <input 
                            type="text" 
                            placeholder="Искать на Ozon" 
                            className="search-input"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button 
                            className="search-button" 
                            onClick={handleSearch}
                        >🔍</button>
                    </div>
                    <div className="header-item">
                        <NavLink to='/all' >
                            <FaLaptop size={30} />
                            <p>Категории</p>
                        </NavLink>
                    </div>
                            <div className='header-item'>


    {user.status === 'success' ? (
        <div>
            <FaUser size={24} />
            <p  onClick={() => dispatch(LogOut())}>Выйти</p>
        </div>
    ) : (
        <NavLink to='/login'>
            <FaUser size={24} />
            <p>Войти</p>
        </NavLink>
    )}

                            </div>

                            <div className='header-item'>
                        <NavLink to='/order'>
                        <FontAwesomeIcon icon={faReceipt} className='icon' />
                            <p>Мои заказы</p>
                        </NavLink>

                            </div>


                    <div className="header-item">
                        <NavLink to='/favorites'>
                            <FaHeart size={30} />
                            <p>Избраное</p>
                        </NavLink>
                    </div>
                </div>

                    {/* Иконка корзины */}
                                <div className="cart-icon">
                        <NavLink to='/basket'>
                            <Cart size={75}/>
                        </NavLink>
                    </div>
                    <Outlet />
                <ScrollToTopButton />
                <Footer />

            </div>
        );
    };

    export default Header;
