import React,{useEffect,useState} from 'react'
import { store } from '../../redux/sotre'
import './heart.css'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { SearchOutlined, ShoppingCartOutlined, StarRounded } from '@material-ui/icons'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
const Info=styled.div`
opacity:0;
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
background-color: rgba(0, 0, 0, 0.2);
z-index: 3;
display: flex;
align-items: center;
justify-content: center;
transition: all 0.5s ease;
cursor: pointer;

`
const Image = styled.div`
&:hover ${Info}{
    opacity: 1;
  }
`
const FoodName = styled.h1`
    font-size: 20px;
    font-weight: 300;
    text-align: center;
`
const Title = styled.h1`
text-align: center;
color: gray;
font-weight: 500;
`
const Icon=styled.div`
width: 40px;
height: 40px;
border-radius: 50%;
background-color: white;
display: flex;
align-items: center;
justify-content: center;
margin: 10px;
transition:all 0.5s ease;
&:hover{
    background-color:#e9f5f5;
    transform:scale(1.1);
}
`

export const Heart = () => {

    let array = useSelector((item)=>{
   return item.like
    })
   
  const handleClick = (name)=>{
      if(name==='cart')
      {
      }
      else{
          const filter = array.filter(item=>item.strMeal!==name)
        store.dispatch({type:'FILTER_LIKE',payload:filter});
          
      }
  }

    return (
        <div className='heartComp '>
<Title>Favourite Meal</Title>
           <div className="menuContainer">      
                    {
                 
                    array &&
                array.map(item=>{
                    return(
                        <div className="foodBox heartFoodBox">
                            <Image className="imgBox heartImgBox">
                            <img src={item.strMealThumb} alt={item.strMeal} style={{cursor:"pointer"}}/>             
         <Info>
          <Icon>
          <Link to="/cart" onClick={()=>handleClick('cart')}><ShoppingCartOutlined /></Link>
          </Icon>
          <Icon>
          <Link to="/product"><SearchOutlined/></Link>
          </Icon>
        </Info>
                            </Image>
                            <div>{

                                }</div>
                           <FoodName> {item.strMeal} </FoodName>
                            <i class="fa fa-heartbeat" aria-hidden="true" onClick={()=>handleClick(item.strMeal)}></i>
                            </div>
                    )
                })
            }
            </div>
        </div>
    )
}
