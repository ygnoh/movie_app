import React, { Component } from 'react';
import '../../css/App.css';
import Movie from "../Movie/Movie";
import Header from "../Header/Header";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			uri: "https://yts.ag/api/v2/list_movies.json?sort_by=download_count",
			page: 1,
			isLoading: true,
		};

		this.getMovies = this.getMovies.bind(this);

		this._bindScrollEvent();
	}

	componentDidMount() {
		this.getMovies();
	}

	_bindScrollEvent() {
		window.onscroll = () => {
			this._isScrollAtBottom() && this._loadNextPage();
		}
	}

	_isScrollAtBottom() {
		let scrollPosition = window.innerHeight + window.pageYOffset;
		let pageHeight = this.refs.mainContents.offsetHeight;

		// mac에서 이슈가 있다고 하여서 +2 하였다.
		// https://stackoverflow.com/a/40370876/5247212
		return scrollPosition + 2 >= pageHeight;
	}

	_loadNextPage() {
		if (this.state.isLoading) {
			return false;
		}

		this.setState((prevState) => {
			return {
				page: prevState.page + 1,
				isLoading: true,
			};
		});

		this.getMovies(this.state.uri, this.state.page);
	}

	// async function
	getMovies = async (uri=this.state.uri, page=1) => {
		this.setState({
			uri,
			page,
			isLoading: true,
		});

		// _callAPI가 완료되기 전 까지 대기한다.
		// async function에서만 가능함
		const movies = await this._callAPI(uri + "&page=" + page);

		// await가 완료된 후에 실행됨. 그것의 결과가 성공/실패든
		this.setState({
			// equivalent to `movies: movies`
			movies,
			isLoading: false,
		})
	};

	_callAPI = (uri) => {
		// fetch는 promise를 return하는데, 이는 then과 catch로 다룰 수 있다. 
		return fetch(uri)
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
		return (
			<div className="main-frame">
				<Header getMovies={this.getMovies} />
				<div ref="mainContents" className={this.state.isLoading ? "App--loading" : "App"}>
					{this.state.isLoading ? "Loading..." : this._renderMovies()}
				</div>
			</div>
		);
	}
}

export default App
