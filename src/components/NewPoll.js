import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { handleAddQuestion } from '../actions/questions'
import { WOULD_YOU_RATHER_TEXT } from '../constants/constants'


class NewPoll extends Component {

	state = {
		optionOne: '',
		optionTwo: '',
		redirectToHome: false,
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const { optionOne, optionTwo } = this.state
		if (optionOne.trim() === '' || optionTwo.trim() === '') {
			alert('Please enter valid options')
		} else {
			this.props.dispatch(handleAddQuestion(optionOne, optionTwo))
			this.setState(() => ({
				optionOne: '',
				optionTwo: '',
				redirectToHome: true,
			}))
		}
	}

	handleOptionOneChange = (e) => {
		const optionOne = e.target.value
		this.setState(() => ({
			optionOne
		}))
	}

	handleOptionTwoChange = (e) => {
		const optionTwo = e.target.value
		this.setState(() => ({
			optionTwo
		}))
	}

	render () {
		const { optionOne, optionTwo } = this.state

		if ( this.state.redirectToHome === true ) {
			return (
				<Redirect to='/home' />
			)
		}
		return (
			<div className='flex-center'>
				<div className='new-question-body'>
					<div>
						<b>Create a new question</b>
					</div>
						<form onSubmit={this.handleSubmit}>
							<p><b>{WOULD_YOU_RATHER_TEXT} ...</b></p>
							<div>
								<input
									type='text'
									value={optionOne}
									placeholder='Please enter option one here'
									onChange={this.handleOptionOneChange}
									className='new-question-input'
								/>
							</div>
							<div className='align-self-center'> <b>OR</b> </div>
							<div>
								<input
									type='text'
									value={optionTwo}
									placeholder='Please enter option two here'
									onChange={this.handleOptionTwoChange}
									className='new-question-input'
								/>
							</div>
							<div className='align-self-center'>
								<button
									className='submit'
									type='submit'
								>
									Submit
								</button>
							</div>
						</form>
				</div>
			</div>
		)
	}
}

/*function mapStateToProps({ authedUser, users }) {
	return {
		user: authedUser
			? users[authedUser]
			: {},
	}
}*/
export default connect()(NewPoll)