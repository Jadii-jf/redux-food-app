import { Add, Remove } from '@material-ui/icons';
import React from 'react'
import './quantity.css'
import { connect,useSelector } from 'react-redux'
import { actCounter } from '../../redux/action/action';
import { store } from '../../redux/sotre';




 const Quantity = (props) => {
    return (
        <div className="quantity">
            <button onClick={()=>props.decrement(props.obj)}><Remove/></button>
            <div>{props.obj.count}</div>
            <button onClick={()=>props.increment(props.obj)}><Add/></button>
        </div>
    )
}
const mapStateToProps = state=>{
    return{
value:state,
    }
}
const mapDispatchToProps = dispatch=>{
    return{
        increment:(obj)=> {
            ++obj.count;
            obj.incre='incre';
            obj.price+=obj.orignalPrice;
            dispatch({type:"TOTAL",payload:{totalPrice:obj.orignalPrice,add:"add"}});
            dispatch({type:'CART',payload:obj})
            },
        decrement:(obj)=> {
            --obj.count;
            obj.incre='incre';
            obj.price-=obj.orignalPrice;
              dispatch({type:"TOTAL",payload:{totalPrice:obj.orignalPrice,minus:'minus'}});
             dispatch({type:'CART',payload:obj})
            }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Quantity)
