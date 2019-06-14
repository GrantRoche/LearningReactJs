import React, { Component } from "react";
import MovieTable from './movieTable.jsx';
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from '../utils/paginate';
import _ from 'lodash';

class Movies extends Component{
    state = {
        movies : [],
        genres : [],
        moviesPerPageCount : 4,
        activePage: 1,
        sortColumn: { path: 'title', order: 'asc'}
    };

    componentDidMount() {
        // this.handlePage(this.state.activePage);

        const genres = [{_id:"", name:"All Genres"}, ...getGenres()];
        const movies = getMovies();
        this.setState({ movies, genres });
    }


    handleDelete = movie => {
        this.setState({ movies: this.state.movies.filter(movielist => 
             movielist._id !== movie ) });             
        this.handlePage(this.state.activePage);
    }

    handleLike = movie => {
        const movies = [...this.state.movies];        
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].isLike = !movies[index].isLike;
        this.setState({movies});
    }

    handlePageDisplay = movies => {
        let moviesPerPage = this.state.moviesPerPage;        
        this.setState({ moviesPerPage });
    }

    handlePage = (num) => {
        this.setState({activePage : num});
    }

    handleGenre = (genre) => {
        this.setState({selectedGenre : genre, activePage: 1});        
    }

    handleSort = sortColumn => {
        this.setState({ sortColumn });
    }

    getPageData = () => {
        const { moviesPerPageCount, activePage, selectedGenre, movies: allMovies, sortColumn} = this.state;
        
        const filtered = selectedGenre && selectedGenre._id 
        ? allMovies.filter(movie => movie.genre._id === selectedGenre._id) 
        : allMovies;
        
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);          
        const movies = paginate(sorted, activePage, moviesPerPageCount);
        return { totalCount: filtered.length, data: movies };
    }

    render(){
        const { length: count }= this.state.movies;
        const { moviesPerPageCount, activePage, sortColumn} = this.state;

        if(count === 0)
            return <p>There are no movies in the database.</p>;

        const {totalCount, data: movies} = this.getPageData();
        
        return (                       
            <React.Fragment>
                
                <div className="row">
                    <div className="col-s m-5">
                        <ListGroup 
                            items={this.state.genres} 
                            selectedItem={this.state.selectedGenre}
                            onSelectGenre={this.handleGenre}
                        />
                    </div>
                    <div className="col">
                        <p>Showing { totalCount } movies in the database</p>
                        <MovieTable 
                            movies={movies} 
                            sortColumn={sortColumn}
                            onDelete={this.handleDelete} 
                            onLike={this.handleLike}
                            onSort={this.handleSort}/>
                        <Pagination 
                            moviesCount={totalCount} 
                            numMoviesPerPage={moviesPerPageCount}
                            activePage={activePage}
                            selectPage={this.handlePage}
                            />
                    </div>
                </div>   
            </React.Fragment>
        );
    }
}

export default Movies;