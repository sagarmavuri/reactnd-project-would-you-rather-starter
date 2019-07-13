import React, { Component } from 'react'
import { IoIosCheckmarkCircle } from 'react-icons/io'

class Progress extends Component {

	/**
	 * Calculates percentage of votes given to every option
	 */
	calculatePercentage = (votes, total) => {
		if (votes === 0 && total === 0) {
			return '0%'
		}
		return `${parseInt((votes / total) * 100)}%`
	}

	render () {

		const { answer, optionOne, optionTwo } = this.props

		const optionOneVotes = optionOne.votes.length
		const optionTwoVotes = optionTwo.votes.length
		const totalVotes = optionOneVotes + optionTwoVotes

		const optionOnePercentage = this.calculatePercentage(optionOneVotes, totalVotes)
		const optionTwoPercentage = this.calculatePercentage(optionTwoVotes, totalVotes)

		return (
			<div className='poll-results'>

				{/* Option one */}
				<div className='progress-percent-box'>
					<div className='progress-percent-box-text-align'>
						Would you rather {optionOne.text}?
					</div>
					<div className='progress-percent'>
						<div className='filler' style={{'width': `${optionOnePercentage}`}}>
							<span>{optionOnePercentage}</span>
							<span>[{optionOneVotes} of {totalVotes} votes]</span>
						</div>
					</div>
					{
						answer.text === optionOne.text && (
							<div className='icon'>
								<IoIosCheckmarkCircle
									fontSize='33px'
									color='green'
								/>
							</div>
						)
					}
				</div>
				<div className='center'>
					<b>OR</b>
				</div>
				{/* Option two */}
				<div className='progress-percent-box'>
					<div className='progress-percent-box-text-align'>
						Would you rather {optionTwo.text}?
					</div>
					<div className='progress-percent'>
						<div className='filler' style={{'width': `${optionTwoPercentage}`}}>
							<span>{optionTwoPercentage}</span>
							<span>[{optionTwoVotes} of {totalVotes} votes]</span>
						</div>
					</div>
					{
						answer.text === optionTwo.text && (
							<div className='icon'>
								<IoIosCheckmarkCircle
									fontSize='33px'
									color='green'
								/>
							</div>
						)
					}
				</div>
			</div>
		)
	}
}

export default Progress