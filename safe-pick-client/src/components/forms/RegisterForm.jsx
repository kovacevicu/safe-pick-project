import React, { Component } from "react";
import Footer from "../Footer";
import NavBar from "../NavBar";
import Input from "../Input";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import * as userService from "../../helpers/userService";

class RegisterForm extends Component {
  state = {
    account: {
      email: "",
      password: "",
      country: "",
      city: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().label("Password"),
    country: Joi.string().required().label("Country"),
    city: Joi.string().required().label("City"),
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

    userService.register(this.state.account);

    this.props.history.push("/");

    toast.info("We have sent you a verification email!");
  };

  render() {
    const { account, errors } = this.state;

    return (
      <div>
        <NavBar />
        <div className="banner">
          <div className="header-text caption">
            <h2>Sign up</h2>
          </div>
          <div className="formDiv">
            <form onSubmit={this.handleSubmit}>
              <Input
                name="email"
                value={account.email}
                error={errors.email}
                label="Email"
                onChange={this.handleChange}
              />
              <Input
                name="password"
                value={account.password}
                error={errors.password}
                label="Password"
                onChange={this.handleChange}
              />
              <Input
                name="country"
                value={account.country}
                error={errors.country}
                label="Country of residence"
                onChange={this.handleChange}
              />
              <Input
                name="city"
                value={account.city}
                error={errors.city}
                label="City of residence"
                onChange={this.handleChange}
              />
              <button disabled={this.validate()} className="formButton">
                Register
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default RegisterForm;
