import React from 'react';
import PropTypes from 'prop-types';
import MusicCard from './MusicCard';

class RenderAlbumMusics extends React.Component {
  render() {
    const {
      artworkUrl100,
      collectionName,
      artistName,
      listOfAlbumMusics,
    } = this.props;
    return (
      <section>
        <div>
          <img
            src={ artworkUrl100 }
            alt={ collectionName }
          />
          <h3 data-testid="album-name">{ collectionName }</h3>
          <p data-testid="artist-name">{ artistName }</p>
        </div>
        <MusicCard listOfAlbumMusics={ listOfAlbumMusics } />
      </section>
    );
  }
}

RenderAlbumMusics.propTypes = {
  artworkUrl100: PropTypes.string,
  collectionName: PropTypes.string,
  artistName: PropTypes.string,
  listOfAlbumMusics: PropTypes.array,
}.isRequired;

export default RenderAlbumMusics;
