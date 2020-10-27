import React, { Component } from 'react'
import { connect } from 'react-redux'

class ArtworkForm extends Component {
  constructor() {
    super()
    this.state = {
      isEditing: false,
      title: '',
      description: '',
      year: '',
      price: '',
      quantity: ''
    }
  }

  render() {
    const { title, description, year, price, quantity } = this.state
    return (
      <form>
        <label htmlFor="title">Title</label>
        <input name="title" type="text" value={title} />
        <label>Description</label>
        <textarea name="description" value={description} />
        <label htmlFor="year">Year</label>
        <input name="year" value={year} />
        <label htmlFor="price">Price</label>
        <input name="price" value={price} />
        <label htmlFor="quantity">Quantity</label>
        <input name="quantity" value={quantity} />
        <button type="submit">Save</button>
      </form>
    )
  }
}

const mapState = (state) => {

}

const mapDispatch = (dispatch) => {

}

export default connect(null, null)(ArtworkForm)
