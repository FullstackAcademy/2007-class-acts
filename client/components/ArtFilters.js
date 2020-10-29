import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { mediums } from '../../server/constants';

const ArtFilters = ({ artworks, artists, genres, changeFilter }) => {

  if (genres) {
    const [genreId, setGenreId] = useState(genres[0].id);
    const [genresLen, setGenresLen] = useState(genres);

    useEffect( () => {
      async function getGenreInfo() {
        const genre = await axios.get(`/api/genres/${genreId}`);
        setGenresLen(genresLen.map(g => {
          if (g.id === genreId) {
            g.artworksLen = genre.data.artworks.length;
          }
        }));
      }
      getGenreInfo();
    }, [genreId])

    return (
      <div className="art-filters">
        <select name="artist" id="artist" defaultValue="DEFAULT" onChange={ changeFilter }>
          <option value="DEFAULT">ARTIST</option>
          { artists ?
            artists.map(artist => {
              return (
                <option value={ artist.id } key={ artist.id }>{ artist.name } ({ artist.artworks.length })</option>
              )
            }) :
            <option value="N/A">---</option>
          }
        </select>
        <select name="genre" id="genre" defaultValue="DEFAULT" onChange={ changeFilter }>
          <option value="DEFAULT">GENRE</option>
          { genres ?
            genres.map(genre => {
              setGenreId(id)
              return (
                <option value={ id } key={ id }>{ genre.name } ({ numArt })</option>
              )
            }) :
            <option value="N/A">---</option>
          }
        </select>
        <select name="medium" id="medium" defaultValue="DEFAULT" onChange={ changeFilter }>
          <option value="DEFAULT">MEDIUM</option>
          { mediums.map(media => {
              const numArt = artworks.filter(art => art.medium === media).length;
              return (
                <option value={ media } key={ media }>{ media } ({ numArt })</option>
              )
            })
          }
        </select>
      </div>
    )
  } else {
    return (<div>Loading</div>)
  }
}

export default ArtFilters;
