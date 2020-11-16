import React, { Component } from "react";
import Footer from "../Footer";
import NavBar from "../NavBar";
import Input from "../Input";
import Joi from "joi-browser";
import * as userService from "../../helpers/userService";
class LoginForm extends Component {
  state = {
    account: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  validate = () => {
    const result = Joi.validate(this.state.account, this.schema, {
      abortEarly: false,
    });
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    const { data } = await userService.login(this.state.account);
    console.log(data);
    localStorage.setItem("token", data);
    window.location = "/";
  };

  render() {
    const { account, errors } = this.state;

    return (
      <div>
        <NavBar />
        <div className="banner">
          <div className="header-text caption">
            <h2>LOG IN</h2>
          </div>
          <div className="formDiv">
            <form onSubmit={this.handleSubmit}>
              <Input
                name="email"
                value={account.email}
                label="Email"
                onChange={this.handleChange}
                error={errors.email}
              />
              <Input
                name="password"
                value={account.password}
                label="Password"
                type="password"
                onChange={this.handleChange}
                error={errors.password}
              />
              <button disabled={this.validate()} className="formButton">
                Login
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default LoginForm;
