import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getQuestionsAndAnswersCount } from '../utils/helper'

class User extends Component {
	render () {
		const { name, answers, questions, avatarURL } = this.props.user
		const { questionsAnswered, questionsAsked, total } = getQuestionsAndAnswersCount(answers, questions)

		return (
			<div className='child-flex'>
				<div className='header'>
					<span><b>{name}'s stats</b></span>
				</div>
				<img
					src={avatarURL}
					alt={`Avatar of some user`}
				/>
				<div className='divider'></div>
				<div className='grow'>
					<p>Questions asked: {questionsAsked}</p>
					<p>Questions answered: {questionsAnswered}</p>
				</div>
				<div className='total-votes'>
					<div className='header-leaderboard-card'>
						Score
						<div className='total-votes-center'>
							{total}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps({ users }, { id }) {
	return {
		user: users[id],
	}
}

export default connect(mapStateToProps)(User)
