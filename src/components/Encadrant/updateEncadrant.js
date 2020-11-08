import React, { Component } from 'react'
import { Card, Form, Col , Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import {  faEdit } from '@fortawesome/free-solid-svg-icons';
import {Jumbotron} from 'react-bootstrap';
import axios from 'axios'
import ToastModif from '../Toasts/ToastModif';
import NavigationBar from '../Navigationbar';
import AuthService from '../services/auth.service'


const currUser  = AuthService.getCurrentUser();
var token = "";
if(currUser) { token = currUser.data.jwttoken; }  

class EncadrantModif extends Component {
   
    async componentDidMount() 
    {
        if(token !== "") 
        {
            const id = this.props.match.params.id;

            const res = await axios.get('https://miolaproject.herokuapp.com/encadrants/'+id , { headers: {"Authorization" : `Bearer ${token}`} });
            
            console.log(res.data.nom)

            this.setState({
                id: id,
                nom : res.data.nom,
                prenom : res.data.prenom,
                role : res.data.role,
                departement : res.data.departement
            });
        }
        else {this.props.history.push('/login') }
    }


    state = 
    {
        id:'',
        nom:'',
        prenom:'',
        role:'',
        departement:''
    };

    constructor(props) 
    {
        super(props);
        this.state = { encadrant: this.initialState };
        this.encadrantChange = this.encadrantChange.bind(this);
        this.updateEncadrant = this.updateEncadrant.bind(this)
    }

    encadrantChange(event) 
    {
        this.setState ({ [event.target.name] : event.target.value });
    }

    async updateEncadrant(event) {
        
        event.preventDefault();

        const id = this.props.match.params.id;
        
        const encadrant= {
            id:this.state.id,
            nom:this.state.nom,
            prenom:this.state.prenom,
            role:this.state.role,
            departement:this.state.departement
        }

        await axios.patch("https://miolaproject.herokuapp.com/encadrants/"+id, encadrant, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(response => {
            if (response.data != null) 
            {
                this.setState(this.initialState);
                this.setState({"showModifToast":true});
                setTimeout(() => this.setState({"showModifToast":false}), 1000);
                setTimeout(() => this.props.history.push('/encadrant'), 1000);
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
            <h1><FontAwesomeIcon icon={faEdit} /> Modifier un encadrant</h1>
            <blockquote className= "blockquote mb-0">
                <p>Vous pouvez changer les informations que vous voulez et sauvegarder</p>
            </blockquote>

                <Card className={"border border-dark bg-dark text-white"}>

                    <div style={{"display":this.state.showModifToast ? "block" : "none"}}>
                    <ToastModif children = {{showModifToast:this.state.showModifToast, message:"Encadrant modifié avec succès.",type:"success"}}/> 
                    </div>

                    <Form onSubmit={this.updateEncadrant} id="EncadrantFormId">

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
                        <Button size="lm" variant="primary" type="submit"> Modifier </Button>
                    </Card.Footer>
                </Form>
                </Card>
            </Jumbotron>
            </div>
            
);
}
}
export default  EncadrantModif;