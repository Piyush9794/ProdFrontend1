import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const PortfolioSectionWithIcons = () => {
  const services = [
    {
      number: "#01",
      title: "Strategy & Planning",
      description:
        "Comprehensive research and strategic approach for your project success.",
      icon: "📊",
    },
    {
      number: "#02",
      title: "Design & Development",
      description:
        "Creative design solutions with technical excellence and attention to detail.",
      icon: "🎨",
    },
    {
      number: "#03",
      title: "Launch & Growth",
      description:
        "Successful project deployment and strategies for continuous growth.",
      icon: "🚀",
    },
    {
      number: "#04",
      title: "Ongoing Support",
      description:
        "Continuous maintenance and support to keep your project running smoothly.",
      icon: "🔧",
    },
  ];

  return (
    <>
      <section className="py-5 bg-white ">
        <Container>
          <Row className="align-items-center">
            {/* Left Content */}
            <Col lg={6} className="mb-5 mb-lg-0">
              <div className="pe-lg-5">
                <h2 className="display-6 fw-bold text-dark mb-4">
                  Behind the Designs
                </h2>

                <h3 className="h4 text-secondary mb-4">
                  Curious What Else I've
                  <br />
                  <span className="text-dark">Created?</span>
                </h3>

                <p className="text-muted mb-4 fs-5">
                  Explore more brand identities, packaging, and digital design
                  work in my extended portfolio.
                </p>

                <Button
                  variant="outline-dark"
                  size="lg"
                  className="px-4 py-2 fw-semibold"
                >
                  See more Projects →
                </Button>
              </div>
            </Col>

            {/* Right Content */}
            <Col lg={6}>
              <Row className="g-4 ">
                {services.map((service, index) => (
                  <Col md={6} key={index}>
                    <Card
                      className="h-100 border-0 text-white  "
                      style={{
                        background:
                          "linear-gradient(90deg, #4b6cb7 0%, #182848 100%)",
                        
                      }}
                    >
                      <Card.Body className="p-4 ">
                        <div className="d-flex align-items-start ">
                          <div className="me-3 ">
                            <span className="fs-2 text-white">
                              {service.icon}
                            </span>
                          </div>
                          <div>
                            <span className="  fw-bold fs-5 text-white">
                              {service.number}
                            </span>
                            <h5 className="fw-bold mb-2 mt-1 text-white">
                              {service.title}
                            </h5>
                            <p className="mb-0 small text-white">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      <div
        className="d-flex flex-column align-items-center justify-content-center text-center text-white p-4"
        style={{
          background: "linear-gradient(90deg, #4b6cb7 0%, #182848 100%)",
          minHeight: "350px",
          padding: "3rem 1rem",
        }}
      >
        <h2 className="fw-bold mb-3" style={{ fontSize: "2.5rem" }}>
          Pronto para transformar o seu negócio?
        </h2>

        <p className="mb-4 opacity-90" style={{ fontSize: "1.25rem" }}>
          Agende uma avaliação gratuita e descubra como a Azimute pode ajudar a
          sua empresa.
        </p>

        <button
          className="btn btn-light fw-bold border-0 px-4 py-2"
          style={{
            borderRadius: "25px",
            fontSize: "1.1rem",
            color: "#667eea",
          }}
        >
          Agende já uma avaliação gratuita
        </button>
      </div>
    </>
  );
};

export default PortfolioSectionWithIcons;
