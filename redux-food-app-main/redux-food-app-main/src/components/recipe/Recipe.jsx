import React, { useEffect,useState } from 'react'
import styled from 'styled-components'
import {store} from '../../redux/sotre'
import {  } from 'react-redux'
import axios from 'axios'
import './recipe.css'
const Container = styled.div`
position: relative;
top: 37px;
margin: 20px;
`
const Wrapper = styled.div`
`
const ImgBox = styled.div`
`
const Image = styled.img`
width: 100%;
height: 70%;
display: block;
object-fit: cover;
`
const InfoContainer = styled.div`
flex:1;
`
const Desc = styled.p`
`
const ImgContainer = styled.div`
`
const ImageTitle = styled.h1`
max-width: 1000px;
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%,-50%);
opacity: 0;
color: #f5eded;
`
const ClipElement = styled.div`
    clip-path: circle(180vh at 47% -94vh);
    height: 87vh;
    width: 100%;
    background-image: url(${props=>props.img});
    background-size: cover;
    background-position: center;
    position: relative;
    transition: all 0.5s ease;
&:hover ${ImageTitle} {
opacity:1;
}
    `

const ImageHover = styled.div`
position: absolute;
width: 100%;
height: 100%;
top: 0;
transition: all 0.5s ease;
left: 0;
clip-path: circle(180vh at 47% -94vh);
 
&:hover{
    opacity:0.2;
    background: linear-gradient(to bottom, #f3b167, #ec38bc, #7303c0, #03001e);
}
`
const IngredientsWrapper = styled.div`
    width: 100%;
    margin-bottom:20px;
    margin-top: 20px;
`
const IngredientsTitle = styled.h1`
text-align:center;
color:#655d5d;
`
const IngredientsBox = styled.div`
display:flex;
justify-content:center;
`
const IngSmBox = styled.div`
    display: block;
    padding: 20px;
    text-align: center;
    color:gray;
    `
const IngBoxMove = styled.div`
`
const InstructionWrapper = styled.div`
margin-bottom: 20px;
`
const InstructionTitle = styled.h1`
text-align:center;
margin-bottom:20px;
color: #655d5d;
`
const InstructionDesc = styled.div`
width:50%;
margin:0 auto;
`
const VideoWrapper = styled.div`
text-align: center;
margin:20px 0px;
`
const Footer = styled.div`
height:40px;
`
const FooterA = styled.a`
cursor:pointer;
&:hover{
  color:blue;  
}

`
export const Recipe = () => {
    const [state,setState] = useState(null)
    const [ingredients, setIngredients] = useState(null);
    useEffect(async()=>{
        axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${store.getState().recipe.strMeal}`)
        .then(item=>{
            
            const resp =item.data;
            setState(resp.meals[0]);
            console.log(resp.meals[0])
            resp.meals[0].strYoutube= resp.meals[0].strYoutube.replace("watch?v=","embed/");            
            resp.meals[0].strYoutube= resp.meals[0].strYoutube.replace(".com","-nocookie.com");
          return item.data.meals[0];
        })
        .then(item=>{
            setIngredients([]);
            return item;
        })
        .then(item=>{
            
            for(let i=0;i<20;i++)
            {
               for(const properties in item)
           {
               if(properties===`strIngredient${i}`|| properties===`strMeasure${i}`)
               {
                   if(item[properties]!='' && item[properties]!=null)
                   {               
               if(properties===`strIngredient${i}`)        
               {                        
                         
                         setIngredients(prev=>{
                             console.log(prev)
                          return   [...prev,{ingName:item[properties],ingImg:`https:www.themealdb.com/images/ingredients/${item[properties]}-Small.png`,ingMeasure:''}]
                         })
                         console.log(item[properties])
                         

            }
            else if(properties ===`strMeasure${i}` && item[properties] !==" ")
            {
               
              
                
                  setIngredients(prev=>{
                      let p=1;
                      p=i
                      prev[--p].ingMeasure=item[properties]
                      return[...prev]
                  })
            }
            
                   }
               }
           }   
            }
         
        })
    },[store.getState().recipe]) 

    return (
        <Container>
            {
                state && 
                 <Wrapper>

                <ClipElement img={state.strMealThumb}>
                     <ImageHover>
                         </ImageHover>   
                         <ImageTitle>{state.strMeal}</ImageTitle>
                </ClipElement>
                { ingredients &&
                 <IngredientsWrapper>
                     <IngredientsTitle>
                         INGREDIENTS
                     </IngredientsTitle>
                   
                       <IngredientsBox>
                        
                     {
                        
                         ingredients.map(item=>{
                             return (
                            <IngSmBox key={item.idMeal}>
                             <h2 style={{marginBottom:'20px'}}>{item.ingName}</h2>
                             <img src={item.ingImg} alt={item.ingName} onClick={()=>{

                             }}/>
                             <p>{item.ingMeasure}</p>
                            </IngSmBox>
                             )
                         })
                     }  
                          </IngredientsBox>  
                 </IngredientsWrapper>
                 }
                 <InstructionWrapper>
            
                     <InstructionTitle>
                         Instruction
                    </InstructionTitle>
                    <InstructionDesc>
                        <p style={{fontSize:'1.4rem',
                        lineHeight:'30px',
                        color:'gray'}}>
                            {state.strInstructions}</p>
                    </InstructionDesc>
                 </InstructionWrapper>
                 <VideoWrapper>
              {  
              <iframe width="790" height="455"
            src={`${state.strYoutube}?autoplay=1&mute=1`}>
              </iframe>
              }
                 </VideoWrapper>
                 <Footer>
                <FooterA href={state.source}>
                    {state.strSource}
                </FooterA>
                 </Footer>
               </Wrapper>
            }
        
        </Container>
    )
}
