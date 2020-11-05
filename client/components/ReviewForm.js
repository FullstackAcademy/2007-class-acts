import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios'
import { minReviewLength, maxReviewLength } from '../../server/constants'

export default class ReviewForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: 0,
      text: '',
      artwork: {},
      error: '',
      redirect: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.starChange = this.starChange.bind(this)
  }

  handleChange(ev) {
    this.setState({...this.state, [ev.target.name]: ev.target.value})
  }

  starChange(rating) {
    this.setState({...this.state, rating})
  }

  async componentDidMount() {
    const artwork = (await axios.get(`/api/artworks/${this.props.match.params.id}`)).data
    this.setState({...this.state, artwork})
  }

  async handleSubmit(ev) {
    ev.preventDefault()
    if(this.state.text.length < minReviewLength || this.state.text.length > maxReviewLength) this.setState({...this.state, error: `Review must be between ${minReviewLength} and ${maxReviewLength} characters.`})
    else if(this.state.rating === 0) this.setState({...this.state, error:"Choose a star rating 1 to 5."})
    else {
      try {
        const review = (await axios.post('/api/reviews', { ...this.state })).data
        if(review) this.setState({...this.state, redirect: true})
      } catch(err) {
        this.setState({...this.state, error: `Review was not created.`})
        console.log(err)
      }
    }
  }

  render() {
    const { artwork, rating, text, error, redirect } = this.state
    if (redirect) {
      return <Redirect to={`/artworks/${artwork.id}`}/>;
    }
    const starRatings=[]
    for (let i = 1; i <= 5; i++) {
      starRatings.push(<option key={i} value={i}>{i}</option>)
    }
    return (
      <div>
        {artwork.id ?
          <form id="login-form" onSubmit={this.handleSubmit}>
            <h3>Leave your review for:</h3>
            <h2><i>{artwork.title}</i></h2>
            <h4>by {artwork.artist.name}</h4>
            <div className="singleArtImageContainer">
              <img className="singleArtImage" src={artwork.shopImages[0].imageURL} />
            </div>
            <hr />
            {/* it would be nice if this were some pretty, hoverable stars, but I don't want to do that right now */}
            <div id="divRating" className="rating">
              <span onClick={()=>this.starChange(5)} className={rating===5?'rated':null}>☆</span>
              <span onClick={()=>this.starChange(4)} className={rating===4?'rated':null}>☆</span>
              <span onClick={()=>this.starChange(3)} className={rating===3?'rated':null}>☆</span>
              <span onClick={()=>this.starChange(2)} className={rating===2?'rated':null}>☆</span>
              <span onClick={()=>this.starChange(1)} className={rating===1?'rated':null}>☆</span>
            </div>
            {/* Rating:<select name="rating" value={rating} onChange={this.handleChange}>
              {starRatings}
            </select> */}
            <textarea name="text" value={text} onChange={this.handleChange} rows={5} className="reviewText"/>
            <button type="submit" id="login-button" onSubmit={this.handleSubmit}>Submit Review</button>
        { error.length > 0 ? <span className="noQty">{error}</span> : null }
          </form>
          : <div>Something went wrong here.</div>
        }
      </div>
    )
  }
}
