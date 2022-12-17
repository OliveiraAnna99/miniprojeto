import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, CardHeader, Table, FormGroup, Label, Input, Card, CardBody, CardText, CardTitle} from 'reactstrap';
import {ModalHeader, ModalBody, ModalFooter, Modal, Nav, Navbar, NavbarBrand, NavLink } from 'reactstrap';
import React, { useState } from 'react';

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
           <center> <img src={this.props.image_url} style={{width: '30%'}}></img></center>
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
export default function Digimons({data, pesquisar}){
    const sizeCard = {width: "70%"}
    let id = 1;
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
          <br></br>
          <center>
            <Card style={sizeCard}>
              <CardBody>
                <CardTitle>Pesquisa Por Atributo</CardTitle>
                <Form inline method='GET'>
                  <FormGroup className="mb-2 mr-sm-2">
                    <Input type="text" name="pesquisar" placeholder="Buscar por ..."  defaultValue={pesquisar} style={{width: '60%'}}/>
                  </FormGroup>
                  <Button color='primary'>Search</Button>
                </Form>
            <div style={{height: '5rem'}}>
            </div> 
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
                                            <td> <ModalExample level={m.level} name={m.name} image_url={m.image_url}></ModalExample> </td>                  
                                        </tr>
                                      
                                    </tbody>
                        )}    
                          
                        </Table> 
                    </center>
                    
                    </div>
                   </CardBody>
                </Card>  
                   
            </div>
              </CardBody>
            </Card>
            
          </center>
          
         
           
        </div>
    )

}


function transformar(elemento){

    return (<div>{elemento.name} --- {elemento.image_url}</div>)
 
 }


 export async function getServerSideProps(context){
    const  {pesquisar}  = context.query
    const res = await fetch(`https://digimoncard.io/api-public/search.php?attribute=` + pesquisar )
    const data = await res.json()
    
    return {
        props: {
            data,
            pesquisar
        }
    }
  
  }