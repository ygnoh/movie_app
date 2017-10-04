import React, { Component } from 'react';
import '../../css/Header.css';

class Header extends Component {
	render() {
		return (
			<div className="header">
				<ul>
					<li>
						<label htmlFor="sort_by">sort by </label>
						<select id="sort_by" value={"like"} onChange={()=>{}}>
							<option value="download">download count</option>
							<option value="like">like count</option>
							<option value="rating">rating</option>
							<option value="date_added">date added</option>
						</select>
					</li>
					<li>
						<label htmlFor="limit">limit </label>
						<input type="number" id="limit" min="1" max="50" value="20" onChange={()=>{}}/>
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