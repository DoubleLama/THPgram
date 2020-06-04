import React from 'react';
import { Link } from "react-router-dom";
import { logoutUser } from '../../_Redux/_Auth/Actions'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'

export const Navigation = () => {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated)
    const disconnect = () => {
        dispatch(logoutUser())
    }
    return (
        <Navbar bg="light" expand="lg">
            <Link to="/"><Navbar.Brand >THPgram</Navbar.Brand></Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link><Link to="/">Accueil</Link></Nav.Link>
                    <NavDropdown title="Compte" id="basic-nav-dropdown">
                        {!isAuthenticated &&
                            <div>
                                <NavDropdown.Item><Link to="/login">Connexion</Link></NavDropdown.Item>
                                <NavDropdown.Item><Link to="/register">Inscription</Link></NavDropdown.Item>
                            </div>}
                        {isAuthenticated &&
                            <div>
                                <NavDropdown.Item><Link to="/profil">Profil</Link></NavDropdown.Item>
                                <Button onClick={disconnect} className="ml-2" variant="outline-danger">Se déconnecter</Button>
                            </div>
                        }
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}