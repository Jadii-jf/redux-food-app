import React,{useState,useEffect,useDispatch} from 'react'
import './leftSidebar.css'
import { fetchCategory,fetchArea } from '../dummyData';
import {store} from '../redux/sotre';
import * as type from '../redux/actionType/actionType'
import {fetchUser} from '../redux/sotre'



const fetchData = async(arg)=>
{
const resp = await fetch(`https://${arg}`);
const data = await resp.json();
return data;
}    


const Api ={
        area:'www.themealdb.com/api/json/v1/1/list.php?a=list',
        category:"www.themealdb.com/api/json/v1/1/categories.php"
    }

    
export const LeftSidebar = () => {
    let id=0;
    const [state, setState] = useState(()=>{return null});

    useEffect(async()=>{
        console.log('junaid');
  const resp = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const data = await resp.json();
setState(data.categories)
    },[])


    return (
        <div className='leftSidebar'>
            <h1>FILTER</h1>
            <div className="filterBox">
                <button onClick={(e)=>{
                    fetchData(Api.area).then(item=>{
                               setState(item.meals)
                    })
                   }}>area</button>
                <button onClick={(e)=>{
                   fetchData(Api.category).then(item=>{
                       setState(item.categories)
                   })
                   
                    }}>category</button>
            </div>
           {
           state && 
           <ul>
           {    
           
           state.map(item=>{
               if(state.length===27)
               {
                   item.id=++id;
                 return (<li key={item.id}><a href="#" 
                 onClick={()=>{
                     store.dispatch(fetchArea(item.strArea))}
                    } type="area">{item.strArea}</a></li>)
               } 
               
               else{
               return (<li key={item.idCategory}><a href="#" 
               onClick={()=>{
                   store.dispatch(fetchCategory(item.strCategory));
               }} type="category">{item.strCategory}</a></li>)
               }
               })}

            

            </ul>
            }
        </div>
    )
}
