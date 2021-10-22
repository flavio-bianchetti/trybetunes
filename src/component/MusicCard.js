import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import InputTrack from './InputTrack';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isFavorite: [],
      isLoading: false,
    };

    this.checkCheckbox = this.checkCheckbox.bind(this);
    this.startArrayFavoriteMusics = this.startArrayFavoriteMusics.bind(this);
  }

  componentDidMount() {
    this.startArrayFavoriteMusics();
  }

  checkCheckbox(event) {
    const { listOfAlbumMusics } = this.props;
    const { isFavorite } = this.state;
    console.log(isFavorite);
    const value = isFavorite;
    const { id } = event.target;
    console.log(id);
    this.setState({
      isLoading: true,
    }, async () => {
      await addSong([listOfAlbumMusics[id + 1]]);
      value[id] = !value[id];
      console.log(value[id]);
      this.setState({
        isLoading: false,
        isFavorite: value,
      });
    });
  }

  startArrayFavoriteMusics() {
    const { listOfAlbumMusics } = this.props;
    const max = listOfAlbumMusics.length;
    const myArray = [];
    console.log(listOfAlbumMusics);
    for (let index = 1; index < max; index += 1) {
      myArray.push(false);
    }
    console.log(myArray);
    this.setState({
      isFavorite: [...myArray],
    });
  }

  render() {
    const {
      isFavorite,
      isLoading,
    } = this.state;
    const {
      listOfAlbumMusics,
    } = this.props;
    return (
      <div>
        { isLoading && <Loading />}
        {
          !isLoading
          && (
            listOfAlbumMusics
              .filter((_music, index) => index > 0)
              .map((music, index) => (
                <InputTrack
                  key={ index }
                  id={ index }
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                  trackId={ music.trackId }
                  isLoading={ isLoading }
                  onChange={ this.checkCheckbox }
                  checked={ isFavorite[index] }
                />
              ))
          )
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  listOfAlbumMusics: PropTypes.array,
  isFavorite: PropTypes.array,
  isLoading: PropTypes.bool,
}.isRequired;

export default MusicCard;
