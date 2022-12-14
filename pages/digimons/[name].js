import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Navbar, NavItem, NavbarToggler, Collapse, NavLink, Nav, NavbarBrand, 
    Form, Table, Button, FormGroup,InputGroup, InputGroupText, InputGroupAddon, Input, Card, CardBody, CardText
} from 'reactstrap';
export default function Digimons({data, data2,pesquisar}){
    var id = 1;
    let contador =0;
    return (
      
            <>
             <Navbar className="my-2" color="secondary" dark>
                <NavbarBrand href='/'>
                    DigiNext
                </NavbarBrand>
                <Nav>
                    <NavLink style ={{color: 'white'}} href='/'>
                        Digimons
                    </NavLink>
                    <NavLink style ={{color: 'white'}} href='/contact'>
                        Contatos
                    </NavLink>
                </Nav>
                
                    <Form method='GET' action='/search'>
                        <FormGroup>
                          <div class="input-group mb-3">
                            <Input   name="pesquisar" placeholder ='Pesquisa por atributo' />
                            <div class="input-group-append">
                                <Input type='submit' color='primary' value ='Buscar'></Input>
                            </div>
                          </div>
                        </FormGroup>
                    </Form> 
            </Navbar>
            
           
             
                  <div>
                    <Card>
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
                    
                      <div>
                        <CardBody>
                          <div style={{height: '10rem'}}></div>
                            
                            <div className='container'>
                                <div className='row'>
                                    <div className='col'>
                                        <img src={data2[contador].image_url} style={{width: '40%'}}></img>
                                    </div>
                                    <div className='col' style={{textAlign: 'justify'}}>
                                        Esse ?? o {data2[contador].name} o digimon do tipo {data2[contador].digi_type}, devido a sua colora????o {data2[contador].color} esse digimon chama bastante aten????o entre os digiescolhidos, 
                                        esse digimon possu?? como principal atributo, o atributo {data2[contador].attribute}. Al??m de estar no level {data2[contador].level} esse
                                        curioso digimon possu??: raridade {data2[contador].cardrarity}, essa a esquerda ?? sua card
                                    </div>
                                </div>
                            </div>
                                
                       
                        </CardBody>
                        </div>
                    </Card>
                  </div>
                 
       
           
            </>
    )

}


 export async function getServerSideProps(context){
    const { name } = context.query;
    const resposta = await fetch(`https://digimon-api.vercel.app/api/digimon/name/` + name)
    const resposta2 = await fetch(`https://digimoncard.io/api-public/search.php?n=` + name)
    const data = await resposta.json()
    const data2 = await resposta2.json()
    //console.log(data);
    return {
        props: {
            data,
            data2
        }
    }
  
  }
