import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Navbar, CardTitle, NavItem, NavbarToggler, Collapse, NavLink, Nav, NavbarBrand, Card, Pagination, TablePagination, Modal,
    Form, Table, Button, FormGroup,InputGroup, InputGroupText, InputGroupAddon, Input, link, CardHeader, CardBody, CardText
} from 'reactstrap';

export default function Contact({pesquisar}){
    return(
        <div>
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
            <Card>
                <CardHeader>
                    <CardTitle><b>Informações de Contato</b></CardTitle>
                </CardHeader>
                <CardBody>
                    <div className='container'>
                        <div className='row'>
                            <div className='col'>
                                    <img src='/imagens/avatar-anna.png' style={{borderRadius: '25rem', width: '40%'}}></img>
                            </div>
                            <div className='col'>
                                <CardText>
                                    <b>Desenvolvedora:</b> Anna Karoline D. Oliveira<br/>
                                    <b>Informações Acadêmicas:</b> Estudande de Sistemas de Informação, atualmente cursando o 4º Periodo na UFRN.  <br/>
                                    <b>Tecnologias Utilizadas/Linguagens:</b> Laravel, Django, Next/React, C, Assembly, Matlab <br/>
                                </CardText>
                            </div>
                        </div>
                        <br/>
                        <div className='row'>
                            <div className='col'>
                                    <img src='/imagens/avatar-jonatas.png' style={{borderRadius: '25rem', width: '40%'}}></img>
                            </div>
                            <div className='col'>
                                <CardText>
                                    <b>Desenvolvedor:</b> Jonatas Camara dos Santos<br/>
                                    <b>Informações Acadêmicas:</b> Estudande de Sistemas de Informação, atualmente cursando o 4º Periodo na UFRN.  <br/>
                                    <b>Tecnologias Utilizadas/Linguagens:</b> Unity, Python <br/>
                                </CardText>
                            </div>
                           
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}