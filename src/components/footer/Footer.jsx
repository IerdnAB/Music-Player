import { Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import './Footer.css';


const Footer = () => {
    return (
        <Navbar bg="dark" variant="dark" fixed="bottom" expand="lg">
            <Container>
                <a href="https://github.com/IerdnAB" target="blank"><i><BsGithub /></i></a>
                <a href="https://linkedin.com/in/andrei-bumbea-051632137" target="blank"><i><BsLinkedin /></i></a>
            </Container>
        </Navbar >
    )

}


export { Footer };