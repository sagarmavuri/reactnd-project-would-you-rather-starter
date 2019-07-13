import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav (props) {
	return (
		<nav className='nav'>
			<ul>
				<li>
					<NavLink to='/home' exact activeClassName='active'>
						Home
					</NavLink>
				</li>
				<li>
					<NavLink to='/add' exact activeClassName='active'>
						New Poll
					</NavLink>
				</li>
				<li>
					<NavLink to='/leaderboard' exact activeClassName='active'>
						Leaderboard
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}