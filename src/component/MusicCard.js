import React from 'react';
import PropTypes from 'prop-types';
import InputTrack from './InputTrack';

class MusicCard extends React.Component {
  render() {
    const {
      artworkUrl100,
      collectionName,
      artistName,
      listOfAlbumMusics,
      handleChange,
      isFavorite,
    } = this.props;
    return (
      <div>
        <div>
          <img
            src={ artworkUrl100 }
            alt={ collectionName }
          />
          <h3 data-testid="album-name">{ collectionName }</h3>
          <p data-testid="artist-name">{ artistName }</p>
        </div>
        {
          listOfAlbumMusics
            .filter((_music, index) => index > 0)
            .map((music, index) => (
              <InputTrack
                key={ index + 1 }
                id={ index + 1 }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                trackId={ music.trackId }
                onChange={ handleChange }
                checked={ isFavorite[index + 1] }
              />
            ))
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
