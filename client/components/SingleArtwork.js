import React from  'react';
import { connect } from 'react-redux';
import { getArtwork } from '../redux/artwork';

export class SingleArtwork extends React.Component {

    async componentDidMount(){
        await this.props.getArtwork(this.props.match.params.id)
    }

    render(){
        console.log("props in render", this.props.artwork)
        return (
        <div>
            <div>
                {(this.props.artwork.shopImages)

                ?

                <div style={{display: "flex"}}>
                    <img src = {this.props.artwork.shopImages[0].imageURL} style={{width: "20%", height: "20%", paddingTop: "10%", paddingLeft: "25%"}} /* Added inline temporary styling, to see how it looks*//>
                    <div style={{paddingLeft: "20%", paddingTop: "10%"}}>
                        <h2>{this.props.artwork.title}</h2>
                        <p>{`By ${this.props.artwork.artist.name}`}</p>
                        <p>{`$${this.props.artwork.price}`}</p>

                        <hr />
                        <h2>Art Description</h2>
                        <p>{this.props.artwork.description}</p>
                        <hr />

                        <h2>Artist Bio</h2>
                        <p>{this.props.artwork.artist.bio}</p>
                    </div>
                </div>

                :

                <h2>No image found</h2>}
            </div>

        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        artwork: state.artwork,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getArtwork: (id) => dispatch(getArtwork(id)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SingleArtwork);
