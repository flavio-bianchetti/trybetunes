import React from 'react';
import { getUser } from '../services/userAPI';
import UlNavLink from './UlNavLink';
import DataNavLink from '../data/DataNavLink';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      nameUser: '',
      isLoading: false,
    };
    this.getUserName = this.getUserName.bind(this);
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
              <UlNavLink
                arrayNavLink={ DataNavLink }
                classNameUlNavLink="NavLinkMenu"
              />
              <p data-testid="header-user-name">{ nameUser }</p>
            </header>
          )
        }
      </section>
    );
  }
}

export default Header;
