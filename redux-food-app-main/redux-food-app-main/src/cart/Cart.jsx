import React from 'react'
import { connect } from 'react-redux'
import Quantity from '../components/quantity/Quantity'
import './cart.css'
 const Cart = ({func,delItem,value,delAllItem}) => {
        let id=0;
    return (
        <div className="cart">
            <table id="products">
                <thead id='headTable'>
                    <tr >
                        <th>
                            Id
                        </th>
                    <th>
                        Product
                    </th>
                    <th>
                        Quantitiy
                    </th>
                    <th>
                        Price
                    </th>
                    <th>
                        TotalPrice
                    </th>
                    <th>
                        item
                    </th>
                </tr> 
                </thead>
                <tbody>
                    {
                    value.cart.map(item=>{
                        item.num=++id;
                        console.log(item)
                        return(
                            <tr key={id}>
                                <td>
                                   {item.num}
                                </td>
                                <td>
                                    {item.strMeal}
                                </td>
                                <td> 
                                <Quantity obj={item}/>
                                </td>
                                <td>
                                    {item.orignalPrice}$
                                </td>
                                <td>
                                    {item.price}$
                                </td>
                                <td>
                                <button className="cartRemove" onClick={()=>delItem(item)}>Remove</button>
                                </td>

                            </tr>
                        )
                    })
                } 
                </tbody>
                <tfoot>
                    <tr>
                        <td>

                        </td>
                        <td>
                            Total
                        </td>
                        <td>

                        </td>
                        <td>

                        </td>
                        <td>
                            {value.totalPrice}$
                        </td>
                        <td>
                        <button className="cartRemoveAll" onClick={()=>delAllItem({})}>Remove all</button>
                        </td>
                    </tr>
                </tfoot>
         
               
            </table>
        </div>
    )
}
const mapStateToProps = state=>{
    return{
        value:state,
    }
    }
    const mapDispatchToProps = dispatch=>{
        return {
            func:()=>{
                dispatch({name:'juanid'})
            },
            delItem:(obj)=>{
                obj.removeItem='remove';
                dispatch({type:'CART',payload:obj})
            },
            delAllItem:(obj)=>{
                obj.removeItem='removeAll';
                dispatch({type:'CART',payload:obj});
            }
        }
    }
export default connect(mapStateToProps,mapDispatchToProps)(Cart);