import React, { Component } from 'react';

class Like extends Component {
   render() { 
        const {liked, onClick} = this.props;
        
        return (  
            <i 
                className={this.getStatus(liked)} 
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