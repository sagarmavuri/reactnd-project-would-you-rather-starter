import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { WOULD_YOU_RATHER_TEXT } from '../constants/constants'
import { formatQuestion } from '../utils/helper'


class Questions extends Component {

	render () {
		const { question } = this.props

		if ( question == null ) {
			return <p>Null question</p>
		}

		const { name, id, avatar, optionOneText } = question
		return (
				<div className='child-flex'>
					<div className='header'>
						{name} {this.props.answered === true ? `asked` : `asks`}, {WOULD_YOU_RATHER_TEXT}
					</div>
					<img
						src={avatar}
						alt={`Avatar of some user`}
					/>
					<div className='divider'></div>
					<div className='grow'>
						<div className='test'>
							<div><i>{optionOneText}</i> <b>OR</b> ...</div>
							<div className='align-self-center link-view-poll'>
								<Link
									to={`/questions/${id}`}
									className='align-link-text'
								>View Poll
								</Link>
							</div>
						</div>
					</div>
				</div>
		)
	}
}

function maptStateToProps({ users, questions, authedUser }, { id, answered }) {
	const question = questions[id]
	return {
		question : question
			? formatQuestion(question, users[question.author], authedUser)
			: {},
		answered,
	}
}

export default connect(maptStateToProps)(Questions)