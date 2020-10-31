import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { editArtist, createArtist, getArtist } from '../redux/artist'

class ArtistForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      nationality: '',
      bio: '',
      redirect: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.match.params.id && !this.props.artist) {
      this.props.getArtist(this.props.match.params.id)
    }
    if (this.props.isEditing && this.props.artist) {
      const { name, nationality, bio } = this.props.artist
      this.setState({ name, nationality, bio })
    }
  }

  handleChange(ev) {
    const { target: { name, value } } = ev
    this.setState({ [name]: value })
  }

  handleSubmit(ev) {
    ev.preventDefault()
    try {
      if (this.props.isEditing) {
        this.props.edit(this.state, this.props.artist.id)
      } else {
        this.props.create(this.state)
      }
      this.setState({ redirect: true })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { name, nationality, bio, redirect } = this.state
    const { isEditing } = this.props
    return redirect
      ? <Redirect to="/admin/artists"/>
      : (<div>
        <h1>{isEditing ? `Edit Details About ${name}` : 'Add New Artist'}</h1>
        <div>
          <form className="artwork-form" onSubmit={this.handleSubmit}>
            <label htmlFor="name">Name</label>
            <input name="name" value={name} onChange={this.handleChange} />

            <label htmlFor="nationality">Nationality</label>
            <input name="nationality" value={nationality} onChange={this.handleChange} />

            <label htmlFor="bio">Bio</label>
            <textarea name="bio" value={bio} onChange={this.handleChange} />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>)
  }
}


const mapState = ({artist}) => {
  return {
    artist
  }
}

const mapDispatch = (dispatch) => {
  return {
    edit: (artist, id) => dispatch(editArtist(artist, id)),
    create: (artist) => dispatch(createArtist(artist)),
    getArtist: (id) => dispatch(getArtist(id))
  }
}

export default connect(mapState, mapDispatch)(ArtistForm)
