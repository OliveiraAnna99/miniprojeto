import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Navbar, NavItem, NavbarToggler, Collapse, NavLink, Nav, NavbarBrand, Card, Pagination, TablePagination, Modal,
    Form, Table, Button, FormGroup,InputGroup, InputGroupText, InputGroupAddon, Input, link, CardHeader, CardBody
} from 'reactstrap';

import {ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      nestedModal: false,
      closeAll: false
    };

    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleNested() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false
    });
  }

  toggleAll() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true
    });
  }

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.toggle}>Info</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Informações Adicionais</ModalHeader>
          <ModalBody>
           <center> <img src={this.props.img} style={{width: '30%'}}></img></center>
            <br />
            <label>
              Esse é {this.props.name} o digimon de level {this.props.level} as informações 
              acerca dele ainda são pouco conhecidas, para saber mais sobre esse digimon acesse 
              o link abaixo ou clique no botão <a href={'/digimons/' + this.props.name}>"Detalhes"</a>.
            </label>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>OK</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default function Home({ data, pesquisar, data2}){
    let id = 1;
    let id2 = 1;
    return (
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
            
            <div class="table-wrapper-scroll-y my-custom-scrollbar">
            <Card>
                <CardHeader><h4><b>Tabela de Digimons</b></h4></CardHeader>
                <CardBody>
                    <div style={{maxHeight: '310px', overflowY:' auto'}}>
                <center>
                    <Table style={{ width: '85%', textAlign: 'center'}}  className="table table-light table-sm order={['age', 'asc' ]}" cellspacing="0"  bordered height="310" >
                
                        <thead>
                            <tr>
                                <th class="th-sm">#</th> 
                                <th class="th-sm"> Digimon </th>
                                <th class="th-sm"> Level </th>
                                <th class="th-sm"> Link </th>
                                <th class="th-sm"> Info </th>
                            
                            </tr>
                        </thead>
                        
                        { Array.isArray(data) && data.map( (m) =>
                               
                                    <tbody>
                                  
                                        <tr>
                                            <th scope="row">{id++}</th>
                                            <td>{m.name}</td>                         
                                            <td>{m.level}</td>                         
                                            <td><Button color='warning' key={m.name} href={'/digimons/' + m.name }>Detalhes</Button></td>                         
                                            <td> <ModalExample level={m.level} name={m.name} img={m.img}></ModalExample> </td>                  
                                        </tr>
                                      
                                    </tbody>
                        )}    
                          
                        </Table> 
                    </center>
                    
                    </div>
                   </CardBody>
                </Card>  
                   
            </div>
            <div style={{height:'8rem'}}></div>
            <div class="table-wrapper-scroll-y my-custom-scrollbar">
            <Card>
                <CardHeader><h4><b>Tabela de Atributos</b></h4></CardHeader>
                <CardBody>
                    <div style={{maxHeight: '310px', overflowY:' auto'}}>
                <center>
                    <Table style={{ width: '85%', textAlign: 'center'}}  className="table table-light table-sm order={['age', 'asc' ]}" cellspacing="0"  bordered height="310" >
                
                        <thead>
                            <tr>
                                <th class="th-sm">#</th> 
                                <th class="th-sm"> Atributos </th>
                               
                            
                            </tr>
                        </thead>
                        
                     
                        
                                    <tbody>
                                  
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Vaccine</td>                         
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Variable</td>                         
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Virus</td>                         
                                        </tr>
                                        <tr>
                                            <th scope="row">4</th>
                                            <td>Data</td>                         
                                        </tr>
                                      
                                    </tbody>
                         
                        
                        </Table> 
                    </center>
                    
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
    const resposta = await fetch(`https://digimoncard.io/api-public/getAllCards.php?sort=name&series=Digimon Card Game&sortdirection=asc`)
    const data = await res.json()
    const data2 = await resposta.json()
    return {
        props: {
            data,
            pesquisar,
            data2
        }
    }
   
     
    
  
  }
  