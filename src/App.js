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
import {Announcemnt} from './components/Announcemnt'
import { Heart } from './components/heart/Heart';
import { Recipe } from './components/recipe/Recipe';
export const App = () => {
    return (
        <div className="app">
        <Router>
          <Announcemnt/>
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
         <Route path='/recipe'>
           <Recipe/>
         </Route>
        </Switch>
        </Router>
       
        </div>
    )
}
