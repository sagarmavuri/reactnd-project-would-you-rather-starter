import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'

import { handleInitialData } from '../actions/shared'
import { removeAuthedUser } from '../actions/authedUser'

import Dashboard from './Dashboard'
import NewPoll from './NewPoll'
import Leaderboard from './Leaderboard'
import Polls from './Polls'
import Login from './Login'
import ProtectedRoute from './ProtectedRoute'
import Nav from './Nav'


class AppRouter extends Component {

	state = {
		loggedOut: false,
	}

	componentDidMount() {
		this.props.dispatch(handleInitialData())
	}

	logOut = () => {
		this.props.dispatch(removeAuthedUser())
		this.setState(() => ({
			loggedOut: true,
		}))
	}

	render () {
		const { loggedOut } = this.state
		const { id, name, avatarURL } = this.props.user

		const { from } = { from: {pathname: '/home'} }

		return (
			<Fragment>
				<LoadingBar />
				<Router>
					{
						id && id !== null
							?	<div className='navigation-box'>
									<div>
										<Nav />
									</div>
									<span>
										<b>Welcome, {name}</b>
									</span>
									<span className='dropdown'>
										<img
											src={avatarURL}
											alt={`Avatar of some user`}
											className='logo'
										/>
										<div className='dropdown-content'> <button onClick={this.logOut}>Sign out</button></div>
									</span>
								</div>
							: 	null
					}
					{
						loggedOut === true
							? 	<Redirect
									to={from} />
							: 	null
					}
					<Route path='/' exact component={Login} />
					<ProtectedRoute path='/home' component={Dashboard} />
					<ProtectedRoute path='/questions/:id' component={Polls} />
					<ProtectedRoute path='/add' component={NewPoll} />
					<ProtectedRoute path='/leaderboard' component={Leaderboard} />
				</Router>
    		</Fragment>
		)
	}
}

function mapStateToProps({ authedUser, users }) {
	return {
		user: authedUser ? users[authedUser] : {},
	}
}

export default connect(mapStateToProps)(AppRouter)