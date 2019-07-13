import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Select from 'react-select'

import { setAuthedUser } from '../actions/authedUser'
import reactlogo from '../images/react-redux.jpeg'


class Login extends Component {

	state = {
		username: null,
		redirectToReferrer: false,
	}

	handleSubmit = (e) => {
		const { username } = this.state

		e.preventDefault()
		this.props.dispatch(setAuthedUser(username.value))
		this.resetState()
		this.authenticate(username.value)
	}

	resetState = () => {
		this.setState(() => ({
			username: null
		}))
	}

	handleOnChange = (e) => {
		const username = e
		this.setState(() => ({
			username,
		}))
	}

	authenticate = (authedUser) => {
		if (authedUser && authedUser !== null) {
			this.setState(() => ({
				redirectToReferrer: true,
			}))
		}
	}

	render () {
		const { userIDs } = this.props
		const { username } = this.state
		const { from } = this.props.location.state || { from: {pathname: '/home'} }

		if (this.state.redirectToReferrer === true) {
			return (
				<Redirect to={from} />
			)
		}
		return (
			<div className='login-container'>
				<div className='flex-login'>
					<div>
						<h2>Welcome to "Would You Rather...?" App</h2>
					</div>
					<img
						src={reactlogo}
						alt={`Avatar of some user`}
					/>
					<span>Please select the User ID to login</span>
					<form onSubmit={this.handleSubmit} >
						<Select
							value={username}
							onChange={this.handleOnChange}
							options={userIDs}
							className='login-input'
						/>
						<div>
							<button className='submit-login' disabled={this.state.username === null}>Login</button>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

function mapStateToProps({ authedUser, users }) {
	return {
		authedUser,
		userIDs: Object.keys(users).map((userID) => {
			return {
				value: userID,
				label: userID,
			}
		})
	}
}

export default connect(mapStateToProps)(Login)