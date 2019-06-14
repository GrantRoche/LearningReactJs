import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Like from './common/like';
import Table from './common/table';


class MovieTable extends Component {
    columns = [
        { path: 'title', label: 'Title', content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link> },
        { path: 'genre.name', label: 'Genre' },
        { path: 'numberInStock', label: 'Stock' },
        { path: 'dailyRentalRate', label: 'Rate' },
        { 
            key: 'like', 
            content: movie => 
                <Like liked={movie.isLike} onClick={() => this.props.onLike(movie)} />},
        {   
            key: 'delete', 
            content: movie => 
                <button onClick={ () => this.props.onDelete(movie._id) } 
        className="btn btn-danger" >Delete</button>}
    ];


    render() { 
        const {movies, onSort, sortColumn} = this.props;
        return ( 
           <Table columns={this.columns} data={movies} sortColumn={sortColumn} onSort={onSort}/>
        );
    }
}
 
export default MovieTable;