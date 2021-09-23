import { checkValue } from '../../dummyData';
import * as type from '../actionType/actionType';
import { store } from '../sotre';
const redux = require('redux')
export const applyMiddleware = redux.applyMiddleware;
const initialState={
    foodArray:[],
    foodName:'',
    flage:false,
    button:true,
    signal:true,
    totalPrice:0,
    like:[],
    cart:[],
    recipe:{strMeal:"Arrabiata"}
  }
export const Reducer = (state=initialState,{type,payload})=>{
   let flage=false;
   let likeFlage=false;
    switch(type){
       
        case "CATEGORY":
        return {...state,foodArray:payload.foodArray,foodName:payload.foodName,flage:payload.flage};
       break;
             case 'AREA':  
           
             return {...state,foodArray:payload.foodArray,foodName:payload.foodName,flage:payload.flage};
       break;
            case type.COUNTER:       
              return {...state,counter:payload.counter}     
            case "CART":   
             if(payload.removeItem==='remove'||payload.removeItem==='removeAll')
              {
                 if(payload.removeItem==='remove')
                {            
                     const filterItem=state.cart.filter((item)=>item.strMeal!==payload.strMeal);
                state.totalPrice-=payload.price;
                return {...state,cart:filterItem};  
                }
                else{
                    return{...state,totalPrice:0,cart:[]};
                }
             
               }
               else {    
        
               for(let i=0;i<state.cart.length;i++)
               {
                 
                 if(payload.strMeal===state.cart[i].strMeal)
                 {
                     if(payload.incre==='incre')
                     {
                         flage=true;

                     }
                  else { 
                       flage=true;
                       state.totalPrice+=payload.price;
                     state.cart[i].count=++state.cart[i].count;
                     state.cart[i].price+=payload.price;
                 }
             }
             }
             if(!flage) {
                 ++payload.count;
                 state.totalPrice+=payload.price;
               return {...state,cart:[...state.cart,payload]};  
             }
            }
            
         case "TOTAL":
           if(type==='TOTAL') 
           {
               let total=0;
               if(payload.add==='add')
               {              

               state.totalPrice+=payload.totalPrice;
               }
               else if(payload.minus==='minus')
               {
                   state.totalPrice-=payload.totalPrice;
               }
               total=state.totalPrice;
          return {...state,totalPrice:total}; 
        }          
        case "LIKE":
          likeFlage = checkValue(state.like,payload);
          if(!likeFlage)
          {
          return {...state,like:[...state.like,payload]}            
          }
          else{
            return {...state};
          }
          case "FILTER_LIKE":
            return {...state,like:payload};
          case "RECIPE":
            return{...state,recipe:payload};
        default :
        return state;
}
}
