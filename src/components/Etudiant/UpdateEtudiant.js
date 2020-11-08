import React, { Component } from 'react'
import { Card, Form, Col , Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import {  faEdit } from '@fortawesome/free-solid-svg-icons';
import {Jumbotron} from 'react-bootstrap';
import axios from 'axios'
import ToastModif from '../Toasts/ToastModif';
import NavigationBar from '../Navigationbar';

import AuthService from "../services/auth.service";


const currUser  = AuthService.getCurrentUser();
var token = "";
if(currUser) { token = currUser.data.jwttoken; }  


class EtudiantModif extends Component {
   
    async componentDidMount() 
    {
        if(token !== "")
        {
            const id = this.props.match.params.id;

            const res = await axios.get('https://miolaproject.herokuapp.com/etudiants/'+id, { headers: {"Authorization" : `Bearer ${token}`} });
            
            this.setState({
                id: id,
                nom : res.data.nom,
                prenom : res.data.prenom,
                cne : res.data.cne,
                filiere : res.data.filiere,
                groupKey : res.data.groupKey,
                encadrantId : res.data.encadrantId,
                projectId : res.data.projectId
            });

        }
        else {this.props.history.push('/login') }

    }


    state = 
    {
        id: '',
        nom :  '',
        prenom :  '',
        cne :  '',
        filiere :  '',
        groupKey :  '',
        encadrantId :  '',
        projectId :  ''
    };

    constructor(props) 
    {
        super(props);
        this.state = { encadrant: this.initialState };
        this.etudiantChange = this.etudiantChange.bind(this);
        this.updateEtudiant = this.updateEtudiant.bind(this);
        
    }

    etudiantChange(event) 
    {
        this.setState ({ [event.target.name] : event.target.value });
    }

    async updateEtudiant(event) {
        
        event.preventDefault();

        const id = this.props.match.params.id;
        
        const etudiant= {
            id:this.state.id,
            nom:this.state.nom,
            prenom:this.state.prenom,
            cne:this.state.cne,
            filiere:this.state.filiere,
            groupKey : " ",
            encadrantId :  " ",
            projectId :  " "
        }

        await axios.patch("https://miolaproject.herokuapp.com/etudiants/"+id, etudiant, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(response => {
            if (response.data != null) 
            {
                this.setState(this.initialState);
                this.setState({"showModifToast":true});
                setTimeout(() => this.setState({"showModifToast":false}), 1000);
                setTimeout(() => this.props.history.push('/etudiant'), 1000);
            }
            else {console.error("Error");}
        })
        
        }

    render(){

        return(
                <div>
                <NavigationBar/>
                <br/>
                <Jumbotron className="bg-dark text-white">
                    <h1><FontAwesomeIcon icon={faEdit} /> Modifier un étudiant</h1>
                    <blockquote className= "blockquote mb-0">
                        <p>Vous pouvez changer les informations que vous voulez et sauvegarder</p>
                    </blockquote>

                        <Card className={"border border-dark bg-dark text-white"}>

                            <div style={{"display":this.state.showModifToast ? "block" : "none"}}>
                            <ToastModif children = {{showModifToast:this.state.showModifToast, message:"Etudiant modifié avec succès.",type:"success"}}/> 
                            </div>

                            <Form onSubmit={this.updateEtudiant} id="EtudiantFormId">

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
                                <Button size="lm" variant="primary" type="submit"> Modifier </Button>
                            </Card.Footer>
                        </Form>
                        </Card>
                    </Jumbotron>
                </div>
            
);
}
}
export default  EtudiantModif;
