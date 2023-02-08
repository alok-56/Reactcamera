import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

function Cam() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [img, setImg] = useState(null);
  const [down, setDown] = useState(true)
  const webcamRef = useRef(null);
  const [hide, setHide] = useState(true)

  const videoConstraints = {
    width: 420,
    height: 420,
    facingMode: "user",
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);
  }, [webcamRef]);

  function handle() {
    handleShow();
    setHide(false);
  }
  function handleabc() {
    setHide(true)
    setDown(true);

  }
  function fun() {
    setDown(false);
    setImg(null)
  }

  const download = e => {
    toast("downloaded successfully")
    setHide(true)
    setDown(true);
    fetch(e.target.href, {
      method: "GET",
      headers: {}
    })
      .then(response => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "image.png"); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div>
      <ToastContainer style={{ marginRight: "400px" }} />
      {
        hide ? <div className="container">
          <div className="row">
            <div className="col-12 text-center" >
              <div className="text-center m-auto mt-5" style={{ height: "400px", width: "300px", backgroundColor: "black", borderRadius: "5px" }}>
                <i style={{ marginLeft: "210px", color: "#fff", marginTop: "20px" }} class="fa-solid fa-backward-fast"></i>
                <div>
                  <Webcam
                    audio={false}
                    mirrored={true}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    style={{
                      width: "200px", border: "2px solid #fff", padding: "5px",
                      backgroundColor: "black", marginTop: "30px"
                    }}
                    videoConstraints={videoConstraints}
                  />
                </div>
                <div style={{ marginTop: "60px", display: "flex", justifyContent: "center" }}>
                  <img onClick={handle} style={{ width: "50px", height: "50px", position: "relative", right: "70px", border: "1px solid #fff", backgroundColor: "red" }} src={img} alt="screenshot" />
                  <button style={{ borderRadius: "50%", padding: "5px", width: "50px", height: "50px", marginRight: "20px" }} onClick={capture}></button>
                </div>
              </div>
            </div>
          </div>
        </div> : <div>
          <div className='conatiner mt-5'>
            <div className='row'>
              <div className='col-12 '>
                <div>
                  <Modal show={show} onHide={handleClose} style={{ marginTop: "100px", }} >
                    <Modal.Body style={{ backgroundColor: "black" }}>
                      <div className='text-center m-auto ' style={{ width: "200px", height: "250px" }}>
                        <img style={{ width: "200px", height: "150px", padding: "25px", marginTop: "20px", position: "relative", border: "1px solid #fff" }} src={img} alt="screenshot" />
                        {
                          down ? <a
                            href={img}
                            download
                            onClick={e => download(e)}
                          ><i class="fa-solid fa-download" style={{ fontSize: "30px", color: "#fff", marginTop: "15px" }}></i></a> : null
                        }
                        <i onClick={fun} class="fa-solid fa-trash" style={{
                          position: "relative",
                          top: "-170px",
                          left: "70px",
                          color: "red"
                        }}></i>
                      </div>
                      <button onClick={handleabc} className='btn btn-primary ml-5'>Back</button>
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Cam;