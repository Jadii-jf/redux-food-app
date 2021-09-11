import { store } from "./redux/sotre"
import { actArea,actCategory } from "./redux/action/action"
import axios from "axios";

export const Apis={
    area:'https://www.themealdb.com/api/json/v1/1/list.php?a=list',
    food:`https://www.themealdb.com/api/json/v1/1/filter.php?a=`
}
let id=0;
export const fetchCategory = (arg)=>{
    return  dispatch =>{
       axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${arg}`)
       .then(item=>{
           item.data.meals.unshift({food:arg});
           
          item.data.meals.map(item=>{
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
           dispatch(actCategory(item.data.meals))
       })
}
}


export const fetchArea = (arg)=>{
    return dispatch=>{
       axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${arg}`)
       .then(item=>{
        item.data.meals.unshift({food:arg});
        item.data.meals.map(item=>{
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
           dispatch(actArea(item.data.meals))
       })
    }
}

export const checkValue = (array,payload)=>{
    if(array.length===0) return false;
    for(let i=0;i<array.length;i++)
    {
        if(array[i].strMeal===payload.strMeal)
        {
            return true;
        }
    }
}