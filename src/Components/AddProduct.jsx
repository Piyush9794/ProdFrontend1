import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function AddProduct() {
  const { user } = useAuth(); // 👈 ye user ka email dega
  // console.log("+++++++++++++++", user);
  const [preview, setPreview] = useState(null);

  // ✅ React Hook Form initialization
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  // 🔹 Image Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };
 

  const onSubmit = async (data) => {
    try {
      // console.log("📦 Product Data:", data);

      // ✅ Create FormData
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("img", data.image[0]);
      formData.append("email", user?.email); // 👈 logged-in user email

      const res = await axios.post(`${BASE_URL}/add-Product`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Product Added Successfully!",
          text: res.data.message || "Your product has been uploaded.",
          showConfirmButton: false,
          timer: 1500,
        });

        reset(); // clear form
        setPreview(null);
        navigate("/ViewProducts"); // redirect
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to Add Product",
          text: res.data.message || "Something went wrong!",
          confirmButtonColor: "#3085d6",
        });
      }
    } catch (error) {
      // console.error("Error adding product:", error);
      Swal.fire({
        icon: "error",
        title: "Server Error ⚠️",
        text: error.response?.data?.message || error.message,
        confirmButtonColor: "#3085d6",
      });
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 bg-dark bg-opacity-75 mt-5"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1606813902775-61853f8b9c02?auto=format&fit=crop&w=1350&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* <div className=" top-0 start-0 w-100 h-100 bg-dark opacity-50"></div> */}

      <div
        className="card p-4 shadow-lg border-0 position-relative"
        style={{
          width: "450px",
          borderRadius: "20px",
          zIndex: "2",
          backgroundColor: "rgba(255,255,255,0.9)",
        }}
      >
        <div className="text-center mb-4">
          <h3 className="fw-bold text-primary">Add New Product 🛒</h3>
          <p className="text-muted mb-0">
            Fill the details to upload your product
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Product Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter product name"
              {...register("name", { required: "Product name is required" })}
            />
            {errors.name && (
              <p className="text-danger small mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Price */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Price (₹)</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter product price"
              {...register("price", { required: "Price is required" })}
            />
            {errors.price && (
              <p className="text-danger small mt-1">{errors.price.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Enter product description"
              {...register("description", {
                required: "Description is required",
              })}
            ></textarea>
            {errors.description && (
              <p className="text-danger small mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Upload Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              {...register("image", { required: "Image is required" })}
              onChange={handleImageChange}
            />
            {errors.image && (
              <p className="text-danger small mt-1">{errors.image.message}</p>
            )}
          </div>

          {/* Image Preview */}
          {preview && (
            <div className="text-center mb-3">
              <img
                src={preview}
                alt="Preview"
                className="img-fluid rounded shadow-sm"
                style={{ width: "100%", height: "auto", maxHeight: "250px" }}
              />
            </div>
          )}

          {/* Buttons */}
          <div className="d-flex justify-content-center">
            <input
              type="submit"
              className="btn btn-primary fw-bold w-100"
              value="Upload Product"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
