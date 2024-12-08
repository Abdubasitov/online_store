import React, { useState, useEffect } from 'react';
import img from '../assets/img.webp';
import advertising from '../assets/adversiting.webp';
import product_1 from '../assets/1.webp'
import product_2 from '../assets/2.webp'
import product_3 from '../assets/3.webp'
import product_4 from '../assets/4.webp'
import product_5 from '../assets/5.webp'
import './Home.css';
import { NavLink, Outlet } from 'react-router-dom';

import axios from 'axios';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [movies, setMovies] = useState([]);
  const [product, setProduct] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState({}); 

  const images = [
    'https://static.insales-cdn.com/files/1/8032/36388704/original/iPhone_15_1.jpg',
    'https://karapuzov.com.ua/image/cache/adaptive/catalog/blog/2020-November/igrushki-malyshey/igrushki-karapuzov-1280x720.jpg',
    'https://img.freepik.com/free-vector/flat-minimal-makeup-artist-social-media-post-template_23-2149361077.jpg',
    'https://mmr.ua/uploaded/materials/62fcac2488.jpg'
  ];
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    axios('http://localhost:8080/products')
      .then((res) => setMovies(res.data[0].first))
      .catch((error) => console.error('Ошибка при загрузке данных:', error));

    const savedFavorites = JSON.parse(localStorage.getItem('favoriteItems')) || {};
    setFavoriteItems(savedFavorites);
  }, []);

  const handleFavoriteClick = (id) => {
    const updatedFavorites = {
      ...favoriteItems,
      [id]: !favoriteItems[id],
    };

    setFavoriteItems(updatedFavorites);

    localStorage.setItem('favoriteItems', JSON.stringify(updatedFavorites));
  };
  useEffect(() => {
    axios('http://localhost:8080/products')
      .then((res) => setProduct(res.data[0].second))
      .catch((error) => console.error('Ошибка при загрузке данных:', error));

    const savedFavorites = JSON.parse(localStorage.getItem('favoriteItems')) || {};
    setFavoriteItems(savedFavorites);
  }, []);



  return (
    <div className='conteiner_home'>
      <img src={img} className='Advertising' alt="Main" />

      <div className="container">
        <div className="Item">
          {movies.length > 0
            ? movies.map((item) => (
                <div key={item.id} className="Item__col">
                  <img src={item.img} alt={item.img} className="Item__col-img" /> {/* Изображение товара */}
                  <h2 className='Item__col-name'>{item.name}</h2> {/* Название товара */}
                  <div className='Item__title'>
                    <p className='Item__col-price'>{item.price} сом</p> {/* Цена товара */}
                    <br></br>
                    <p className='Item__col-title'>{item.title}</p> {/* Описание товара */}
                  </div>
                  <div className="Item__actions">
                    {/* Иконка избранного с обработкой нажатия */}
                    <FaHeart 
                      size={20} 
                      className="favorites-icon"
                      onClick={() => handleFavoriteClick(item.id)} // Изменяем состояние при клике
                      style={{ color: favoriteItems[item.id] ? 'red' : 'black' }} // Меняем цвет иконки
                    />
                    <FaShoppingCart size={20} className='shoping-icon' />
                  </div>
                </div>
              ))
            : <p>грузится...</p>
          }
        </div>
      </div>

      <div className="slider-container">
        <div className="slide">
          <img src={images[currentSlide]} alt={`Slide ${currentSlide + 1}`} />
        </div>
      </div>


      <div className="container">
        <div className="Item">
          {product.length > 0
            ? product.map((item) => (
                <div key={item.id} className="Item__col">
                  <img src={item.img} alt={item.img} className="Item__col-img" /> {/* Изображение товара */}
                  <h2 className='Item__col-name'>{item.name}</h2> {/* Название товара */}
                  <div className='Item__title'>
                    <p className='Item__col-price'>{item.price} сом</p> {/* Цена товара */}
                    <br></br>
                    <p className='Item__col-title'>{item.title}</p> {/* Описание товара */}
                  </div>
                  <div className="Item__actions">
                    {/* Иконка избранного с обработкой нажатия */}
                    <FaHeart 
                      size={20} 
                      className="favorites-icon"
                      onClick={() => handleFavoriteClick(item.id)} // Изменяем состояние при клике
                      style={{ color: favoriteItems[item.id] ? 'red' : 'black' }} // Меняем цвет иконки
                    />
                    <FaShoppingCart size={20} className='shoping-icon' />
                  </div>
                </div>
              ))
            : <p>грузится...</p>
          }
        </div>
      </div>

      <img src={advertising} className='Advertising' alt="Advertising" />

      <div className='Conteiner_products'>
        <div className="container_products_wrap">
        <NavLink to='/gadgets' >
          <img src={product_1}/>
      </NavLink>
 
      <NavLink to='/cloth' >
          <img src={product_2}/>
      </NavLink>
 
      <NavLink to='/beuty' >
          <img src={product_3}/>
      </NavLink>
 
      <NavLink to='/interior' >
          <img src={product_4}/>
      </NavLink>
       
      <NavLink to='/toys' >
          <img src={product_5}/>
      </NavLink>
        </div>

      </div>
      <Outlet />
    </div>
  );
};

export default Home;
