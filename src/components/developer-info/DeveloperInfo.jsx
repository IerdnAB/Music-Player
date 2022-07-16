import { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/firebase';

import './DeveloperInfo.css'



function Example() {

  const [show, setShow] = useState(false);
  const [cv, setCv] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  getDownloadURL(ref(storage, 'cv/Andrei Bumbea - CV.pdf'))
    .then((url) => {
      setCv(url);

    })
    .catch((error) => {
      // Handle any errors
    });




  return (
    <>
      <button className="cv-button" onClick={handleShow}>
        About the developer
      </button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Body>
          <Offcanvas.Title>Andrei Bumbea - Junior React Developer</Offcanvas.Title>
          <p>A software developer passionately opened for a new professional challenge and ready to take on responsibilities. Reliable team member always ready to help. Quick learner with problem-solving and decision-making mindset, and excellent interpersonal skills.</p>
          <a href={cv} target="blank" class="cv-download">CV</a>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export { Example }