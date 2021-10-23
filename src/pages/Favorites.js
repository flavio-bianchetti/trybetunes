import React from 'react';
import Header from '../component/Header';
import MusicCard from '../component/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../component/Loading';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteList: [],
      isFavorite: [],
      isLoading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.getFavoriteList = this.getFavoriteList.bind(this);
  }

  componentDidMount() {
    this.getFavoriteList();
  }

  handleChange(event) {
    event.preventDefault();
    const { id } = event.target;
    const { favoriteList } = this.state;
    this.setState({
      isLoading: true,
    }, async () => {
      await removeSong(favoriteList[id - 1]);
      this.getFavoriteList();
      this.setState({
        isLoading: false,
      });
    });
  }

  getFavoriteList() {
    const array = [null];
    this.setState({
      isLoading: true,
    }, async () => {
      await getFavoriteSongs()
        .then((response) => {
          response.forEach((resp) => array.push(resp !== null));
          this.setState({
            favoriteList: response,
            isFavorite: array,
            isLoading: false,
          });
        });
    });
  }

  render() {
    const {
      favoriteList,
      isLoading,
      isFavorite,
    } = this.state;
    const favoriteListModified = [{}, ...favoriteList];
    return (
      <div data-testid="page-favorites">
        <section>
          { isLoading && <Loading />}
          {
            !isLoading
            && (
              <div data-testid="page-album">
                <Header />
                <MusicCard
                  listOfAlbumMusics={ favoriteListModified }
                  handleChange={ this.handleChange }
                  isFavorite={ isFavorite }
                />
              </div>
            )
          }
        </section>
      </div>
    );
  }
}

export default Favorites;
