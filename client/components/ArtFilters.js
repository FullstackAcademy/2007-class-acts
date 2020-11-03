import React from 'react'
import { mediums } from '../../server/constants'

const ArtFilters = ({ artworks, artists, genres, changeFilter }) => {
  return (
    <div className="art-filters">
      <select
        name="artist"
        id="artist"
        defaultValue="DEFAULT"
        onChange={changeFilter}>
        <option value="DEFAULT">ARTIST</option>
        {artists ? (
          artists.map((artist) => {
            if (artist.artworks) {
              return (
                <option value={artist.id} key={artist.id}>
                  {artist.name} ({artist.artworks.length})
                </option>
              )
            }
          })
        ) : (
          <option value="N/A">---</option>
        )}
      </select>
      <select
        name="genre"
        id="genre"
        defaultValue="DEFAULT"
        onChange={changeFilter}>
        <option value="DEFAULT">GENRE</option>
        { genres ?
          genres.map(genre => {
            const numArts = artworks
              .map(a => a.genres)
              .map(a => a.map(g => g.id))
              .filter(a => a.includes(genre.id))
              .length;
            return (
              <option value={ genre.id } key={ genre.id }>{ genre.name } ({ numArts })</option>
            )
          })
         : (
          <option value="N/A">---</option>
        )}
      </select>
      <select
        name="medium"
        id="medium"
        defaultValue="DEFAULT"
        onChange={changeFilter}>
        <option value="DEFAULT">MEDIUM</option>
        {mediums.map((media) => {
          const numArt = artworks.filter((art) => art.medium === media).length
          return (
            <option value={media} key={media}>
              {media} ({numArt})
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default ArtFilters
