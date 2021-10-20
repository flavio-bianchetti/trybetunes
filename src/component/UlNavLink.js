import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

class UlNavLink extends React.Component {
  render() {
    const { arrayNavLink, classNameUlNavLink } = this.props;
    return (
      <ul className={ classNameUlNavLink }>
        {
          arrayNavLink.map((link, index) => (
            <ol key={ index }>
              <NavLink
                to={ link.to }
                data-testid={ link.dataTestId }
              >
                { link.text }
              </NavLink>
            </ol>
          ))
        }
      </ul>
    );
  }
}

UlNavLink.propTypes = {
  arrayNavLink: PropTypes.array,
  classNameUlNavLink: PropTypes.string,
}.isRequired;

export default UlNavLink;
