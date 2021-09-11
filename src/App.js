import React from 'react'
import { Header } from './header/Header'
import "./app.css"
import Cart from './cart/Cart'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { LeftSidebar } from './leftSidebar/LeftSidebar'
import  Menue from './menu/Menue'
import { Heart } from './components/heart/Heart';
export const App = () => {
    return (
        <div className="app">
        <Router>
        <Header/>
        <Switch>
        <Route exact path='/'>
          <LeftSidebar/>
        <Menue/>       
        </Route>
        <Route path="/cart">
          <Cart/>
        </Route>
         <Route path='/heart'>
           <Heart/>
         </Route>
        </Switch>
        </Router>
       
        </div>
    )
}
