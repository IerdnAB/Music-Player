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

  // const downloadFile = () => {
  //   fetch(cv, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/pdf',
  //     },
  //   })
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       // Create blob link to download
  //       const url = window.URL.createObjectURL(
  //         new Blob([blob]),
  //       );
  //       const link = document.createElement('a');
  //       link.href = url;
  //       link.setAttribute(
  //         'download',
  //         `FileName.pdf`,
  //       );

  //       // Append to html link element page
  //       document.body.appendChild(link);

  //       // Start download
  //       link.click();

  //       // Clean up and remove the link
  //       link.parentNode.removeChild(link);
  //     });

  // }






  return (
    <>
      <button className="cv-button" onClick={handleShow}>
        About the developer
      </button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Body>
          <Offcanvas.Title>Andrei Bumbea - Junior React Developer</Offcanvas.Title>
          <p>A software developer passionately opened for a new professional challenge and ready to take on responsibilities. Reliable team member always ready to help. Quick learner with problem-solving and decision-making mindset, and excellent interpersonal skills.</p>
          <Button variant="dark"><a href={cv}>CV</a></Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export { Example }