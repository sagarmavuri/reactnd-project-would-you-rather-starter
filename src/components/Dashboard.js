import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'react-bootstrap'

import { filterQuestions } from '../utils/helper'
import Questions from './Questions'

class Dashboard extends Component {

	state = {
		selection: 'unanswered',
	}

	handleSelect = (selectedTab) => {
		this.setState(() => ({
			selection: selectedTab,
		}))
	}

	render () {
		return (
			<div className='deals'>
				<Tabs activeKey={this.state.selection} onSelect={this.handleSelect}>
					<Tab eventKey='unanswered' title='Unaswered' >
						<ul>
							{this.props.unansweredQIDs.map((id) => (
								<li key={id}>
									<Questions id={id} answered={false} />
								</li>
							))}
						</ul>
					</Tab>
					<Tab eventKey='answered' title='Answered' >
						<ul>
							{this.props.answeredQIDs.map((id) => (
								<li key={id}>
									<Questions id={id} answered={true} />
								</li>
							))}
						</ul>
					</Tab>
				</Tabs>
      		</div>
		)
	}
}

function mapStateToProps({ questions, authedUser }) {

	const { answered, unanswered } = filterQuestions(questions, authedUser)

	return {
		unansweredQIDs: Object.keys(unanswered)
			.sort((a, b) => questions[b].timestamp - questions[a].timestamp),
		answeredQIDs: Object.keys(answered)
			.sort((a, b) => questions[b].timestamp - questions[a].timestamp)
	}
}
export default connect(mapStateToProps)(Dashboard)