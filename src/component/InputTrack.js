import React from 'react';
import PropTypes from 'prop-types';

class InputTrack extends React.Component {
  render() {
    const {
      id,
      trackName,
      previewUrl,
      trackId,
      onChange,
      checked,
    } = this.props;
    return (
      <div>
        <p>{ trackName }</p>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
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
        <label
          htmlFor={ id }
        >
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name={ trackId }
            id={ id }
            onChange={ onChange }
            checked={ checked }
          />
          Favorita
        </label>
      </div>
    );
  }
}

InputTrack.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
}.isRequired;

export default InputTrack;
