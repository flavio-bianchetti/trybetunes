import React from 'react';
import PropTypes from 'prop-types';
import musicsAPI from '../services/musicsAPI';
import Header from '../component/Header';
import RenderAlbumMusics from '../component/RenderAlbumMusics';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artworkUrl100: '',
      collectionName: '',
      artistName: '',
      listOfAlbumMusics: [],
    };
    this.getAlbumMusicsList = this.getAlbumMusicsList.bind(this);
  }

  componentDidMount() {
    this.getAlbumMusicsList();
  }

  async getAlbumMusicsList() {
    const { match: { params: { id } } } = this.props;
    await musicsAPI(id)
      .then((response) => {
        this.setState({
          artworkUrl100: response[0].artworkUrl100,
          collectionName: response[0].collectionName,
          artistName: response[0].artistName,
          listOfAlbumMusics: response,
        });
      });
  }

  render() {
    const {
      artworkUrl100,
      collectionName,
      artistName,
      listOfAlbumMusics,
    } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <RenderAlbumMusics
          artworkUrl100={ artworkUrl100 }
          collectionName={ collectionName }
          artistName={ artistName }
          listOfAlbumMusics={ listOfAlbumMusics }
        />
      </div>
    );
  }
}

Album.propTypes = {
  artworkUrl100: PropTypes.string,
  collectionName: PropTypes.string,
  artistName: PropTypes.string,
  listOfAlbumMusics: PropTypes.array,
  match: PropTypes.object,
}.isRequired;

export default Album;
