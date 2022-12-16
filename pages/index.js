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
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            <br />
            <Button color="success" onClick={this.toggleNested}>Show Nested Modal</Button>
            <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
              <ModalHeader>Nested Modal title</ModalHeader>
              <ModalBody>Stuff and things</ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.toggleNested}>Done</Button>{' '}
                <Button color="secondary" onClick={this.toggleAll}>All Done</Button>
              </ModalFooter>
            </Modal>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
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
                                            <td> <ModalExample></ModalExample> </td>                  
                                        </tr>
                                    </tbody>
                        )}    
                          
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
    const data = await res.json()
    return {
        props: {
            data,
            pesquisar
        }
    }
   
     
    
  
  }
  
