import React, { Component } from 'react';

class Like extends Component {
   render() { 
        const {movies, onClick} = this.props;
        
        return (  
            <i 
                className={this.getStatus(movies.isLike)} 
                onClick={() => onClick()}
                aria-hidden="true">
            </i>
        );
    }
    getStatus(stat) {
        return (stat) ? "fa fa-heart" : "fa fa-heart-o";
    }
}

export default Like;