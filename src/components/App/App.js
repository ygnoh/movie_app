import React, { Component } from 'react';
import '../../css/App.css';
import Movie from '../Movie/Movie'

class App extends Component {
	state = {};

	componentDidMount() {
		this._getMovies();
	}

	// async function
	_getMovies = async () => {
		// _callAPI가 완료되기 전 까지 대기한다.
		// async function에서만 가능함
		const movies = await this._callAPI();

		// await가 완료된 후에 실행됨. 그것의 결과가 성공/실패든
		this.setState({
			// equivalent to `movies: movies`
			movies
		})
	};

	_callAPI = () => {
		// fetch는 promise를 return하는데, 이는 then과 catch로 다룰 수 있다. 
		return fetch("https://yts.ag/api/v2/list_movies.json?sort_by=download_count")
		.then(response => response.json())
		.then(json => json.data.movies)
		.catch(err => console.log(err));
	};

	_renderMovies = () => {
		const movies = this.state.movies.map((movie) => {
			return (<Movie
				title={movie.title_english} 
				poster={movie.medium_cover_image}
				genres={movie.genres}
				synopsis={movie.synopsis}
				key={movie.id}
			/>);
		});

		return movies;
	};

	render() {
        const { movies } = this.state;
		return (
			<div className={movies ? "App" : "App--loading"}>
				{this.state.movies ? this._renderMovies() : "Loading..."}
			</div>
		);
	}
}

export default App
