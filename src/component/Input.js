import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  render() {
    const {
      dataTestId,
      name,
      className,
      type,
      value,
      placeholder,
      onChange,
    } = this.props;

    return (
      <input
        data-testid={ dataTestId }
        name={ name }
        className={ className }
        type={ type }
        value={ value }
        placeholder={ placeholder }
        onChange={ onChange }
      />
    );
  }
}

Input.propTypes = {
  dataTestId: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
}.isRequired;

export default Input;
