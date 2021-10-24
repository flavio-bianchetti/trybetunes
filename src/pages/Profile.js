import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../component/Header';
import { getUser } from '../services/userAPI';
import Loading from '../component/Loading';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      name: '',
      image: '',
      email: '',
      description: '',
    };

    this.getUserInfo = this.getUserInfo.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.setState({
      isLoading: true,
    }, async () => {
      await getUser()
        .then((response) => {
          this.setState({
            isLoading: false,
            name: response.name,
            image: response.image,
            email: response.email,
            description: response.description,
          });
        });
    });
  }

  render() {
    const {
      isLoading,
      name,
      image,
      email,
      description,
    } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <div>
          { isLoading && <Loading /> }
          {
            !isLoading
            && (
              <div>
                <img
                  data-testid="profile-image"
                  src={ image }
                  alt={ name }
                />
                <p
                  data-testid="header-user-name"
                >
                  { name }
                </p>
                <p
                  data-testid="header-user-email"
                >
                  { email }
                </p>
                <p>
                  { description }
                </p>
                <Link
                  to="/profile/edit"
                >
                  Editar perfil
                </Link>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default Profile;
