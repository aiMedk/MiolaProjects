import React from 'react';
import {Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import LogOut from './authentication/LogOut';

class Navigationbar extends React.Component {
 
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-10">
                        <Navbar bg="dark" variant="dark">
                            <Link to={"/home"} className="nav-link">Home</Link>
                            <Link to={"/projet"} className="nav-link">Projets</Link>
                            <Link to={"/encadrant"} className="nav-link">Encadrants</Link>
                            <Link to={"/etudiant"} className="nav-link">Etudiants</Link>
                            <Link to={"/groupe"} className="nav-link">Groupes</Link>
                            <Link to={"/seance"} className="nav-link">Séances d'encadrements</Link>
                        </Navbar>
                    </div>
                    <div className="col-sm-2">
                        <LogOut/>
                    </div>
                </div>
            </div>
        );
    }
}
export default Navigationbar;