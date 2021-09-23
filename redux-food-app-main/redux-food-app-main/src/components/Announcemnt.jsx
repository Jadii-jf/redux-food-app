import React from 'react'
import styled from 'styled-components'
const Container = styled.div`
height:30px;
background:#f78506;;
color:white;
text-align:center;
display:grid;
place-items:center;
font-weight:bolder;
font-size:14px;
`
export const Announcemnt = () => {
    return (
        <Container>
           Super Deal! Free Delivery an order Over $50
        </Container>
    )
}
