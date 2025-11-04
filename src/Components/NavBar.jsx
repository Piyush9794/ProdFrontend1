import React from "react";
import { useAuth } from "../context/AuthContext";
import {
  FaHome,
  FaPlusCircle,
  FaBoxOpen,
  FaUserCircle,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaCog,
} from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";

const NavBar = () => {
  const { isLoggedIn, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark  shadow-sm fixed-top py-3"
        style={{
          background: "linear-gradient(90deg, #4b6cb7 0%, #182848 100%)",
        }}
      >
        <div className="container">
          <a
            className="navbar-brand fw-bold d-flex align-items-center gap-2"
            href="/"
          >
            <IoCartOutline size={28} />
            ProductManager
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-lg-center">
              <li className="nav-item mx-1">
                <a
                  className="nav-link active d-flex align-items-center gap-1"
                  href="/"
                >
                  <FaHome /> Home
                </a>
              </li>

              <li className="nav-item mx-1">
                <a
                  className="nav-link d-flex align-items-center gap-1 text-white"
                  href="/AddProduct"
                >
                  <FaPlusCircle /> Add Product
                </a>
              </li>

              <li className="nav-item mx-1">
                <a
                  className="nav-link d-flex align-items-center gap-1 text-white"
                  href="/ViewProducts"
                >
                  <FaBoxOpen /> My Products
                </a>
              </li>

              {/* Conditional Rendering based on login status */}
              {isLoggedIn ? (
                <>
                  <li className="nav-item dropdown mx-1">
                    <a
                      className="nav-link dropdown-toggle d-flex align-items-center gap-1"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <FaUserCircle size={18} />
                      <span className="text-white">Hi, {user?.name}</span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <a
                          className="dropdown-item d-flex align-items-center gap-2"
                          href="/profile"
                        >
                          <FaUserCircle /> Profile
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item d-flex align-items-center gap-2"
                          href="/settings"
                        >
                          <FaCog /> Settings
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button
                          className="dropdown-item text-danger d-flex align-items-center gap-2"
                          onClick={handleLogout}
                        >
                          <FaSignOutAlt /> Logout
                        </button>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item mx-1">
                    <a
                      className="btn btn-light btn-sm d-flex align-items-center gap-2  "
                      href="/login"
                    >
                      <FaSignInAlt /> Login
                    </a>
                  </li>
                  <li className="nav-item mx-1">
                    <a
                      className="btn btn-light btn-sm d-flex align-items-center gap-2"
                      href="/Register"
                    >
                      <FaUserPlus /> Signup
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
