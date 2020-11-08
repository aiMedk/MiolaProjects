import React, { Component } from 'react'
import { Button, Navbar} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import AuthService from "../services/auth.service";
import { Link } from 'react-router-dom';


class LogOut extends Component {

    LogOut = (event) =>
    {
        AuthService.logout();
    }

    render() {
        return (
            <div>
                <Navbar bg="light" variant="light">
                    <Link to={{ pathname: `/login`}}><Button size="sm" style={{"right":"50px","display":"block"}} onClick={this.LogOut} variant="outline-danger"> <FontAwesomeIcon icon={faSignOutAlt} />Deconnexion</Button> </Link>
                </Navbar>
            </div>
        )
    }
}
export default LogOut;
