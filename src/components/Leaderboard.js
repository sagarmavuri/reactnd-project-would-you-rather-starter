import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getQuestionsAndAnswersCount } from '../utils/helper'
import User from './User'

class Leaderboard extends Component {
	render () {
		const { userIDs } = this.props
		return (
			<div className='flex-center'>
				<ul>
					{userIDs.map((user) => (
						<li key={user}>
							<User id={user}/>
						</li>
					))}
				</ul>
			</div>
		)
	}
}

function mapStateToProps({ users }) {

	return {
		userIDs: Object.keys(users).sort(
			(a, b) => getQuestionsAndAnswersCount(users[b].answers, users[b].questions).total - getQuestionsAndAnswersCount(users[a].answers, users[a].questions).total
		),
	}
}
export default connect(mapStateToProps)(Leaderboard)