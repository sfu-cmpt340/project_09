import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom'

import Home from '../pages/Home';
import ModifiedPictures from '../pages/ModifiedPictures';

export default class NavbarComp extends Component {
  render() {
    return (
    <Router>
      <div>
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to={"/home"}>SAM Segmentation Machine</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to={"/home"}>Home</Nav.Link>
                    <Nav.Link as={Link} to={"/modifiedpictures"}>Processed Images</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <div>
            <Routes>
                <Route index element={<Home/>}></Route>
                <Route path="/home" element={<Home/>}></Route>
                <Route path="/modifiedpictures" element={<ModifiedPictures/>}></Route>
            </Routes>
        </div>
      </div>
    </Router>
    )
  }
}
