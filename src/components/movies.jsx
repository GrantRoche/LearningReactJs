import React, { Component } from "react";
import Like from "./common/like";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from '../utils/paginate';

class Movies extends Component{
    state = {
        movies : [],
        genres : [],
        moviesPerPageCount : 4,
        moviesPerPage : [],
        activePage: 1,
        selectedGenre: {}
    };

    componentDidMount() {
        // this.handlePage(this.state.activePage);

        const genres = [{ name:"All Genres"}, ...getGenres()];
        this.setState({ movies:getMovies(), genres });
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

    render(){
        const { length: count }= this.state.movies;
        const { moviesPerPageCount, activePage, selectedGenre, movies: allMovies} = this.state;

        if(count === 0)
            return <p>There are no movies in the database.</p>;

        const filtered = selectedGenre && selectedGenre._id 
                ? allMovies.filter(movie => movie.genre._id === selectedGenre._id) 
                : allMovies;
        const movies = paginate(filtered, activePage, moviesPerPageCount);
        
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
                        <p>Showing { filtered.length } movies in the database</p>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Genre</th>
                                    <th>Stock</th>
                                    <th>Rate</th>
                                    <th></th>
                                    <th></th>                        
                                </tr>
                            </thead>
                            <tbody>
                                { movies.map(movie => 
                                    <tr key = { movie._id }>
                                        <td>{ movie.title }</td>
                                        <td>{ movie.genre.name }</td>
                                        <td>{ movie.numberInStock }</td>
                                        <td>{ movie.dailyRentalRate }</td> 
                                        <td><Like 
                                                movies={movie}
                                                onClick={() => this.handleLike(movie)}
                                            />
                                        </td>
                                        <td><button onClick={ () => this.handleDelete(movie._id) } 
                                            className="btn btn-danger" >Delete</button></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <Pagination 
                            moviesCount={filtered.length} 
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