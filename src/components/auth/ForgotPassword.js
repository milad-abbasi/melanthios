import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { addNotification } from '../../actions';
import { forgotPassword } from '../../utils/authUtils';
import timer from '../../utils/timer';

class ForgotPassword extends Component {
  state = { isHidden: false, isDisabled: false };

  onSubmit = formProps => {
    this.toggleVisibility();
    forgotPassword(
      formProps,
      this.props.addNotification,
      this.toggleVisibility,
      this.toggleDisablity
    );
  };

  toggleVisibility = () => {
    this.setState({
      isHidden: !this.state.isHidden
    });
  };

  toggleDisablity = () => {
    this.setState({
      isDisabled: true
    });

    const button = document.getElementById('button');
    button.style.visibility = 'hidden';

    timer();
    setTimeout(() => {
      button.style.visibility = 'visible';
      this.setState({ isDisabled: false });
    }, 30000);
  };

  renderField({ input, label, type, meta: { touched, error } }) {
    return (
      <fieldset>
        <div className="p-t-31 p-b-9">
          <label className="txt1">{label}</label>
        </div>
        <div className="wrap-input100">
          <input className="input100" {...input} type={type} />
          <span className="focus-input100" />
        </div>
        {touched && error && <span className="text-danger">{error}</span>}
      </fieldset>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
            <form
              className="login100-form validate-form flex-sb flex-w"
              onSubmit={handleSubmit(this.onSubmit)}
            >
              <span className="login100-form-title p-b-53">
                Forgot Password?
              </span>

              <Field
                name="emailOrUsername"
                type="text"
                component={this.renderField}
                label="Your Email or Username"
              />

              <span
                id="remaining"
                className="text-danger"
                style={{ marginLeft: '120px', marginTop: '10px' }}
              />

              <div id="button" className="container-login100-form-btn m-t-17">
                {!this.state.isHidden && (
                  <button
                    className="login100-form-btn"
                    disabled={this.state.isDisabled}
                  >
                    Reset Password
                  </button>
                )}

                {this.state.isHidden && (
                  <img
                    src="/images/loading.svg"
                    height="120"
                    width="120"
                    style={{ marginLeft: 'auto', marginRight: 'auto' }}
                    alt=""
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const validate = ({ emailOrUsername }) => {
  const errors = {};

  if (!emailOrUsername) {
    errors.emailOrUsername = `Required`;
  }

  return errors;
};

export default compose(
  connect(
    null,
    { addNotification }
  ),
  reduxForm({ form: 'forgotPassword', validate })
)(ForgotPassword);