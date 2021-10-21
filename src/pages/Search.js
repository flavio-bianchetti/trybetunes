import React from 'react';
import Header from '../component/Header';
import Input from '../component/Input';
import Button from '../component/Button';
import Loading from '../component/Loading';
import RenderAlbum from '../component/RenderAlbum';
import DataInput from '../data/DataInput';
import DataButton from '../data/DataButton';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      nameSearchArtist: '',
      lastSearch: '',
      numCharEnableButton: 2,
      isDisabled: true,
      isLoading: false,
      arraySearch: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeStatusButton = this.changeStatusButton.bind(this);
  }

  handleChange(event) {
    const { name } = event.target;
    this.setState({
      [name]: event.target.value,
    }, this.changeStatusButton);
  }

  handleSubmit() {
    const { nameSearchArtist } = this.state;
    this.setState({
      isLoading: true,
      lastSearch: nameSearchArtist,
      nameSearchArtist: '',
    }, async () => {
      await searchAlbumsAPI(nameSearchArtist)
        .then((response) => {
          this.setState({
            arraySearch: response,
            isLoading: false,
          });
        });
    });
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
      isLoading,
      arraySearch,
      lastSearch,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {
          !isLoading
          && (
            <form onSubmit={ this.handleSubmit }>
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
          )
        }
        { isLoading && <Loading /> }
        {
          arraySearch.length > 0
          && (
            <p>{ `Resultado de álbuns de: ${lastSearch}` }</p>
          )
        }
        {
          !isLoading
            && (
              arraySearch.length === 0
                ? <p>Nenhum álbum foi encontrado</p>
                : (
                  arraySearch.map((search) => (
                    <RenderAlbum
                      key={ search.artistId }
                      artistId={ search.artistId }
                      artistName={ search.artistName }
                      collectionId={ search.collectionId }
                      collectionName={ search.collectionName }
                      collectionPrice={ search.collectionPrice }
                      artworkUrl100={ search.artworkUrl100 }
                      releaseDate={ search.releaseDate }
                      trackCount={ search.trackCount }
                    />
                  ))
                )
            )
        }
      </div>
    );
  }
}

export default Search;
