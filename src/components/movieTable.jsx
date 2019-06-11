import React, { Component } from 'react';
import TableHeader from './common/tableHeader';
import TableBody from './common/tableBody';
import Like from './common/like';

class MovieTable extends Component {
    columns = [
        { path: 'title', label: 'Title' },
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
            <table className="table">
                <TableHeader 
                    columns={this.columns}
                    sortColumn={sortColumn}
                    onSort={onSort}/>
                <TableBody 
                    data={movies}
                    columns={this.columns}/>
            </table> 
        );
    }
}
 
export default MovieTable;