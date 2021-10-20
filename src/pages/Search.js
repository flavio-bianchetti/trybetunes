import React from 'react';
import Header from '../component/Header';
import Input from '../component/Input';
import Button from '../component/Button';
import DataInput from '../data/DataInput';
import DataButton from '../data/DataButton';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      nameSearchArtist: '',
      numCharEnableButton: 2,
      isDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.changeStatusButton = this.changeStatusButton.bind(this);
  }

  handleChange(event) {
    const { name } = event.target;
    this.setState({
      [name]: event.target.value,
    }, this.changeStatusButton);
  }

  changeStatusButton() {
    const { nameSearchArtist, numCharEnableButton } = this.state;
    if (nameSearchArtist.length < numCharEnableButton) {
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
      nameSearchArtist,
      isDisabled,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <Input
            dataTestId={ DataInput[1].dataTestId }
            name={ DataInput[1].name }
            className={ DataInput[1].className }
            type={ DataInput[1].type }
            placeholder={ DataInput[1].placeholder }
            onChange={ this.handleChange }
            value={ nameSearchArtist }
          />
          <Button
            dataTestId={ DataButton[1].dataTestId }
            name={ DataButton[1].name }
            type={ DataButton[1].type }
            text={ DataButton[1].text }
            disabled={ isDisabled }
          />
        </form>
      </div>
    );
  }
}

export default Search;
