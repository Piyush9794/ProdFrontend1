import React from "react";
import { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel, Card, Button, Container, Row, Col } from "react-bootstrap";
import NavBar from "./NavBar";
import PortfolioSectionWithIcons from "./PortfolioSectionWithIcons";
import Footer from "./Footer";


export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesPerPage = 4;
  const products = [
    {
      id: 1,
      name: "Bloom Essential Oil",
      description: "Pure essential oil for relaxation and wellness",
      image: "https://picsum.photos/300/200?random=1",
      price: "$24.99",
    },
    {
      id: 2,
      name: "Viva Skin Cream",
      description: "Natural skin care for radiant complexion",
      image: "https://picsum.photos/300/200?random=2",
      price: "$19.99",
    },
    {
      id: 3,
      name: "Petaleo Shampoo",
      description: "Organic shampoo for healthy hair",
      image: "https://picsum.photos/300/200?random=3",
      price: "$15.99",
    },
    {
      id: 4,
      name: "Bloom Diffuser",
      description: "Aromatherapy diffuser for your home",
      image: "https://picsum.photos/300/200?random=4",
      price: "$29.99",
    },
    {
      id: 5,
      name: "Viva Face Mask",
      description: "Detoxifying clay mask for clear skin",
      image: "https://picsum.photos/300/200?random=5",
      price: "$12.99",
    },
    {
      id: 6,
      name: "Petaleo Conditioner",
      description: "Nourishing conditioner for soft hair",
      image: "https://picsum.photos/300/200?random=6",
      price: "$14.99",
    },
  ];
  const nextSlide = () => {
    setCurrentSlide(
      (prev) => (prev + 1) % Math.ceil(products.length / slidesPerPage)
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? Math.ceil(products.length / slidesPerPage) - 1 : prev - 1
    );
  };

  const getCurrentProducts = () => {
    const start = currentSlide * slidesPerPage;
    return products.slice(start, start + slidesPerPage);
  };

  return (
    <>
      {/* <NavBar /> */}

      {/* 🔹 Hero Section */}
      <header className="bg-light text-center py-5 mt-5 ">
        <div className="container">
          <h1 className="fw-bold text-primary mb-3">
            Welcome to Product Manager
          </h1>
          <p className="text-muted fs-5">
            Manage your products easily — Add, Edit, Delete and track your items
            in one place.
          </p>
          <a href="/login" className="btn btn-primary btn-lg mt-3">
            ➕ Add New Product
          </a>
        </div>
      </header>
      <PortfolioSectionWithIcons />
      {/* 🔹 Product Preview Section */}
      <section className="py-5 bg-white">
        <Container>
          <h2 className="fw-bold text-center mb-4 text-primary">
            Featured Products
          </h2>

          {/* Products Grid */}
          <Row className="g-4 mb-4">
            {getCurrentProducts().map((product) => (
              <Col key={product.id} sm={6} md={4} lg={3}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="h6">{product.name}</Card.Title>
                    <Card.Text className="text-muted flex-grow-1 small">
                      {product.description}
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <span className="fw-bold text-primary">
                        {product.price}
                      </span>
                      <Button variant="outline-primary" size="sm">
                        Add to Cart
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Small Slider Controls */}
          <div className="text-center">
            <p className="text-muted mb-2 small">
              Showing {Math.ceil(products.length / slidesPerPage)} pages of
              products
            </p>

            {/* Custom Small Slider */}
            <div className="d-flex align-items-center justify-content-center">
              {/* Previous Button */}
              <Button
                variant="outline-primary"
                size="sm"
                className="me-3"
                onClick={prevSlide}
              >
                ‹
              </Button>

              {/* Slider Dots */}
              <div className="d-flex">
                {Array.from({
                  length: Math.ceil(products.length / slidesPerPage),
                }).map((_, index) => (
                  <button
                    key={index}
                    className={`btn btn-sm mx-1 p-0 ${
                      index === currentSlide ? "text-primary" : "text-muted"
                    }`}
                    style={{
                      border: "none",
                      background: "none",
                      fontSize: "24px",
                      lineHeight: "1",
                    }}
                    onClick={() => setCurrentSlide(index)}
                  >
                    •
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <Button
                variant="outline-primary"
                size="sm"
                className="ms-3"
                onClick={nextSlide}
              >
                ›
              </Button>
            </div>
          </div>
        </Container>
      </section>
      {/* 🔹 Footer */}
      {/* <footer className="bg-primary text-light text-center py-3 mt-5">
        <p className="mb-0">
          © {new Date().getFullYear()} ProductManager | Built with ❤️ using MERN
          Stack
        </p>
      </footer> */}
      <Footer />
    </>
  );
}
