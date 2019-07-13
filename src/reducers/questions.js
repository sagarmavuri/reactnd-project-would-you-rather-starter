import { GET_QUESTIONS, ADD_QUESTION, SAVE_ANSWER } from '../actions/questions'

export default function questions(state = {}, action) {
	switch (action.type) {
		case GET_QUESTIONS :
			return {
				...state,
				...action.questions,
			}
		case ADD_QUESTION :
			return {
				...state,
				[action.question.id]: action.question
			}
		case SAVE_ANSWER :
			return {
				...state,
				[action.qId]: {
		        	...state[action.qId],
		          	[action.option]: {
		            ...state[action.qId][action.option],
		            votes: state[action.qId][action.option].votes.concat([action.authedUser])
		          	}
        		}
			}
		default :
			return state
	}
}