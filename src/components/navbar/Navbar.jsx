import { Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Navbar.css";
import { BsFillMusicPlayerFill } from 'react-icons/bs';
import { WikiSearch } from '../wikisearch/WikiSearch';



const NavigationBar = () => {
    return (

        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/">
                    <BsFillMusicPlayerFill/>
                    Music Player</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/wikisearch">Wiki</Nav.Link>
                        <Nav.Link href="#about">About the developer</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}

export { NavigationBar };