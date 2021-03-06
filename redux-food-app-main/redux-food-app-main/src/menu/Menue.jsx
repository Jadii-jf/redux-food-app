import React,{useRef,useState,useEffect} from 'react'
import {store} from '../redux/sotre'
import styled from 'styled-components'
import './menu.css'
import { useSelector,connect } from 'react-redux'
import { FoodItem } from '../components/FoodItem/FoodItem'
import { actCategory,cart } from '../redux/action/action'
import { sortFunction } from './sortFunction'
import Quantity from '../components/quantity/Quantity'
import { FavoriteBorder, StarRate } from '@material-ui/icons'
import { Link } from 'react-router-dom'
const Button = styled.button`
background: transparent;
    border-radius: 3px;
    cursor: pointer;
    border: 2px solid palevioletred;
    color: palevioletred;
    margin: 0 1em;
    padding: 0.4em 1em;
    font-size: 1.1em;
    font-family: cursive;
    background: palevioletred;
    color: white;

${props =>
    props.primary &&
`
      background: palevioletred;
      color: white;
    `};
`
 const Menue = (props) => {
const[count , setCount] =useState([0,1,2,3,4,5,]);
     let id=0;
     const arrayCheck = [];
     let i=0;

const ratingFunc=(index)=>{
console.log(index);
}
if(store.getState().foodArray.length===0)
{


     (async()=>{
            console.log(store.getState().foodArray)
          const resp = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood')           
             const data = await resp.json();
         console.log(store.getState().foodChange)
         data.meals.unshift({food:"Seafood"});
         data.meals.map(item=>{
                store.getState().cart.map(num=>{
                       if(num.strMeal===item.strMeal)
                       {
                           item.button=false;
                       }
                      
                   })
            item.id=++id;
            if(item.button!=false)
            {
            item.button=true;     
            }   
            item.price=Math.floor(Math.random() * 30) + 1;
        })
         store.dispatch(actCategory(data.meals));
    })();
}
  const {foodArray:array,foodName}  = useSelector((item)=>{
 
  if(item.flage)  
  {      
    return item;
}
else{
    return {array:null,food:null}
}
   })
 
   const handleClick = (item)=>{
store.dispatch({type:'RECIPE',payload:item})
   }
    return (
        <div  className="menu">
            <div className="menuHeaderBox">
                 <h1 >{foodName}</h1>
             <button className="sortBtn" style={{cursor:'pointer'}}>Sort</button>
            </div>
           
            <div className="menuContainer">
            {
           array &&
    
          array.map(item=>{
          return (
              <div key={item.id} className="foodBox">
                  <div className="imgBox">
                 <FavoriteBorder className="menuHeart" onClick={()=>props.like(item)}/>   
                <Link to='/recipe'> <button className="imgBoxBtn" onClick={()=>handleClick(item)}>Recipe</button>   </Link>
           <img src={item.strMealThumb} alt={item.strMeal} style={{cursor:"pointer"}}/>             
                  </div>

                  <div className="nameBox">
          <p className='price'>{item.price}$</p>
          <p className='text'>{item.strMeal}</p>
                  </div>
                  <div className="rating">
                {
                    count.map((item,index)=>{
                        return <StarRate style={{cursor:'pointer'}} onClick={(e)=>{
                            ratingFunc(index);
                        }}/>
                    })
                }
                    </div>
       
 {  
item.button ?<Button primary 
onClick={    
    ()=>{ 
        item.button=false;
      return props.func(item)
        }
   }>Add to cart
</Button>: store.getState().cart.map(num=>{
    if(num.strMeal===item.strMeal)
    {
        return <Quantity obj={num}/>
    }
})
    }
                 </div>
          )
       })  
    }

            </div>
        </div>
    )
}




const mapStateToProps = state=>{
    return {
        value:state,
    }
}

const mapDispatchTOProps = dispatch=>{
    return {
        like:(item=>dispatch({type:'LIKE',payload:item})),
        func:(item)=> dispatch({type:'CART',payload:cart(item)})
    }
}
export default connect(mapStateToProps,mapDispatchTOProps)(Menue)
