export const actCategory = (arg)=>{
const array=arg.filter(item=>item.food!==arg[0].food)
return {
       type:'CATEGORY',
       payload:{
            foodName:arg[0].food,
      foodArray:array,
      flage:true, 
       }
     
   }
}
export const actArea = (arg) =>{
    const array=arg.filter(item=>item.food!==arg[0].food)
return {
    type:'AREA',
    payload:{
           foodArray:array,
    foodName:arg[0].food,
    flage:true,
    }
 
}
}
export const cart=(data)=>{
    data.orignalPrice=data.price;
      return {...data,count:0};
    }
export const actCounter = arg=>{
    return {
        type:'COUNTER',
        payload:{
           counter:arg  
        }
       
    }
}