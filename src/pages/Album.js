import React from 'react';
import PropTypes from 'prop-types';
import musicsAPI from '../services/musicsAPI';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';
import Header from '../component/Header';
import Loading from '../component/Loading';
import MusicCard from '../component/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artworkUrl100: '',
      collectionName: '',
      artistName: '',
      listOfAlbumMusics: [],
      listFavoriteSongs: [],
      isFavorite: [],
      isLoading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.getAlbumMusicsList = this.getAlbumMusicsList.bind(this);
    this.getFavoriteList = this.getFavoriteList.bind(this);
  }

  componentDidMount() {
    this.getAlbumMusicsList();
    this.getFavoriteList();
  }

  async handleChange(event) {
    event.preventDefault();
    const { listOfAlbumMusics } = this.state;
    const { id, checked } = event.target;
    const { isFavorite } = this.state;
    const value = isFavorite;
    this.setState({
      isLoading: true,
    }, () => {
      if (checked) {
        addSong(listOfAlbumMusics[id]);
      } else {
        removeSong(listOfAlbumMusics[id]);
      }
      value[id] = checked;
      this.setState({
        isLoading: false,
        isFavorite: value,
      });
    });
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

  async getFavoriteList() {
    await getFavoriteSongs()
      .then((response) => {
        this.setState({
          listFavoriteSongs: response,
        }, this.arrayIsFavorite);
      });
  }

  arrayIsFavorite() {
    const {
      listOfAlbumMusics,
      listFavoriteSongs,
    } = this.state;
    const value = [];
    listOfAlbumMusics
      .forEach((music) => value.push(listFavoriteSongs
        .some((song) => music.trackName === song.trackName)));
    this.setState({
      isFavorite: value,
    });
  }

  render() {
    const {
      artworkUrl100,
      collectionName,
      artistName,
      listOfAlbumMusics,
      isLoading,
      isFavorite,
    } = this.state;
    return (
      <section>
        { isLoading && <Loading />}
        {
          !isLoading
          && (
            <div data-testid="page-album">
              <Header />
              <MusicCard
                artworkUrl100={ artworkUrl100 }
                collectionName={ collectionName }
                artistName={ artistName }
                listOfAlbumMusics={ listOfAlbumMusics }
                handleChange={ this.handleChange }
                isFavorite={ isFavorite }
              />
            </div>
          )
        }
      </section>
    );
  }
}

Album.propTypes = {
  artworkUrl100: PropTypes.string,
  collectionName: PropTypes.string,
  artistName: PropTypes.string,
  listOfAlbumMusics: PropTypes.array,
  listFavoriteSongs: PropTypes.array,
  isFavorite: PropTypes.array,
  match: PropTypes.object,
}.isRequired;

export default Album;
