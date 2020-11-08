import React, { Component } from "react";
import {BrowserRouter as Router, Switch, Route, } from 'react-router-dom';
import { Container, Row, Col} from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home'
import ProjetList from './components/Projet/ProjetList'
import ProjetModif from './components/Projet/ProjetModif'
import EncadrantsList from './components/Encadrant/EncadrantsList';
import updateEncadrant from './components/Encadrant/updateEncadrant';
import EtudiantsList from './components/Etudiant/EtudiantList';
import updateEtudiant from './components/Etudiant/UpdateEtudiant';
import GroupesList from './components/Groupe/GroupesList';
import updateGroupe from './components/Groupe/updateGroupe';
import ajoutEtudiantGroupe from './components/Groupe/addEtudiantGroupe';
import PageNotFound from './components/PageNotFound'

import Dashboard from "./components/authentication/Dashboard";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Profile from "./components/authentication/Profile";
import BoardUser from "./components/authentication/BoardUser";
import BoardModerator from "./components/authentication/BoardModerator";
import BoardAdmin from "./components/authentication/BoardAdmin";


class App extends Component {
  render()
  {
    const marginTop = { marginTop:"20px"}
    return (
      <Router>
          <Container>
            <Row>
              <Col lg={12} style={marginTop}>
              <Switch>
               
                <Route path={["/", "/login"]} exact component={Login}/>
                
                <Route path="/home" exact component={Home}/>
                
                <Route path="/encadrant" exact component={EncadrantsList}/>
                <Route path="/encadrant/modif/:id" exact component={updateEncadrant}/>

                <Route path="/etudiant" exact component={EtudiantsList}/>
                <Route path="/etudiant/modif/:id" exact component={updateEtudiant}/>
                
                <Route path="/projet" exact component={ProjetList}/>
                <Route path="/projet/modif/:id" exact component={ProjetModif}/>

                <Route path="/groupe" exact component={GroupesList}/>
                <Route path="/groupe/modif/:id" exact component={updateGroupe}/>
                <Route path="/groupe/ajoutetudiant/:id" exact component={ajoutEtudiantGroupe}/>

                <Route path="/dashboard" exact component={Dashboard}/>

                <Route path="/register" exact component={Register} /> 
                <Route path="/profile" exact component={Profile} /> 

                <Route path="/user"exact component={BoardUser} /> 
                <Route path="/mod" exact component={BoardModerator} /> 
                <Route path="/admin" exact component={BoardAdmin}/>

                <Route component={PageNotFound} />

              </Switch>
              </Col>
            </Row>
          </Container>
      </Router>
    );
  }
}
export default App;
