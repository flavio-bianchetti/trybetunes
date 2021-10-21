import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class RenderAlbum extends React.Component {
  render() {
    const {
      artistId,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate,
      trackCount,
    } = this.props;
    return (
      <div>
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          link
        </Link>
        <img
          src={ artworkUrl100 }
          alt={ collectionName }
        />
        <p>{ artistId }</p>
        <p>{ artistName }</p>
        <p>{ collectionId }</p>
        <p>{ collectionName }</p>
        <p>{ collectionPrice }</p>
        <p>{ releaseDate }</p>
        <p>{ trackCount }</p>
      </div>
    );
  }
}

RenderAlbum.propTypes = {
  artistId: PropTypes.number,
  artistName: PropTypes.string,
  collectionId: PropTypes.number,
  collectionName: PropTypes.string,
  collectionPrice: PropTypes.number,
  artworkUrl100: PropTypes.string,
  releaseDate: PropTypes.string,
  trackCount: PropTypes.number,
}.isRequired;

export default RenderAlbum;
