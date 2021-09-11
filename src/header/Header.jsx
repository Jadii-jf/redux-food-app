import React,{useRef} from 'react'
import './header.css'
import { Router,Link } from 'react-router-dom'
import {store} from '../redux/sotre'
import {Face, FavoriteBorder, LocalDining,Search, ShoppingCart} from '@material-ui/icons'
export const Header = () => {
    const refCart = useRef(null)
    const refHeart =useRef(null)
    store.subscribe(()=>{
        refHeart.current.innerHTML = store.getState().like.length;
        refCart.current.innerHTML=store.getState().cart.length;
    })

    return (
        <div className="header">
            <div className="headerWrapper">
                <Link to="/">
            <h1 className="headerLogo">
            <span><LocalDining className="dining"/></span>
            <span>G</span>ree()!()      
            </h1> 
            </Link> 
            <div className="searchBox">
                <input type="text" placeholder="search"/>
                <Search className='searchLogo'/>
            </div>
            <div className="logBox">
                <h3>Junaid Hussain</h3>
                <button><div></div>Login</button>
                <button><div></div>Logout</button>
            </div>
            <div className="cartBoxIcon">
            <Link to='/heart' className="heartA"><span ref={refHeart}>0</span><FavoriteBorder/></Link>
           <Link to='/cart' className="cartA" ><span ref={refCart}>0</span><ShoppingCart className="cartIcon" value="1"/></Link> 
            </div>
            </div>
      
        </div>
    )
}
