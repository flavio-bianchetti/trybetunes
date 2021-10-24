import React from 'react';
import { Redirect } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import Header from '../component/Header';
import Input from '../component/Input';
import Button from '../component/Button';
import Loading from '../component/Loading';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      userName: '',
      userImage: '',
      userEmail: '',
      userDescription: '',
      disabled: true,
      isSubmit: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.enableSubmitButton = this.enableSubmitButton.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
  }

  handleSubmit() {
    const {
      userName,
      userEmail,
      userImage,
      userDescription,
    } = this.state;
    this.setState({
      isLoading: true,
    }, async () => {
      await updateUser({
        name: userName,
        email: userEmail,
        image: userImage,
        description: userDescription,
      });
      this.setState({
        isLoading: false,
        isSubmit: true,
      });
    });
  }

  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, this.enableSubmitButton);
  }

  getUserInfo() {
    this.setState({
      isLoading: true,
    }, async () => {
      await getUser()
        .then((response) => {
          this.setState({
            isLoading: false,
            userName: response.name,
            userImage: response.image,
            userEmail: response.email,
            userDescription: response.description,
          }, this.enableSubmitButton);
        });
    });
  }

  enableSubmitButton() {
    const min = 0;
    const { userName, userImage, userEmail, userDescription } = this.state;
    const emailSplit = userEmail.split('@');
    const firstPart = emailSplit.length;
    let secondPart = 0;
    if (emailSplit.length >= 2) {
      secondPart = emailSplit[1].split('.').length;
      console.log(emailSplit[1]);
    }
    console.log(firstPart, secondPart);
    if ((userName.length > min
      || userImage.length > min
      || userEmail.length > min
      || userDescription.length > min)
      && (firstPart === 2)
      && (secondPart === 2)
    ) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  render() {
    const {
      isLoading,
      userName,
      userImage,
      userEmail,
      userDescription,
      disabled,
      isSubmit,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        { isSubmit && <Redirect to="/profile" /> }
        <Header />
        <div>
          { isLoading && <Loading /> }
          {
            !isLoading
            && (
              <section>
                <form onSubmit={ this.handleSubmit }>
                  <Input
                    dataTestId="edit-input-image"
                    name="userImage"
                    type="text"
                    placeholder="Imagem"
                    value={ userImage }
                    onChange={ this.handleChange }
                  />
                  <Input
                    dataTestId="edit-input-name"
                    name="userName"
                    type="text"
                    placeholder="Nome"
                    value={ userName }
                    onChange={ this.handleChange }
                  />
                  <Input
                    dataTestId="edit-input-email"
                    name="userEmail"
                    type="email"
                    placeholder="test@test.com"
                    value={ userEmail }
                    onChange={ this.handleChange }
                  />
                  <Input
                    dataTestId="edit-input-description"
                    name="userDescription"
                    type="text"
                    placeholder="Descrição"
                    value={ userDescription }
                    onChange={ this.handleChange }
                  />
                  <Button
                    dataTestId="edit-button-save"
                    name="save"
                    type="submit"
                    text="Editar perfil"
                    disabled={ disabled }
                  />
                </form>
              </section>
            )
          }
        </div>
      </div>
    );
  }
}

export default ProfileEdit;
