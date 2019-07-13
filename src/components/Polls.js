import React, { Component } from 'react'
import { connect } from 'react-redux'

import { WOULD_YOU_RATHER_TEXT } from '../constants/constants'
import { handleSaveQuestionAnswer } from '../actions/questions'

import { checkQuestionAnswered } from '../utils/helper'
import Progress from './Progress'

class Polls extends Component {

	state = {
		answer: '',
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const { dispatch, ques } = this.props
		const { id } = ques
		const { answer } = this.state
		dispatch(handleSaveQuestionAnswer(id, answer))

	}

	handleOnChange = (e) => {
		const answer = e.target.value
		this.setState(() => ({
			answer,
		}))
	}

	handleOnVote = () => {
		// a placeholder event
	}

	render () {

		const { ques, user, authedUser } = this.props

		if (Object.keys(ques).length === 0) {
			return (
				<div className='flex-center'>
					<h2>Error 404. The page you have requested is no longer available...</h2>
				</div>
			)
		}

		const { optionOne, optionTwo } = ques
		const { avatarURL, name } = user
		const { answered, answer } = checkQuestionAnswered(ques, authedUser)

		const optionOneText = optionOne.text
		const optionTwoText = optionTwo.text

		return (
			<div className='flex-center'>
				{
					answered === true
						?	<div className='child-flex-poll'>
								<div className='header-poll'>
									Asked by {name}
								</div>
								<img
									src={avatarURL}
									alt={`Avatar of some user`}
								/>
								<div className='child-flex-poll-divider'></div>
								<Progress
									answer={answer}
									optionOne={optionOne}
									optionTwo={optionTwo}
								/>
							</div>
						:	<div className='child-flex'>
								<div className='header'>
									<b>{name} asks, {WOULD_YOU_RATHER_TEXT} ... " </b>
								</div>
								<img
									src={avatarURL}
									alt={`Avatar of some user`}
								/>
								<div className='divider'>
								</div>
								<form onSubmit={this.handleSubmit}>
									<ul>
										<li>
											<input
												type='radio'
												value='optionOne'
												checked={this.state.answer === 'optionOne'}
												onChange={this.handleOnChange}
											/> <span> ... {optionOneText}?</span>
										</li>
										<li>
											<input
												type='radio'
												value='optionTwo'
												checked={this.state.answer === 'optionTwo'}
												onChange={this.handleOnChange}
											/> <span> ... {optionTwoText}?</span>
										</li>
									</ul>
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
				}
			</div>
		)
	}
}

function mapStateToProps({ authedUser, questions, users }, props) {
	const { id } = props.match.params
	const question = questions[id]
	return {
		ques: question
			? questions[id]
			: {},
		user: question
			? users[question.author]
			: {},
		authedUser,
	}
}

export default connect(mapStateToProps)(Polls)