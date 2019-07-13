import { GET_USERS, UPDATE_USER_QUESTIONS, UPDATE_USER_ANSWERS } from '../actions/users'

export default function users(state = {}, action) {
	switch (action.type) {
		case GET_USERS :
			return {
				...state,
				...action.users,
			}
		case UPDATE_USER_QUESTIONS :
			return {
				...state,
				[action.id]: {
					...state[action.id],
					questions: state[action.id].questions.concat([action.qId])
				}

			}
		case UPDATE_USER_ANSWERS :
			console.log('action', action)
			return {
				...state,
				[action.id]: {
		          	...state[action.id],
		          	answers: {
		            	...state[action.id].answers,
		            	[action.qId]: action.answer
		        	}
    			}
			}
		default :
			return state
	}
}