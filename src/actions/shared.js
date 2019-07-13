import { getInitialData } from '../utils/api'
import { receieveUsers } from './users'
import { receieveQuestions } from './questions'
import { showLoading, hideLoading } from 'react-redux-loading'

export function handleInitialData() {

	//const AUTHED_ID = 'tylermcginnis'

	return (dispatch) => {
		dispatch(showLoading())
		return getInitialData()
			.then(({ users, questions }) => {
				dispatch(receieveUsers(users))
				dispatch(receieveQuestions(questions))
				//dispatch(setAuthedUser(AUTHED_ID))
				dispatch(hideLoading())
			})
	}
}