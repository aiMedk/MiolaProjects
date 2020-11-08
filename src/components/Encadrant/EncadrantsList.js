import React, { Component } from "react";
import { ButtonGroup, Button, Card, Table ,Form, Col} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faEdit, faTrash,faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ToastSupp from "../Toasts/ToastSupp";
import { Link } from "react-router-dom";
import {Jumbotron} from 'react-bootstrap';
import ToastAjout from '../Toasts/ToastAjout';
import NavigationBar from '../Navigationbar';
import AuthService from '../services/auth.service'


const currUser  = AuthService.getCurrentUser();
var token = "";
if(currUser) { token = currUser.data.jwttoken; }  

class EncadrantsList extends Component {

  initialState = 
    {
        Nom:' ',
        Prenom:' ',
        Role:' ',
        Departement:' '
    };

  constructor(props) {
    super(props);
    this.state = { Encadrants: [] , isToggleOn: false, currentuser: AuthService.getCurrentUser()};

    this.encadrantChange = this.encadrantChange.bind(this);
    this.ajoutEncadrant = this.ajoutEncadrant.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() 
  {   
      if(token !== "") 
      {
        const api = `https://miolaproject.herokuapp.com/encadrants`
        axios.get(api, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {
            console.log(res.data);
            this.setState({
            Encadrants: res.data,  
            isLoaded : true,
            redirectToReferrer: false})
        })
    }
    else {this.props.history.push('/login')}
  }

  deleteEncadrant = (encadrantId) => {
    axios
      .delete("https://miolaproject.herokuapp.com/encadrants/" + encadrantId,  { headers: {"Authorization" : `Bearer ${token}`} })
      .then((response) => {
        if (response.data != null) 
        {
          this.setState({ showSuppToast: true });
          setTimeout(() => this.setState({ showSuppToast: false }), 1000);
          this.setState({ Encadrants: this.state.Encadrants.filter((encadrant) => encadrant.id !== encadrantId)});
        } 
        else { this.setState({ showSuppToast: false }); }
      });
  };

  ajoutEncadrant(event) {
    event.preventDefault();

    const encadrant= {
        nom:this.state.nom,
        prenom:this.state.prenom,
        role:this.state.role,
        departement:this.state.departement
    }

    axios.post("https://miolaproject.herokuapp.com/encadrants", encadrant ,  { headers: {"Authorization" : `Bearer ${token}`} })
    .then(response => {
        if (response.data != null) 
        {
            this.setState(this.initialState);
            this.setState({"showAddToast":true});
            setTimeout(() => this.setState({"showAddToast":false}), 1000);
            setTimeout(() =>  window.location.reload(false), 1000);
        }
    })
    }
  

  handleClick() {
    this.setState(state => ({
      isToggleOn: !this.state.isToggleOn
    }));        
  }

  encadrantChange(event) { this.setState ({ [event.target.name] : event.target.value }); }


  render () {
    return (
      <div>
          <NavigationBar/>
          <br/>
          <Jumbotron className="bg-dark text-white">

          {/*  Titre + Button d'ajout d'un nouveau encadrant */}

          <div className="container">
              <div className="row">
                  <div className="col-sm-8">
                      <h1><FontAwesomeIcon icon={faList} /> Liste des encadrants</h1>
                      <blockquote className= "blockquote mb-0">
                          <p>Vous trouverez la liste des encadrants existants</p>
                      </blockquote>
                  </div>
                  <div className="col-sm-4">
                  <Button size="lg" variant="outline-success" onClick={this.handleClick}> <FontAwesomeIcon icon={faPlus} /> Ajouter un encadrant</Button> 
                  </div>
              </div>
          </div>

          {/*  Toast Suppression */}

          <div style={{"display":this.state.showSuppToast ? "block" : "none"}}>
              <ToastSupp children = {{showSuppToast:this.state.showSuppToast, message:"Encadrant supprimé",type:"danger"}}/> 
          </div>

          {/*  Formulaire d'ajout d'un nouveau encadrant */}

              <div className="FormAjout" style={{"display":this.state.isToggleOn ? "block" : "none"}}>

              <Card className={"border border-dark bg-dark text-white"}>

                  <Card.Header> Ajouter un encadrant </Card.Header>

                  <div style={{"display":this.state.showAddToast ? "block" : "none"}}>
                  <ToastAjout children = {{showAddToast:this.state.showAddToast, message:"Encadrant ajouté avec succès.",type:"success"}}/> 
                  </div>

                  <Form onSubmit={this.ajoutEncadrant} id="EncadrantFormId">

                  <Card.Body>
                      <Form.Row>
                          <Form.Group as={Col} controlId="formGridNom">
                          <Form.Label> Nom </Form.Label>
                          <Form.Control name="nom" autoComplete="off" required type="text"
                          className={"bg-dark text-white"}
                          value = {this.state.nom} onChange = {this.encadrantChange} placeholder= "Entrez Nom Encadrant"/>
                          </Form.Group>

                          <Form.Group as={Col} controlId="formGridPrenom">
                          <Form.Label> Prenom </Form.Label>
                          <Form.Control name="prenom" autoComplete="off" required type="text"
                          className={"bg-dark text-white"}
                          value = {this.state.prenom} onChange = {this.encadrantChange} placeholder= "Entrez Prenom Encadrant"/>
                          </Form.Group>
                      </Form.Row>

                      <Form.Row>
                        <Form.Group as={Col} controlId="formGridRole">
                          <Form.Label> Rôle </Form.Label>
                          <Form.Control name="role" autoComplete="off" required type="text"
                          className={"bg-dark text-white"}
                          value = {this.state.role} onChange = {this.encadrantChange} placeholder= "Entrez Rôle Encadrant"/>
                          </Form.Group>

                          <Form.Group as={Col} controlId="formGridDepartement">
                          <Form.Label> Département </Form.Label>
                          <Form.Control name="departement" autoComplete="off" required type="text"
                          className={"bg-dark text-white"}
                          value = {this.state.departement} onChange = {this.encadrantChange} placeholder= "Entrez Département Encadrant"/>
                          </Form.Group>
                      </Form.Row>

                  </Card.Body>

                  <Card.Footer style={{"textAlign":"center"}}>
                      <Button size="lm" variant="success" type="submit"> Ajouter </Button>
                  </Card.Footer>
                  </Form>
                  </Card>

              </div>


          {/*  Liste des encadrants existants dans la base de données */}

          <Card className={"border border-dark bg-dark text-white"}> 
              <Card.Body>
                  <Table bordered hover striped variant="dark">
                      <thead> 
                          <tr><th>Nom</th><th>Prenom</th><th>Role</th><th>Departement</th></tr>
                      </thead>

                      <tbody>

                      { 
                          /* If there is no encadrant, show "Aucun encadrant existant" */
                          this.state.Encadrants.length ===0 ? <tr align="center"><td colSpan="6">Aucun encadrant existant.</td></tr> :
                          
                          /* else, we should fetch the data from the API */
                          this.state.Encadrants.map((encadrant) => ( 
                            <tr key={encadrant.id}>
                                <td>{encadrant.nom}</td>
                                <td>{encadrant.prenom}</td>
                                <td>{encadrant.role}</td>
                                <td>{encadrant.departement}</td>
                                <td>
                                      <ButtonGroup>
                                      <Link to={{ pathname: `/encadrant/modif/${encadrant.id}`}} className="nav-link">
                                          <Button size="sm" variant="outline-primary"><FontAwesomeIcon icon={faEdit}/> </Button>
                                      </Link>
                                      <Button size="sm" variant="outline-danger" onClick={this.deleteEncadrant.bind(this,encadrant.id)}> <FontAwesomeIcon icon={faTrash} /> </Button> 
                                      </ButtonGroup>
                                  </td>
                              </tr>
                          ))
                      }

                      </tbody>

                  </Table>
              </Card.Body>
          </Card>

          </Jumbotron>
      </div>
    
    )}
}
export default EncadrantsList;
