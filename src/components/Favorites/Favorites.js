import React from 'react'
import { FaHeart, FaShoppingCart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toggleFavorites } from '../../Store/redusers/favorites/favorites'
import { Navigate } from 'react-router-dom'

const Favorites = () => {
  
  const dispatch = useDispatch()
  const favorites = useSelector((state) => state.favorites)
  const {data} = useSelector((state) => state.products)
  const {status} = useSelector((state) => state.user)

  const handleFavoriteClick = (id) => {

    dispatch(toggleFavorites(id))
  };

  if (status !== 'success') {
    return <Navigate to='/login'/>
  }
  const favoritesItem = data.filter(item => favorites.data.includes(item.id))
  return (
    <div>
       <div className='container'>
        
       {favoritesItem.length === 0
       ?
       <div className='container'>
       <h1>У вас нету избранных</h1>
       </div> :
        favoritesItem.map((item) =>  (
              <div key={item.id} className="Item__col">
                <img src={item.img} alt={item.img} className="Item__col-img" />
                <h2 className="Item__col-name">{item.name}</h2>
                <div className="Item__title">
                  <p className="Item__col-price">{item.price} сом</p>
                  <p className="Item__col-title">{item.title}</p>
                </div>
                <div className="Item__actions">
                  <FaHeart
                    size={20}
                    className="favorites-icon"
                    onClick={() => handleFavoriteClick(item.id)}
                    style={{ color:  favorites.data.includes(item.id) ? 'red' : 'black' }}
                  />
                  <FaShoppingCart size={20} className="shoping-icon" />
                </div>
              </div>
            )) 

          }
       </div>
    </div>
  )
}

export default Favorites