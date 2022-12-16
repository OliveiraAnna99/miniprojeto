import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Navbar, NavItem, NavbarToggler, Collapse, NavLink, Nav, NavbarBrand, Card, Pagination, TablePagination,
    Form, Table, Button, FormGroup,InputGroup, InputGroupText, InputGroupAddon, Input, link, CardHeader, CardBody
} from 'reactstrap';
import FlatList from 'flatlist-react';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Home({ data, pesquisar}){
    let id = 1;
    
    return (
        <div>
            <Navbar className="my-2" color="secondary" dark>
                <NavbarBrand>
                    Reactstrap
                </NavbarBrand>
                    <Form method='GET'>
                        <FormGroup>
                          <div class="input-group mb-3">
                            <Input  placeholder ='' value={pesquisar}/>
                            <div class="input-group-append">
                                <Input type='submit' color='primary' value ='Buscar'></Input>
                            </div>
                          </div>
                        </FormGroup>
                    </Form> 
            </Navbar>
            
            <div class="table-wrapper-scroll-y my-custom-scrollbar">
            <Card>
                <CardHeader><h4><b>Tabela de Digimons</b></h4></CardHeader>
                <CardBody>
                    <div style={{maxHeight: '310px', overflowY:' auto'}}>
                <InfiniteScroll dataLength={data.length}>
                <center>
                    <Table style={{ width: '85%', textAlign: 'center'}} className="table table-light table-sm" cellspacing="0"  bordered height="310">
                
                        <thead>
                            <tr>
                                <th class="th-sm">#</th> 
                                <th class="th-sm"> Digimon </th>
                                <th class="th-sm"> Level </th>
                                <th class="th-sm"> Link </th>
                            
                            </tr>
                        </thead>
                        
                        { Array.isArray(data) && data.map( (m) =>
                               
                                    <tbody>
                                        <tr>
                                            <th scope="row">{id++}</th>
                                            <td>{m.name}</td>                         
                                            <td>{m.level}</td>                         
                                            <td><Button color='warning' key={m.name} href={'/digimons/' + m.name }>Detalhes</Button></td>                         
                                        </tr>
                                      

                                    </tbody>
                               
                                    
                        
                        )}    
                          
                        </Table> 
                    </center>
                    
                    </InfiniteScroll>
                    </div>
                   </CardBody>
                </Card>          
            </div>
           
        </div>
    )
                           
}


 export async function getServerSideProps(context){
    const pesquisar = context.query;
    const res = await fetch(`https://digimon-api.vercel.app/api/digimon/`)
    const data = await res.json()
    return {
        props: {
            data,
            pesquisar
        }
    }
   
     
    
  
  }
  
