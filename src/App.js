import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Loading from './component/Loading';
import { createUser } from './services/userAPI';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loginName: '',
      isLoading: false,
      isDisabled: true,
      isLoggedIn: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.enableSubmitButton = this.enableSubmitButton.bind(this);
  }

  handleChange(event) {
    this.setState({
      loginName: event.target.value,
    }, this.enableSubmitButton);
  }

  handleSubmit() {
    const { loginName } = this.state;
    this.setState({
      isLoading: true,
    }, async () => {
      await createUser({ name: loginName });
      this.setState({
        isLoading: false,
        isLoggedIn: true,
      });
    });
  }

  enableSubmitButton() {
    const numMinChar = 3;
    const { loginName } = this.state;
    if (loginName.length < numMinChar) {
      this.setState({
        isDisabled: true,
      });
    } else {
      this.setState({
        isDisabled: false,
      });
    }
  }

  render() {
    const {
      loginName,
      isLoading,
      isDisabled,
      isLoggedIn,
    } = this.state;

    return (
      <BrowserRouter>
        <p>TrybeTunes</p>
        <div>
          { isLoading && <Loading /> }
          {
            !isLoading
            && <Route
              path="/"
              render={
                (() => (
                  <Login
                    loginName={ loginName }
                    isDisabled={ isDisabled }
                    isLoggedIn={ isLoggedIn }
                    handleChange={ this.handleChange }
                    handleSubmit={ this.handleSubmit }
                  />
                ))
              }
            />
          }
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
