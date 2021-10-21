import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const {
      listOfAlbumMusics,
    } = this.props;
    return (
      <div>
        {
          listOfAlbumMusics
            .filter((_music, index) => index > 0)
            .map((music, index) => (
              <div key={ index }>
                <p>{ music.trackName }</p>
                <audio
                  data-testid="audio-component"
                  src={ music.previewUrl }
                  controls
                >
                  <track
                    kind="captions"
                  />
                  O seu navegador não suporta o elemento
                  <code>
                    audio
                  </code>
                  .
                </audio>
              </div>
            ))
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  listOfAlbumMusics: PropTypes.array,
}.isRequired;

export default MusicCard;
