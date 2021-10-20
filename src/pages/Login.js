import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Input from '../component/Input';
import Button from '../component/Button';
import DataInput from '../data/DataInput';
import DataButton from '../data/DataButton';

class Login extends React.Component {
  render() {
    const {
      loginName,
      isDisabled,
      isLoggedIn,
      handleChange,
      handleSubmit,
    } = this.props;

    return (
      <section>
        { isLoggedIn && <Redirect to="/search" /> }
        <form data-testid="page-login" onSubmit={ handleSubmit }>
          <Input
            dataTestId={ DataInput[0].dataTestId }
            name={ DataInput[0].name }
            className={ DataInput[0].className }
            type={ DataInput[0].type }
            placeholder={ DataInput[0].placeholder }
            value={ loginName }
            onChange={ handleChange }
          />
          <Button
            dataTestId={ DataButton[0].dataTestId }
            name={ DataButton[0].name }
            className={ DataButton[0].className }
            type={ DataButton[0].type }
            text={ DataButton[0].text }
            disabled={ isDisabled }
          />
        </form>
      </section>
    );
  }
}

Login.propTypes = {
  loginName: PropTypes.string,
  isDisabled: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
}.isRequired;

export default Login;
