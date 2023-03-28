import axios from "axios";
import React, { useEffect, useState } from "react";
import { Await, Link, useNavigate, useParams } from "react-router-dom";
import MultilineTextFields from "../Input";

export default function CompanyEdits() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState({
   name:"",
   id:"",
  });

  const { name } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    loadUser(id);
    // console.log(id)
    

  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8084/v1/payments`, { id, name });
    navigate("/");
  };

  const loadUser = async (id) => {   
    const result = await axios.get(`http://localhost:8084/v1/payments/${id}`);
    setUser(result.data);
    console.log(id)

    console.log(user)

};



  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit User</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Ad" className="form-label">
                ad
              </label>
              <MultilineTextFields className="form-control" label="Ad" name="name" value={user.name} onChange={(e) => onInputChange(e)} />
            </div>
            <div>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your username"
                name="id"
                value={id}
                onChange={(e) => onInputChange(e)}
              />

            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>

    </div>
  );
}