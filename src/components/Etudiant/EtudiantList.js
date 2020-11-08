import React, {  Component } from "react";
import { ButtonGroup, Button, Card, Table, Form, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {Jumbotron} from 'react-bootstrap';
import { Link } from "react-router-dom";
import ToastAjout from '../Toasts/ToastAjout';
import ToastSupp from "../Toasts/ToastSupp";
import NavigationBar from '../Navigationbar';
import AuthService from "../services/auth.service";


const currUser  = AuthService.getCurrentUser();
var token = "";
if(currUser) { token = currUser.data.jwttoken; }  

class EtudiantsList extends Component 
{

  initialState = 
    {
        Nom:' ',
        Prenom:' ',
        Cne:' ',
        Filiere:' ',
        GroupKey:' ',
        EncadrantId:' ',
        ProjectId:' '
    };

  constructor(props) {
    super(props);
    this.state = { Etudiants: [] , isToggleOn: false};

    this.etudiantChange = this.etudiantChange.bind(this);
    this.ajoutEtudiant = this.ajoutEtudiant.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

    componentDidMount() 
    {   
      console.log(token)

        if(token !== "") 
        {
          const api = `https://miolaproject.herokuapp.com/etudiants`;
          axios.get(api, { headers: {"Authorization" : `Bearer ${token}`} })
          .then(res => {
              console.log(res.data);
              this.setState({
              Etudiants: res.data,  
              isLoaded : true,
              redirectToReferrer: false})
          })
        }
        else {this.props.history.push('/login')}
    }

  deleteEtudiant = (etudiantId) => {
    axios
      .delete("https://miolaproject.herokuapp.com/etudiants/" + etudiantId, { headers: {"Authorization" : `Bearer ${token}`} })
      .then((response) => {
        if (response.data != null) 
        {
          this.setState({ showSuppToast: true });
          setTimeout(() => this.setState({ showSuppToast: false }), 1000);
          this.setState({ Etudiants: this.state.Etudiants.filter((etudiant) => etudiant.id !== etudiantId)});
        } 
        else { this.setState({ showSuppToast: false }); }
      });
  };

  ajoutEtudiant(event) {
    event.preventDefault();

    const etudiant= {
        nom:this.state.nom,
        prenom:this.state.prenom,
        cne:this.state.cne,
        filiere:this.state.filiere,
        groupkey: " ",
        encadrantId: " ",
        projectId: " "
    }

    axios.post("https://miolaproject.herokuapp.com/etudiants", etudiant, { headers: {"Authorization" : `Bearer ${token}`} })
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

  etudiantChange(event) { this.setState ({ [event.target.name] : event.target.value }); }


  render () 
  {
    return (
      <div>
        <NavigationBar/>
                <br/>

        <Jumbotron className="bg-dark text-white">

{/*  Titre + Button d'ajout d'un nouveau encadrant */}

<div className="container">
    <div className="row">
        <div className="col-sm-9">
            <h1><FontAwesomeIcon icon={faList} /> Liste des étudiants</h1>
            <blockquote className= "blockquote mb-0">
                <p>Vous trouverez la liste des étudiants existants</p>
            </blockquote>
        </div>
        <div className="col-sm-3">
        <Button size="lg" variant="outline-success" onClick={this.handleClick}> <FontAwesomeIcon icon={faPlus} /> Ajouter un étudiant</Button> 
        </div>
    </div>
</div>

{/*  Toast Suppression */}

<div style={{"display":this.state.showSuppToast ? "block" : "none"}}>
    <ToastSupp children = {{showSuppToast:this.state.showSuppToast, message:"Etudiant supprimé",type:"danger"}}/> 
</div>

{/*  Formulaire d'ajout d'un nouveau encadrant */}

    <div className="FormAjout" style={{"display":this.state.isToggleOn ? "block" : "none"}}>

    <Card className={"border border-dark bg-dark text-white"}>

        <div style={{"display":this.state.showAddToast ? "block" : "none"}}>
        <ToastAjout children = {{showAddToast:this.state.showAddToast, message:"Etudiant ajouté avec succès.",type:"success"}}/> 
        </div>

        <Form onSubmit={this.ajoutEtudiant} id="EtudiantFormId">

        <Card.Body>
           
          <Form.Row>
                  <Form.Group as={Col} controlId="formGridNom">
                  <Form.Label> Nom </Form.Label>
                  <Form.Control name="nom" autoComplete="off" required type="text"
                  className={"bg-dark text-white"}
                  value = {this.state.nom} onChange = {this.etudiantChange} placeholder= "Entrez Nom Etudiant"/>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPrenom">
                  <Form.Label> Prenom </Form.Label>
                  <Form.Control name="prenom" autoComplete="off" required type="text"
                  className={"bg-dark text-white"}
                  value = {this.state.prenom} onChange = {this.etudiantChange} placeholder= "Entrez Prenom Etudiant"/>
                  </Form.Group>
            </Form.Row>

            <Form.Row>
                  <Form.Group as={Col} controlId="formGridCne">
                  <Form.Label> CNE </Form.Label>
                  <Form.Control name="cne" autoComplete="off" required type="text"
                  className={"bg-dark text-white"}
                  value = {this.state.cne} onChange = {this.etudiantChange} placeholder= "Entrez CNE Etudiant"/>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridFiliere">
                  <Form.Label> Filière </Form.Label>
                  <Form.Control name="filiere" autoComplete="off" required type="text"
                  className={"bg-dark text-white"}
                  value = {this.state.filiere} onChange = {this.etudiantChange} placeholder= "Entrez Filière Etudiant"/>
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
                <tr><th>Nom</th><th>Prenom</th><th>CNE</th><th>Filière</th></tr>
            </thead>

            <tbody>

            { 
                /* If there is no encadrant, show "Aucun encadrant existant" */
                this.state.Etudiants.length ===0 ? <tr align="center"><td colSpan="6">Aucun étudiant existant.</td></tr> :
                
                /* else, we should fetch the data from the API */
                this.state.Etudiants.map((etudiant) => ( 
                  <tr key={etudiant.id}>
                      <td>{etudiant.nom}</td>
                      <td>{etudiant.prenom}</td>
                      <td>{etudiant.cne}</td>
                      <td>{etudiant.filiere}</td>
                      <td>
                            <ButtonGroup>
                            <Link to={{ pathname: `/etudiant/modif/${etudiant.id}`}} className="nav-link">
                                <Button size="sm" variant="outline-primary"><FontAwesomeIcon icon={faEdit}/> </Button>
                            </Link>
                            <Button size="sm" variant="outline-danger" onClick={this.deleteEtudiant.bind(this,etudiant.id)}> <FontAwesomeIcon icon={faTrash} /> </Button> 
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
export default EtudiantsList;
