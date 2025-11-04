import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  InputGroup,
} from "react-bootstrap";
import * as yup from "yup";
import { FiUser, FiMail, FiLock, FiPhone, FiUserPlus } from "react-icons/fi"; // 👈 import icons
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Login from "./Login";
import NavBar from "./NavBar";
// import { toast } from "react-toastify";

const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
    phone: yup.number().required(),
  })
  .required();

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate(); // 👈 instance banaya
  const RegisterData = async (data) => {
    // console.log("Form Data:", data);
    try {
      const res = await axios.post(`${BASE_URL}/reg`, data);

      // console.log("✅ Server Response:", res.data);
      navigate("/login");
      if (res?.data?.success) {
        Swal.fire({
          icon: "success",
          title: res.data.message,

          confirmButtonColor: "#3085d6",
        });
        // Optional: Reset form after successful submit
        reset();
      } else {
        Swal.fire({
          icon: "error",
          title: res.data.message,

          confirmButtonColor: "#3085d6",
        });
        // Optional: Reset form after successful submit
        // reset();
      }
    } catch (error) {
      // console.log(error);
      Swal.fire({
        icon: "error",
        title: "Server Error!",
        text:
          error.response?.data?.message ||
          "Unable to connect to the server. Please try again.",
        confirmButtonColor: "#d33",
      });
    }
  };
  // ✅ Function for Login Button
  const goToLogin = () => {
    navigate("/login"); // 👈 Replace with your login route
  };

  return (
    <>
      <Container fluid className="vh-100 p-0">
        <Row className="h-100 g-0">
          {/* Left Side - Image/Brand Section */}
          <Col md={6} className="  mt-5" style={{background:"linear-gradient(90deg, #4b6cb7 0%, #182848 100%)"}}>
            <div className="d-flex flex-column h-100 justify-content-between p-5 text-white  ">
              <div>
                <h1 className="display-4 fw-bold">Product Manager</h1>
                <p className="fs-5">Innovation Status Here</p>
              </div>

              <div className="text-center">
                <div className="bg-light rounded-3 p-4 text-dark">
                  <h3 className="text-primary mb-3">
                    You will be testing one of Lucy™'s core applications:
                    LUCYideas™
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

          {/* Right Side - Register Form */}
          <Col md={6}>
            <div className="d-flex align-items-center justify-content-center h-100 bg-light mt-5">
              <Card className="shadow border-0" style={{ width: "450px" }}>
                <Card.Body className="p-4">
                  <div className="text-center mb-4">
                    <h2 className="fw-bold text-primary">Create Account</h2>
                    <p className="text-muted">
                      Join us and start your journey with Us.
                    </p>
                  </div>

                  {/* <Form onSubmit={handleSubmit(RegisterData)}>
                  
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your full name"
                      {...register("name", {
                        required: "Full name is required"
                      })}
                    />
                    {errors.name && (
                      <Form.Text className="text-danger">
                        {errors.name.message}
                      </Form.Text>
                    )}
                  </Form.Group>

               
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                    />
                    {errors.email && (
                      <Form.Text className="text-danger">
                        {errors.email.message}
                      </Form.Text>
                    )}
                  </Form.Group>

              
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters"
                        }
                      })}
                    />
                    {errors.password && (
                      <Form.Text className="text-danger">
                        {errors.password.message}
                      </Form.Text>
                    )}
                  </Form.Group>
 
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Enter your phone number"
                      {...register("phone", {
                        required: "Phone number is required"
                      })}
                    />
                    {errors.phone && (
                      <Form.Text className="text-danger">
                        {errors.phone.message}
                      </Form.Text>
                    )}
                  </Form.Group>

                 
                  <Form.Group className="mb-4">
                    <Form.Check
                      type="checkbox"
                      label="I agree to the Terms and Conditions"
                      id="terms"
                      required
                    />
                  </Form.Group>

                
                  <div className="d-grid gap-2 mb-3">
                    <Button variant="primary" size="lg" type="submit">
                      Create Account
                    </Button>
                  </div>
                </Form> */}

                  <Form onSubmit={handleSubmit(RegisterData)} className="p-3">
                    {/* Full Name */}
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Full Name</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FiUser className="text-primary" />
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          placeholder="Enter your full name"
                          {...register("name", {
                            required: "Full name is required",
                          })}
                        />
                      </InputGroup>
                      {errors.name && (
                        <Form.Text className="text-danger">
                          {errors.name.message}
                        </Form.Text>
                      )}
                    </Form.Group>

                    {/* Email */}
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">
                        Email Address
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FiMail className="text-primary" />
                        </InputGroup.Text>
                        <Form.Control
                          type="email"
                          placeholder="Enter your email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address",
                            },
                          })}
                        />
                      </InputGroup>
                      {errors.email && (
                        <Form.Text className="text-danger">
                          {errors.email.message}
                        </Form.Text>
                      )}
                    </Form.Group>

                    {/* Password */}
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FiLock className="text-primary" />
                        </InputGroup.Text>
                        <Form.Control
                          type="password"
                          placeholder="Enter your password"
                          {...register("password", {
                            required: "Password is required",
                            minLength: {
                              value: 6,
                              message: "Password must be at least 6 characters",
                            },
                          })}
                        />
                      </InputGroup>
                      {errors.password && (
                        <Form.Text className="text-danger">
                          {errors.password.message}
                        </Form.Text>
                      )}
                    </Form.Group>

                    {/* Phone */}
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">
                        Phone Number
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FiPhone className="text-primary" />
                        </InputGroup.Text>
                        <Form.Control
                          type="tel"
                          placeholder="Enter your phone number"
                          {...register("phone", {
                            required: "Phone number is required",
                          })}
                        />
                      </InputGroup>
                      {errors.phone && (
                        <Form.Text className="text-danger">
                          {errors.phone.message}
                        </Form.Text>
                      )}
                    </Form.Group>

                    {/* Terms */}
                    <Form.Group className="mb-4 d-flex">
                      <Form.Check
                        type="checkbox"
                        label="I agree to the Terms and Conditions"
                        id="terms"
                        required
                      />
                    </Form.Group>

                    {/* Submit Button */}
                    <div className="d-grid gap-2 mb-2">
                      <Button
                        variant="primary"
                        size="lg"
                        type="submit"
                        className="fw-semibold"
                      >
                        <FiUserPlus className="me-2" /> Create Account
                      </Button>
                    </div>
                  </Form>

                  <div className="text-center">
                    <p className="text-muted mb-0">
                      Already have an account?{" "}
                      <Button
                        variant="link"
                        className="p-0 fw-semibold text-decoration-none"
                        onClick={goToLogin}
                      >
                        Login here
                      </Button>
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
