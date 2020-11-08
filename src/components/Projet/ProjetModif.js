import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import {  faEdit } from '@fortawesome/free-solid-svg-icons';
import {Jumbotron} from 'react-bootstrap';
import {  Button, Card, Form, Col } from 'react-bootstrap';
import ToastModif from '../Toasts/ToastModif';
import axios from 'axios';
import AuthService from "../services/auth.service";



const currUser  = AuthService.getCurrentUser();
var token = "";
if(currUser) { token = currUser.data.jwttoken; }  

class ProjetModif extends Component {

    async componentDidMount() 
    {
        if(token !== "") 
        {
            const id = this.props.match.params.id;

            const res = await axios.get('https://miolaproject.herokuapp.com/projets/'+id, { headers: {"Authorization" : `Bearer ${token}`} });
            
            console.log(res.data.titre)

            this.setState({
                id: id,
                titre : res.data.titre,
                description : res.data.description,
                theme : res.data.theme,
                duree : res.data.duree,
                technologies : res.data.technologies
            });

        }
        else {this.props.history.push('/login') }

    }


    state = 
    {
        id: '',
        titre : '',
        description : '',
        theme : '',
        duree : '',
        technologies : {}
    };

    constructor(props) 
    {
        super(props);
        this.state = { projet: this.initialState };
        this.projetChange = this.projetChange.bind(this);
        this.modifProjet = this.modifProjet.bind(this)
    }

    projetChange(event) 
    {
        this.setState ({ [event.target.name] : event.target.value });
    }

    async modifProjet(event) {
        
        event.preventDefault();

        const id = this.props.match.params.id;
        
        const projet= {

            id:this.state.id,
            titre:this.state.titre,
            description:this.state.description,
            theme:this.state.theme,
            duree:this.state.duree,
            technologies:this.state.technologies
        }

        await axios.patch("https://miolaproject.herokuapp.com/projets/"+id, projet, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(response => {
            if (response.data != null) 
            {
                this.setState(this.initialState);
                this.setState({"showModifToast":true});
                setTimeout(() => this.setState({"showModifToast":false}), 1000);
                setTimeout(() => this.props.history.push('/projet'), 1000);
            }
        })
        
        }

    render() {
        return (
        <Jumbotron className="bg-dark text-white">
            <h1><FontAwesomeIcon icon={faEdit} /> Modifier un projet</h1>
            <blockquote className= "blockquote mb-0">
                <p>Vous pouvez changer les informations que vous voulez et sauvegarder</p>
            </blockquote>

            <Card className={"border border-dark bg-dark text-white"}>

                <div style={{"display":this.state.showModifToast ? "block" : "none"}}>
                <ToastModif children = {{showModifToast:this.state.showModifToast, message:"Projet modifié avec succès.",type:"success"}}/> 
                </div>

                <Form onSubmit={this.modifProjet} id="ProjetFormId">

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
                    <Button size="lm" variant="primary" type="submit"> Modifier </Button>
                </Card.Footer>
                </Form>
                </Card>
        </Jumbotron>
        )
    }
}
export default ProjetModif;
