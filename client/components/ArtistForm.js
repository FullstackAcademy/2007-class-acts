import React, {Component} from 'react'
import { connect } from 'react-redux'

class ArtistForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      nationality: '',
      bio: ''
    }
  }

  render() {
    const {name, nationality, bio } = this.state
    return (
      <div>
        <form>
          <input name="name" value={name} />
          <input name="nationality" value={nationality} />
          <textarea name="bio" value={bio} />
          <button type="submit">Save</button>
        </form>
      </div>
    )
  }
}

mapState = () => {

}

mapDispatch = () => {
  
}

export default connect()(ArtistForm)
