import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    const {
      dataTestId,
      name,
      className,
      type,
      disabled,
      text,
      onClick,
    } = this.props;

    return (
      <button
        data-testid={ dataTestId }
        name={ name }
        className={ className }
        type={ type === 'submit' ? 'submit' : 'button' }
        disabled={ disabled }
        onClick={ onClick }
      >
        { text }
      </button>
    );
  }
}

Button.propTypes = {
  dataTestId: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
}.isRequired;

export default Button;
