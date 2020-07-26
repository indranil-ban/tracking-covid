import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import axios from "axios";

import { createUser } from "../Api";

const Form = ({ data, country }) => {
  const [values, setValues] = useState({
    email: "",
    error: false,
    success: false
  });
  
  const { email, error, success } = values;

  const handleChange = (email) => (event) => {
    setValues({ ...values, [email]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values });
    
  
    createUser({ email }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          email: "",
          error: false,
          success: true
        });
      }
    });
    const form = await axios.post("/api/mail", { data, country, email });
    setValues({ ...values, email: form.email });
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Registered successfully!</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-success">Failed to register!</h4>;
    }
  };

  return (
    <form>
      <div className="form-group">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="name@example.com"
          autoFocus
          required
          onChange={handleChange("email")}
          value={email}
        ></input>
      </div>
      <Button color="primary" onClick={onSubmit}>
        Submit
      </Button>
      <h3>GET MAIL FOR YOUR COUNTRY</h3>
      {successMessage()}
      {warningMessage()}
    </form>
  );
};

export default Form;
