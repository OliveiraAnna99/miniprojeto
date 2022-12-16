import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Navbar, NavItem, NavbarToggler, Collapse, NavLink, Nav, NavbarBrand, 
    Form, Table, Button, FormGroup,InputGroup, InputGroupText, InputGroupAddon, Input
} from 'reactstrap';
export default function Digimons({data}){
    var id = 1;
    return (
      
            <>
            <Navbar className="my-2" color="secondary" dark>
                <NavbarBrand href='/'>
                    Reactstrap
                </NavbarBrand>
                    <Form method='GET'>
                        <FormGroup>
                          <div class="input-group mb-3">
                            <Input  placeholder =''/>
                            <div class="input-group-append">
                                <Input type='submit' color='primary' value ='Buscar'></Input>
                            </div>
                          </div>
                        </FormGroup>
                    </Form> 
            </Navbar>
            
            { Array.isArray(data) && data.map( (m) =>
                  <div>
                    <center>
                        <h1>{m.name}</h1>
                        <img src={m.img}></img>
                    </center>
                    <center>
                       <small>{m.level}</small>
                    </center>
                  </div>
       )}    
           
            </>
    )

}


 export async function getServerSideProps(context){
    const { name } = context.query;
    const resposta = await fetch(`https://digimon-api.vercel.app/api/digimon/name/` + name)
    const data = await resposta.json()
    //console.log(data);
    return {
        props: {
            data
        }
    }
  
  }