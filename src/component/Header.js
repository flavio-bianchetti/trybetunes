import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      nameUser: '',
      isLoading: false,
    };
    // this.getNameUser = this.getNameUser.bind(this);
  }

  componentDidMount() {
    this.getUserName();
  }

  getUserName() {
    this.setState({
      isLoading: true,
    }, async () => {
      await getUser()
        .then((response) => {
          this.setState({
            nameUser: response.name,
            isLoading: false,
          });
        });
    });
  }

  render() {
    const { nameUser, isLoading } = this.state;
    return (
      <section>
        {
          isLoading
          && <Loading />
        }
        {
          !isLoading
          && (
            <header data-testid="header-component">
              <Link to="/search">Search</Link>
              <Link to="/album/:id">Album</Link>
              <Link to="/favorites/:id">Favorites</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/profile/edit">Edit Profile</Link>
              <p data-testid="header-user-name">{ nameUser }</p>
            </header>
          )
        }
      </section>
    );
  }
}

Header.propTypes = {
  loginName: PropTypes.string,
}.isRequired;

export default Header;
