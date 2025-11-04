import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import Swal from "sweetalert2";
// import Footer from "./Footer";
import NavBar from "./NavBar";
import { useAuth } from "../context/AuthContext"; // ✅ import AuthContext
import { FiMail, FiLock, FiLogIn } from "react-icons/fi"; // 👈 react-icons import
const schema = yup
  .object()
  .shape({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const { loginUser } = useAuth(); // ✅ get login function from context

  const LoginDataFunction = async (data) => {
    // console.log("Form Data:", data);

    // ✅ call login function from context
    const result = await loginUser(data.email, data.password);

    if (result.success) {
      Swal.fire({
        icon: "success",
        title: result.message,
        confirmButtonColor: "#3085d6",
      });

      reset();
      navigate("/AddProduct");
    } else {
      Swal.fire({
        icon: "error",
        title: result.message,
        confirmButtonColor: "#3085d6",
      });
    }
  };

  // ✅ Go to Register Page
  const goToLogin = () => {
    navigate("/Register");
  };

  return (
    <>
      {/* <NavBar /> ✅ navbar me user name show hoga */}
      <Container fluid className="vh-100 p-0 mt-5">
        <Row className="h-100 g-0">
          {/* Left Side - Image/Brand Section */}
          <Col
            md={6}
            className=" "
            style={{
              background: "linear-gradient(90deg, #4b6cb7 0%, #182848 100%)",
            }}
          >
            <div className="d-flex flex-column h-100 justify-content-between p-5 text-white">
              <div>
                <h1 className="display-4 fw-bold">Product Manager</h1>
                <p className="fs-5">Innovation Status Here</p>
              </div>

              <div className="text-center">
                <div className="bg-light rounded-3 p-4 text-dark">
                  <h3 className="text-primary mb-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Totam, ea.: LUCYideas™
                  </h3>
                  <p className="mb-1 fw-semibold">What to Expect?</p>
                  <p className="mb-0 fw-semibold">Other Future Applications</p>
                </div>
              </div>

              <div className="text-center">
                <small>© 2024 LUCY™. All rights reserved.</small>
              </div>
            </div>
          </Col>

          {/* Right Side - Login Form */}
          <Col md={6}>
            <div className="d-flex align-items-center justify-content-center h-100 bg-light">
              <Card className="shadow border-0" style={{ width: "400px" }}>
                <Card.Body className="p-4">
                  <div className="text-center mb-4">
                    <h2 className="fw-bold text-primary">LOGIN</h2>
                    <p className="text-muted">
                      Welcome back! Please login to your account.
                    </p>
                  </div>

                  <Form
                    onSubmit={handleSubmit(LoginDataFunction)}
                    className="p-3"
                  >
                    {/* Email Field */}
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">
                        Email <span className="text text-danger">*</span>
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FiMail className="text-primary" />
                        </InputGroup.Text>
                        <Form.Control
                          type="email"
                          placeholder="thisishirnel@gmail.com"
                          {...register("email")}
                        />
                      </InputGroup>
                      {errors.email && (
                        <Form.Text className="text-danger">
                          {errors.email.message}{" "}
                          <span className="text text-danger">*</span>
                        </Form.Text>
                      )}
                    </Form.Group>

                    {/* Password Field */}
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">
                        Password <span className="text text-danger">*</span>
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FiLock className="text-primary" />
                        </InputGroup.Text>
                        <Form.Control
                          type="password"
                          placeholder="Enter your password"
                          {...register("password")}
                        />
                      </InputGroup>
                      {errors.password && (
                        <Form.Text className="text-danger">
                          {errors.password.message}{" "}
                          <span className="text text-danger">*</span>
                        </Form.Text>
                      )}
                    </Form.Group>

                    {/* Remember Me */}
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="checkbox"
                        label="Remember me"
                        id="rememberMe"
                      />
                    </Form.Group>

                    {/* Login Button */}
                    <div className="d-grid gap-2 mb-3">
                      <Button
                        variant="primary"
                        size="lg"
                        type="submit"
                        className="fw-semibold"
                      >
                        <FiLogIn className="me-2" /> Log in
                      </Button>
                    </div>
                  </Form>
                  <div className="text-center">
                    <p className="text-muted mb-0">
                      Don't have an account?{" "}
                      <Button
                        variant="link"
                        className="p-0 fw-semibold text-decoration-none"
                        onClick={goToLogin}
                      >
                        Sign Up
                      </Button>
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
      {/* <Footer /> */}
    </>
  );
};

export default Login;
