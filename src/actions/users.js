export const GET_USERS = 'GET_USERS'
export const UPDATE_USER_QUESTIONS = 'UPDATE_USER_QUESTIONS'
export const UPDATE_USER_ANSWERS = 'UPDATE_USER_ANSWERS'


export function receieveUsers (users) {
	return {
		type: GET_USERS,
		users,
	}
}

export function updateUserQuestions (id, qId) {
	return {
		type: UPDATE_USER_QUESTIONS,
		id,
		qId,
	}
}

export function updateUserAnswers (id, qId, answer) {
	return {
		type : UPDATE_USER_ANSWERS,
		id,
		qId,
		answer,
	}
}