import React, { Component } from 'react';
import '../../css/Header.css';

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sortValue: "download",
			limitValue: "20",
		};

		this._handleChange = this._handleChange.bind(this);
	}

	_handleChange(e) {
		let nextState = {};
		nextState[e.target.name] = e.target.value;
		this.setState(nextState);
	}

	render() {
		return (
			<div className="header">
				<ul>
					<li>
						<label htmlFor="sort_by">sort by </label>
						<select id="sort_by" name="sortValue" value={this.state.sortValue} onChange={this._handleChange}>
							<option value="download">download count</option>
							<option value="like">like count</option>
							<option value="rating">rating</option>
							<option value="date_added">date added</option>
						</select>
					</li>
					<li>
						<label htmlFor="limit">limit </label>
						<input type="number" id="limit" name="limitValue" min="1" max="50" value={this.state.limitValue} onChange={this._handleChange} />
					</li>
					<li>
						<button>search!</button>
					</li>
				</ul>
			</div>
		)
	}
}

export default Header