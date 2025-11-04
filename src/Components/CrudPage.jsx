import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const CrudPage = () => {
  const [users, setUsers] = useState([]);
  const GetallUsers = async (data) => {
    try {
      const res = await axios.get(`${BASE_URL}/getUser`, data);
      console.log("✅ Server Response:", res.data.result);
      console.log("✅ Server Id:", res.data.result._id);
      setUsers(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetallUsers();
  }, []);

  const EditDetails = () => {
    alert("Edit");
  };
  const DeleteData = async (_id) => {
    try {
      const confirm = await Swal.fire({
        title: "Are you sure?",
        text: "This user will be deleted permanently!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });
      if (confirm.isConfirmed) {
        const res = await axios.delete(`${BASE_URL}/del/${_id}`);
        // console.log(id)

        if (res.data.success) {
          Swal.fire("Deleted!", res.data.message, "success");

          // remove deleted user from table without refetching
          setUsers((prev) => prev.filter((u) => u._id !== _id));
        } else {
          Swal.fire("Error!", "Failed to delete user.", "error");
        }
      }
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6 d-flex justify-content-center align-items-center vh-100">
          <table className="table table-bordered align-middle ">
            <thead className="table-primary">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">createdAt</th>
                <th scope="col">updatedAt</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users && users.length > 0 ? (
                users.map((users, index) => (
                  <tr key={users._id || index}>
                    <th scope="row">{index + 1}</th>
                    <td>{users.name}</td>
                    <td>{users.email}</td>
                    <td>{users.phone}</td>
                    <td>
                      {new Date(users.createdAt).toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                      })}
                    </td>

                    <td>
                      {new Date(users.updatedAt).toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                      })}
                    </td>
                    <td className="d-flex align-items-center gap-2 mb-0 pb-0">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={EditDetails}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={()=>{DeleteData(users._id)}}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-muted">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="col-3"></div>
      </div>
    </>
  );
};

export default CrudPage;
