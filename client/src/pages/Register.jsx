import styled from "styled-components"
import { publicRequest } from "../../requestMethods"
import { mobile } from "../responsive"
import {useState } from "react"
import { useNavigate } from "react-router"

const Container = styled.div`
    height:100vh;
    width:100vw;
    background:linear-gradient(
      rgba(255,255,255,0.5),
      rgba(255,255,255,0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;
    
    display:flex;
    align-items:center;
    justify-content:center;
`

const Wrapper = styled.div`
    width:40%;
    padding:20px;
    background-color:white;
    ${mobile({width:"75%"})};
`

const Title = styled.h1`
    font-size:24px;
    font-weight:300;
`


const Form = styled.form`
    display:flex;
    flex-wrap:wrap;
`

const Input = styled.input`
      flex:1;
      min-width:40%;
      margin:20px 10px 0px 0px;
      padding:10px;
      ${mobile({ marginBottom:"2px" })}
`

const Agreement = styled.span`
      font-size:12px;
      margin:20px 0px;
`
const Button = styled.button`
      width:40%;
      border:none;
      padding:15px 20px;
      background-color:teal;
      color:white;
      cursor:pointer;
`

const Register = () => {
  const navigate = useNavigate()
  const [firstname,setfirstName] = useState("")
  const [lastname,setLastName] = useState("")
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [email,setEmail] = useState("")
  const [confirm,setConfirm]=useState("")
  const Register = {
     username,password,email
  }
  const handleClick =async  (e) =>{ 
      try {
        const res= publicRequest.post("/auth/register",Register)
        res.status(200).json(res)
      } catch (error) {
        console.log(error)
      }
     // navigate("/login")
  }
  return (
    
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="Firstname" onChange={(e)=>setfirstName(e.target.value)} required/>
          <Input placeholder="last name" onChange={(e)=>setLastName(e.target.value)} required/>
          <Input placeholder="username" onChange={(e)=>setUsername(e.target.value)} required/>
          <Input placeholder="email" onChange={(e)=>setEmail(e.target.value)} required/>
          <Input placeholder="password" onChange={(e)=>setPassword(e.target.value)} required/>
          <Input placeholder="confirm password" onChange={(e)=>setConfirm(e.target.value)} required/>
          <Agreement>
            By creating an account, I consent 
            to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleClick}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Register
