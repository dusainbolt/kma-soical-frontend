import React, { Component } from "react";
import { Formik, Field } from "formik";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import logo from "../../common/image/logo.png";
import * as Yup from "yup";
import Input from "../../components/Input";
import { actions } from "../Login/actions";
import Button from "../../components/Button";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: {
        email: "",
        password: "",
      },
    };
    this.validationSchema = Yup.object({
      email: Yup.string().required("Vui lòng nhập email"),
      password: Yup.string().required("Vui lòng nhập mật khẩu"),
    });
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    this.props.postLogin(values);
  }
  componentDidMount() {
    const { token } = this.props;
    if(token){
      this.props.postRedirect(token);
    }
  }  
  render() {
    const { initialValues } = this.state;
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={this.validationSchema}
        onSubmit={this.onSubmit}
      >
        {formik => (
          <div className="login layout-web">
            <div className="login__wrapper">
              <h5 className="login__wrapper--title white-color">Du Sainbolt</h5>
              <h3 className="login__wrapper--des white-color">
                Welcome to Admin Manager
              </h3>
              <div className="login__form">
                <p className="login__form--title">
                  <img width="40%" src={logo} alt="logo" />
                </p>
                <Field
                  name="email"
                  labelTitle="Email"
                  placeholder="Nhập email"
                  component={Input}
                />
                <Field
                  name="password"
                  labelTitle="Password"
                  type="password"
                  placeholder="Nhập password"
                  component={Input}
                />
                <Button
                  type="submit"
                  onClick={formik.handleSubmit}
                  className="login__form--button white-color btn-primary"
                  title="Đăng nhập"
                />
              </div>
            </div>
          </div>
        )}
      </Formik>
    );
  }
}

const mstp = state => ({
  token: state.loginReducer.auth?.token,
});
const mdtp = dispatch => ({
  postLogin: values => dispatch(actions.postLoginStart(values)),
  postRedirect: values => dispatch(actions.postRedirectLoginStart(values)),
});

export default connect(mstp, mdtp)(withTranslation()(LoginPage));
