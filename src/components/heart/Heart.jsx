import React,{useEffect} from 'react'
import { store } from '../../redux/sotre'
import './heart.css'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { StarRounded } from '@material-ui/icons'
export const Heart = () => {
    const array = useSelector((item)=>{
       return item.like
    })
    useEffect(async()=>{
const data = axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=')
            .then(item=>{
            })    
},[array])
    return (
        <div className='heartComp menuContainer'>
            {
                array.map(item=>{
                    return(
                        <div className="foodBox heartFoodBox">
                            <div className="imgBox heartImgBox">
                            <img src={item.strMealThumb} alt={item.strMeal} style={{cursor:"pointer"}}/>             
                            </div>
                            <div>{

                                }</div>
                            {item.strMeal} 
                            </div>
                    )
                })
            }
        </div>
    )
}
