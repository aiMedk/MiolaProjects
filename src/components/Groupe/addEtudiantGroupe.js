import React, { Component } from 'react'
import { Card, Form, Col , Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import {  faEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import {Jumbotron} from 'react-bootstrap';
import Select from 'react-select'
import axios from 'axios'
import NavigationBar from '../Navigationbar';
import AuthService from "../services/auth.service";


const currUser  = AuthService.getCurrentUser();
var token = "";
if(currUser) { token = currUser.data.jwttoken; }  

class addEtudiantGroupe extends Component {

    componentDidMount() {
      const id = this.props.match.params.id;

      fetch("https://miolaproject.herokuapp.com/groupes/"+id, { headers: {"Authorization" : `Bearer ${token}`} })
          .then((response) => response.json())
          .then((responseData) => {
            this.setState({ groupe: responseData });
            console.log(this.state.groupe)
          })
          .catch((err) => console.error(err));


        fetch("https://miolaproject.herokuapp.com/etudiants", { headers: {"Authorization" : `Bearer ${token}`} })
          .then((response) => response.json())
          .then((responseData) => {
            this.setState({ Etudiants: responseData });
          })
          .catch((err) => console.error(err));


      }

      constructor(props) {
        super(props);
        this.state = { Etudiants: [] ,groupe:"", value:[] };

        this.handleChange = this.handleChange.bind(this);
        this.ajoutEtudiantGroupe = this.ajoutEtudiantGroupe.bind(this);

      }

      ajoutEtudiantGroupe(event) {
        event.preventDefault();
        alert('Votre parfum favori est : ' + this.state.value);

        }

        handleChange(event) {
          this.setState({value: event.target.value});
        }
      

    render() {
        return (
          <div>
 <      NavigationBar/>
             <br/>
        <Jumbotron className="bg-dark text-white">
                <h1><FontAwesomeIcon icon={faUserPlus} /> Ajouter des étudiants à ce groupe</h1>
                <blockquote className= "blockquote mb-0">
                    <p>Vous pouvez choisir les étudiants que vous voulez pour les ajouter à ce groupe</p>
                </blockquote>

                <Card className={"border border-dark bg-dark text-white"}>
                    <Form onSubmit={this.ajoutEtudiantGroupe} id="GroupeFormId">
                        <Card.Body>
                        <Form.Group controlId="ControlEtudiants">
                          <Form.Label>Liste des étudiants</Form.Label>
                          <Form.Control name="listeEtudiants" value={this.state.value} as="select" onChange={this.handleChange}>
                          {this.state.Etudiants.map((etudiant) => ( 
                            <option value={etudiant.id}>{etudiant.nom + " " +etudiant.prenom } </option>
                                ))}
                          </Form.Control>
                        </Form.Group>
                        </Card.Body>

                        <Card.Footer style={{"textAlign":"center"}}>
                            <Button size="lm" variant="success" type="submit"> Valider </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </Jumbotron>
          </div>
            
        )
    }
}
export default addEtudiantGroupe;