import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="text-white   py-5"
      style={{
        background: "linear-gradient(90deg, #4b6cb7 0%, #182848 100%)",
      }}
    >
      <Container>
        <Row className="align-items-start mb-5">
          {/* Left Section */}
          <Col md={6} lg={4} className="mb-4 mb-md-0">
            <div className="mb-3">
              <h4 className="fw-bold">ATARAXIS</h4>
            </div>
            <p className="text-white  mb-4">
              Empowering physicians with advanced multi-modal tools to improve
              treatment selection and patient outcomes. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit.
            </p>

            {/* Social Icons */}
            <div className="footer-social">
              <a href="#" className="social-icon" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="social-icon" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="#" className="social-icon" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className="social-icon" aria-label="Facebook">
                <FaFacebook />
              </a>
            </div>

            {/* Back to Top Button */}
            <div className="mt-3">
              <button
                onClick={scrollToTop}
                className="btn btn-outline-light btn-sm px-4 py-2 rounded-pill"
                style={{ borderColor: "rgba(255,255,255,0.4)" }}
              >
                ↑ BACK TO TOP
              </button>
            </div>
          </Col>

          {/* Site Map */}
          <Col md={3} lg={4} className="mb-4 mb-md-0">
            <h6 className="fw-bold mb-3">Site Map</h6>
            <ul className="list-unstyled text-white-50 small">
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white ">
                  Homepage
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white ">
                  Technology
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white ">
                  Ataraxis Breast
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white ">
                  Resources & News
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white ">
                  Careers
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white ">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-white ">
                  Portal
                </a>
              </li>
            </ul>
          </Col>

          {/* Legal */}
          <Col md={3} lg={4}>
            <h6 className="fw-bold mb-3">Legal</h6>
            <ul className="list-unstyled text-white small">
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white ">
                  Privacy Policy
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white ">
                  Terms of Services
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none text-white ">
                  Lawyer’s Corner
                </a>
              </li>
            </ul>
          </Col>
        </Row>

        <hr style={{ borderColor: "rgba(255,255,255,0.2)" }} />

        <Row className="justify-content-center">
          <Col
            lg={12} /* large screen par 6/12 width */
            md={8} /* medium screen par 8/12 width */
            sm={10} /* small screen par 10/12 width */
            xs={11} /* extra small (mobile) par 11/12 width */
            className="text-center rounded-5 py-2"
            style={{ background: "#d99934" }}
          >
            <p className=" text-white mb-0">
              © 2025 Piyush Vishwakarma — All Rights Reserved.
              
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
