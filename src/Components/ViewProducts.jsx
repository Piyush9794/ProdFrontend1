import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaCheckCircle } from "react-icons/fa";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaHeart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
export default function ViewProducts() {
  const { isLoggedIn, user } = useAuth();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: selectedProduct?.name || "",
    price: selectedProduct?.price || "",
    description: selectedProduct?.description || "",
    image: null,
  });
  // ✅ Update input when product changes
  React.useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name,
        price: selectedProduct.price,
        description: selectedProduct.description,
        image: null,
      });
    }
  }, [selectedProduct]);

  const fetchProducts = async () => {
    try {
      if (!user?.email) {
        // alert("⚠️ User not logged in or email missing");
        setLoading(false);
        return;
      }

      // send email to backend (POST method is better for this)
      const res = await axios.post(`${BASE_URL}/fetch`, {
        email: user.email,
      });

      if (res.data.success) {
        setProducts(res.data.data);
      } else {
        // alert("❌ Failed to load products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      // alert("⚠️ Server Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchProducts();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    fetchProducts();
  }, []);
  // ✅ Update Product

  // ✅ Open Modal for Edit
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
    });
    setShow(true);
  };

  // ✅ Handle Delete
  const handleDelete = async (id) => {
    try {
      const result = await axios.delete(`${BASE_URL}/del-prod/${id}`);

      if (result.data.success) {
        Swal.fire({
          icon: "success",
          title: result.data.message || "Product Deleted Successfully!",
          showConfirmButton: false,
          timer: 1500, // auto-close after 1.5 sec
        });
        fetchProducts(); // refresh list
      } else {
        Swal.fire({
          icon: "error",
          title: result.data.message || "Failed to delete product!",
          confirmButtonColor: "#3085d6",
        });
      }
    } catch (error) {
      // console.error("Error deleting product:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: error.response?.data?.message || error.message,
        confirmButtonColor: "#3085d6",
      });
    }
  };

  // ✅ Handle form submit
  const handleEditProduct = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("description", formData.description);
      if (formData.image) data.append("img", formData.image);

      const res = await axios.put(
        `${BASE_URL}/Upd-prod/${selectedProduct._id}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Product Updated 🎉",
          text: res.data.message || "Changes saved successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        fetchProducts(); // Refresh list
        setShow(false); // Close modal
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed!",
          text: res.data.message || "No changes were made.",
          confirmButtonColor: "#3085d6",
        });
      }
    } catch (error) {
      // console.error("Error updating product:", error);
      Swal.fire({
        icon: "error",
        title: "Server Error ⚠️",
        text: error.response?.data?.message || error.message,
        confirmButtonColor: "#3085d6",
      });
    }
  };
  // ✅ Loader
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container py-5 mt-5"
      style={{
        background:
          "linear-gradient(135deg, #f0f8ff 0%, #e0f7fa 50%, #f1f8e9 100%)",
        minHeight: "100vh",
      }}
    >
      <h2 className="text-center mb-5 fw-bold text-primary">
        🛍️ Product Gallery
      </h2>

      <div className="row g-4 justify-content-center">
        {products.length === 0 ? (
          <div className="text-center text-muted fs-4">No Products Found</div>
        ) : (
          products.map((item, index) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={index}>
              <div
                className="card shadow-md border-0 text-center"
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 10px rgba(0,0,0,0.05)";
                }}
              >
                <img
                  src={`${BASE_URL}/uploads/${item.img}`}
                  className="img-fluid justify align-center mt-2"
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "330px",
                    objectFit: "cover",
                  }}
                />

                <div className="card-body">
                  <h5 className="fw-bold d-flex justify-content-center align-items-center gap-2 mb-1">
                    {item.name}
                    <FaCheckCircle color="#4caf50" />
                  </h5>
                  <p className="text-muted small mb-2">{item.description}</p>
                  <p className="fw-bold text-success fs-6">₹{item.price}</p>
                </div>

                {/* ✅ Edit + Delete Buttons */}
                <div className="d-flex justify-content-center gap-3 pb-3">
                  <button
                    className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"
                    onClick={() => handleEdit(item)}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
                    onClick={() => handleDelete(item._id)}
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ✅ Edit Modal */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditProduct}>
            {/* Name */}
            <Form.Group className="mb-3">
              <Form.Label>Name *</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </Form.Group>

            {/* Price */}
            <Form.Group className="mb-3">
              <Form.Label>Price *</Form.Label>
              <Form.Control
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                required
              />
            </Form.Group>

            {/* Description */}
            <Form.Group className="mb-3">
              <Form.Label>Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </Form.Group>

            {/* Image Upload */}
            <Form.Group className="mb-3">
              <Form.Label>Upload New Image (optional)</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.files[0] })
                }
              />
            </Form.Group>

            {/* Submit */}
            <Button variant="primary" type="submit" className="w-100">
              Update Product
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
