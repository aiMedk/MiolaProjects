import React, { Component } from 'react';
import { ButtonGroup, Button, Card, Table, Form, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faList, faEdit, faTrash,faPlus } from '@fortawesome/free-solid-svg-icons';
import {Jumbotron} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import ToastSupp from '../Toasts/ToastSupp';
import ToastAjout from '../Toasts/ToastAjout';
import Navigationbar from '../Navigationbar';
import axios from 'axios';
import AuthService from "../services/auth.service";



const currUser  = AuthService.getCurrentUser();
var token = "";
if(currUser) { token = currUser.data.jwttoken; }


class ProjetList extends Component {
  
    initialState = 
    {
        Titre:' ',
        Description:' ',
        Theme:' ',
        Duree:' ',
        Technologies: ' '
    };

    constructor(props) 
    {
        super(props);
        this.state = { projets: [], isToggleOn: false};

        this.projetChange = this.projetChange.bind(this);
        this.ajoutProjet = this.ajoutProjet.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => ({
          isToggleOn: !this.state.isToggleOn
        }));        
      }

    componentDidMount() 
    {   
        console.log(token)

        if(token !== "") 
        {
            const api = `https://miolaproject.herokuapp.com/projets`;
            axios.get(api, { headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {
                console.log(res.data);
                this.setState({
                projets: res.data,  
                isLoaded : true,
                redirectToReferrer: false})
            })
        }
        else { this.props.history.push('/login') }
        
    }   

    
    ajoutProjet(event) {
        event.preventDefault();
        const projet= {
            titre:this.state.titre,
            description:this.state.description,
            theme:this.state.theme,
            duree:this.state.duree,
            technologies:this.state.technologies
        }

        axios.post("https://miolaproject.herokuapp.com/projets", projet, { headers: {"Authorization" : `Bearer ${token}`} })
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

    ProjetSupp = (projetId) => { 
        axios.delete("https://miolaproject.herokuapp.com/projets/"+projetId, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(response => 
        {
            if(response.data != null)
            {
                this.setState({"showSuppToast":true});
                setTimeout(() => this.setState({"showSuppToast":false}), 1000);
                this.setState({ projets:this.state.projets.filter(projet => projet.id !== projetId) });
            }
            else {this.setState({"showSuppToast":false});}
        });  
    };


    projetChange(event) 
    {
        this.setState ({ [event.target.name] : event.target.value });
    }


//******************    View    *******************/

    render() {
        return (
            <div>
                <Navigationbar/>
                <br/>
                <Jumbotron className="bg-dark text-white">
                    

                    {/*  Titre + Button d'ajout d'un nouveau projet */}
            
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-9">
                            <h1><FontAwesomeIcon icon={faList} /> Liste des projets</h1>
                                <blockquote className= "blockquote mb-0">
                                    <p>Vous trouverez la liste des projets existants </p>

                                </blockquote>
                            </div>
                            <div className="col-sm-3">
                            <Button size="lg" variant="outline-success" onClick={this.handleClick}> <FontAwesomeIcon icon={faPlus} /> Ajouter un projet</Button> 
                            </div>
                        </div>
                    </div>
            
                    {/*  Toast Suppression */}
            
                    <div style={{"display":this.state.showSuppToast ? "block" : "none"}}>
                        <ToastSupp children = {{showSuppToast:this.state.showSuppToast, message:"Projet supprimé",type:"danger"}}/> 
                    </div>
            
                    {/*  Formulaire d'ajout d'un nouveau projet */}
            
                        <div className="FormAjout" style={{"display":this.state.isToggleOn ? "block" : "none"}}>
            
                        <Card className={"border border-dark bg-dark text-white"}>
            
                            <Card.Header> Ajouter une projet </Card.Header>
            
                            <div style={{"display":this.state.showAddToast ? "block" : "none"}}>
                            <ToastAjout children = {{showAddToast:this.state.showAddToast, message:"Projet ajouté avec succès.",type:"success"}}/> 
                            </div>
            
                            <Form onSubmit={this.ajoutProjet} id="ProjetFormId">
            
                            <Card.Body>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridTitre">
                                    <Form.Label> Titre </Form.Label>
                                    <Form.Control name="titre" autoComplete="off" required type="text"
                                    className={"bg-dark text-white"}
                                    value = {this.state.titre} onChange = {this.projetChange} placeholder= "Entrez Titre Projet"/>
                                    </Form.Group>
            
                                    <Form.Group as={Col} controlId="formGridTheme">
                                    <Form.Label> Thème </Form.Label>
                                    <Form.Control name="theme" autoComplete="off" required type="text"
                                    className={"bg-dark text-white"}
                                    value = {this.state.theme} onChange = {this.projetChange} placeholder= "Entrez Thème Projet"/>
                                    </Form.Group>
                                </Form.Row>
            
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridDescription">
                                    <Form.Label> Description </Form.Label>
                                    <Form.Control name="description" autoComplete="off" required type="textarea"
                                    className={"bg-dark text-white"} as="textarea" rows="3"
                                    value = {this.state.description} onChange = {this.projetChange} placeholder= "Entrez Description Projet"/>
                                    </Form.Group>
                                </Form.Row>
            
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridDuree">
                                    <Form.Label> Durée </Form.Label>
                                    <Form.Control name="duree" autoComplete="off" required type="text"
                                    className={"bg-dark text-white"}
                                    value = {this.state.duree} onChange = {this.projetChange} placeholder= "Entrez Durée Projet"/>
                                    </Form.Group>
            
                                    <Form.Group as={Col} controlId="formGridTechnologies">
                                    <Form.Label> Technologies </Form.Label>
                                    <Form.Control name="technologies" autoComplete="off"  type="text"
                                    className={"bg-dark text-white"}
                                    value = {this.state.technologies} onChange = {this.projetChange} placeholder= "Entrez Technologies Projet"/>
                                    </Form.Group>
                                </Form.Row>
            
                            </Card.Body>
            
                            <Card.Footer style={{"textAlign":"center"}}>
                                <Button size="lm" variant="success" type="submit"> Ajouter </Button>
                            </Card.Footer>
                            </Form>
                            </Card>
            
                        </div>
            
                    
                    {/*  Liste des projets existants dans la base de données */}
            
                    <Card className={"border border-dark bg-dark text-white"}> 
                        <Card.Body>
                            <Table bordered hover striped variant="dark">
                                <thead> 
                                    <tr><th>Titre</th><th>Description</th><th>Durée</th><th>Thème</th><th>Technologies</th></tr>
                                </thead>
            
                                <tbody>
            
                                { 
                                    /* If there is no project, show "Aucun projet existant" */
                                    this.state.projets.length ===0 ? <tr align="center"><td colSpan="6">Aucun projet existant.</td></tr> :
                                    
                                    /* else, we should fetch the data from the API */
                                    this.state.projets.map((projet) => ( 
                                        <tr key={projet.id}>
                                            <td>{projet.titre}</td>
                                            <td>{projet.description}</td>
                                            <td>{projet.duree}</td>
                                            <td>{projet.theme}</td>
                                            <td>{projet.technologies}</td>
                                            <td>
                                                <ButtonGroup>
                                                <Link to={{ pathname: `/projet/modif/${projet.id}`}} className="nav-link">
                                                    <Button size="sm" variant="outline-primary"><FontAwesomeIcon icon={faEdit}/> </Button>
                                                </Link>
                                                <Button size="sm" variant="outline-danger" onClick={this.ProjetSupp.bind(this,projet.id)}> <FontAwesomeIcon icon={faTrash} /> </Button> 
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
    
        )
    }
}

export default ProjetList;