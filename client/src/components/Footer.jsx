import styled from "styled-components"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import RoomIcon from '@mui/icons-material/Room';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailIcon from '@mui/icons-material/Mail';
import {mobile} from '../responsive';

const Container = styled.div`
    display:flex;
    ${mobile({flexDirection:"column"})}
`

const Left  = styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
    padding:20px;
`
const Logo = styled.h1``


const Desc = styled.p`
    margin:20px 0px;
`
const SocialContainer = styled.div`
    display:flex;
`
const SocialIcon = styled.div`
    width:40px;
    height:40px;
    border-radius:50%;
    color:white;
    background-color:  #${props => props.color};
    display:flex;
    align-items:center;
    justify-content:center;
    margin-right:20px;
`

const Center = styled.div`
    flex:1;
    padding:20px;
   
`
const Title= styled.h3`
    margin-bottom:30px;
`
const List= styled.ul`
    margin:0;
    padding:0;
    list-style:none;
    display:flex;
    flex-wrap:wrap;
`
const ListItem = styled.li`
    width:50%;
    margin-bottom:10px;
`

const Right = styled.div`
    flex:1;
    padding:20px;
    ${mobile({backgroundColor:"lightgray"})}
`
const ContactItem = styled.div`
    margin-bottom:20px;
    display:flex;
    align-items:center;
`
const Payment = styled.img`
    width:50%;
`

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>MANU</Logo>
        <Desc>
          We do not ask for your bank account or card details verbally or telephonically.
          We also do not ask for money to participate in any of our offers or run any lucky draws.
        </Desc>
        <SocialContainer>
            <SocialIcon color="385999">
                <FacebookIcon/>
            </SocialIcon>
            <SocialIcon color="E4405F">
                <InstagramIcon/>
            </SocialIcon>
            <SocialIcon color="55ACEE">
                <TwitterIcon/>
            </SocialIcon>
            <SocialIcon color="E60023">
                <PinterestIcon/>
            </SocialIcon>
        </SocialContainer>
      </Left>

      <Center>
        <Title>Useful Links</Title>
        <List>
            <ListItem>Home</ListItem>
            <ListItem>Cart</ListItem>
            <ListItem>Man Fashion</ListItem>
            <ListItem>Women Fashion</ListItem>
            <ListItem>Accessories</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>Order Tracking</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Terms</ListItem>
            <ListItem>Your shoppings</ListItem>
        </List>
      </Center>

      <Right>
        <Title>Contact</Title>
        <ContactItem>
            <RoomIcon style={{marginRight:"10px"}}/>
            622 Dixie Path , south Tobinchester 9722
        </ContactItem>
        <ContactItem>
            <LocalPhoneIcon style={{marginRight:"10px"}}/>
            +1 234 56 78
        </ContactItem>
        <ContactItem>
            <MailIcon style={{marginRight:"10px"}}/>
            mailme@manu.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png"/>
      </Right>
    </Container>
  )
}

export default Footer
