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

class EncadrantModif extends Component {
   
    async componentDidMount() 
    {
        if(token !== "")
        {
            const id = this.props.match.params.id;
            const res = await axios.get('https://miolaproject.herokuapp.com/groupes/'+id, { headers: {"Authorization" : `Bearer ${token}`} });
            this.setState({
                id: id,
                nom : res.data.nom
            });
        }
        else {this.props.history.push('/login') }
    }


    state = 
    {
        id:'',
        nom:''
    };

    constructor(props) 
    {
        super(props);
        this.state = { groupe: this.initialState };
        this.groupeChange = this.groupeChange.bind(this);
        this.updateGroupe = this.updateGroupe.bind(this)
    }

    groupeChange(event) 
    {
        this.setState ({ [event.target.name] : event.target.value });
    }

    async updateGroupe(event) {
        
        event.preventDefault();

        const id = this.props.match.params.id;
        
        const groupe= {
            id:this.state.id,
            nom:this.state.nom
        }

        await axios.patch("https://miolaproject.herokuapp.com/groupes/"+id, groupe, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(response => {
            if (response.data != null) 
            {
                this.setState(this.initialState);
                this.setState({"showModifToast":true});
                setTimeout(() => this.setState({"showModifToast":false}), 1000);
                setTimeout(() => this.props.history.push('/groupe'), 1000);
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
            <h1><FontAwesomeIcon icon={faEdit} /> Modifier un groupe</h1>
            <blockquote className= "blockquote mb-0">
                <p>Vous pouvez changer les informations que vous voulez et sauvegarder</p>
            </blockquote>

                <Card className={"border border-dark bg-dark text-white"}>

                    <div style={{"display":this.state.showModifToast ? "block" : "none"}}>
                    <ToastModif children = {{showModifToast:this.state.showModifToast, message:"Groupe modifié avec succès.",type:"success"}}/> 
                    </div>

                    <Form onSubmit={this.updateGroupe} id="GroupeFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridNom">
                                <Form.Label> Nom </Form.Label>
                                <Form.Control name="nom" autoComplete="off" required type="text"
                                className={"bg-dark text-white"}
                                value = {this.state.nom} onChange = {this.groupeChange} placeholder= "Entrez Nom Groupe"/>
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