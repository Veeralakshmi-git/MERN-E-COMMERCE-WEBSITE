import { LogoutOutlined,  Search } from '@mui/icons-material'
import React from 'react'
import styled from 'styled-components'
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {mobile} from "../responsive"
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const Container = styled.div`
    height: 60px;
    ${mobile({ height:"50px" })}
`

const Wrapper = styled.div`
    padding:10px 20px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    ${mobile({ padding:"10px 0px" })}
`
const Left = styled.div`
    flex:1;
    display:flex;
    align-items:center;
`
const Language = styled.span`
    font-size:14px;
    cursor:pointer;
    ${mobile({ display:"none" })}
`
const SearchContainer = styled.div`
    border: 1px solid lightgray;
    display:flex;
    align-items:center;
    margin-left:25px;
    padding:5px;
`
const Input = styled.input`
    border:none;
    ${mobile({ width: "50px" })}
`

const Center = styled.div`
    flex:1;
    text-align:center;
`
const Logo = styled.h1`
    font-weight: bold;
    ${mobile({ fontSize: "24px"})}
`
const Right =  styled.div`
    flex:1;
    display:flex;
    align-items:center;
    justify-content:flex-end;
    ${mobile({ flex:2,justifyContent: "center"})}
`
const MenuItem = styled.div`
    font-size:14px;
    cursor:pointer;
    margin-left:20px;
    margin-right:20px;
    ${mobile({ fontSize: "12px", marginRight:"10px" })}
`
const Logout = styled.button`
`

const Navbar = () => {
    const quantity = useSelector(state=>state.user.cart.quantity)
    const user = useSelector(state=>state.user.user.currentUser.username)
    console.log(user)
    const dispatch = useDispatch();
     
  return (
    <Container>
      <Wrapper>
        <Left>
            <Language>EN</Language>
            <SearchContainer>
                <Input/>
                <Search style={{color:'gray', fontSize:16}}/>
            </SearchContainer>                 
        </Left>
        <Center><Logo>MANU.</Logo>
        </Center>
        <Right>
            {!user ? 
            <>
                <Link to="/register">
                    <MenuItem>REGISTER</MenuItem>
                </Link> 
                <Link to="/login">
                    <MenuItem>SIGN IN</MenuItem>
                </Link> 
            </> : "Welcome" + " " + user
            }
            <Link to="/cart">
                <MenuItem>
                    <Badge badgeContent={quantity} color="primary">
                        <ShoppingCartOutlinedIcon />
                    </Badge>
                </MenuItem>
            </Link>

            {/* <Logout onClick={()=>dispatch(logout(),deleteProduct())}>   
                <LogoutOutlined/>
            </Logout>  */}
                
                
            
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar
