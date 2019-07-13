import { showLoading, hideLoading } from 'react-redux-loading'
import { saveQuestions, saveQuestionAnswer } from '../utils/api'
import { updateUserQuestions, updateUserAnswers } from './users'

export const GET_QUESTIONS = 'GET_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const SAVE_ANSWER = 'SAVE_ANSWER'

export function receieveQuestions (questions) {
	return {
		type: GET_QUESTIONS,
		questions,
	}
}

function addQuestion (question) {
	return {
		type: ADD_QUESTION,
		question
	}
}

function saveAnswer (qId, option, authedUser) {
	return {
		type: SAVE_ANSWER,
		qId,
		option,
		authedUser,
	}
}
export function handleAddQuestion (optionOneText, optionTwoText) {

	return (dispatch, getState) => {

		const { authedUser } = getState()
		dispatch(showLoading())
		return saveQuestions({
				optionOneText,
				optionTwoText,
				author: authedUser
			})
			.then((question) => {
				dispatch(addQuestion(question))
				dispatch(updateUserQuestions(authedUser, question.id))
				dispatch(hideLoading())
			})
	}
}

export function handleSaveQuestionAnswer (qid, answer) {

	return (dispatch, getState) => {

		const { authedUser } = getState()
		dispatch(showLoading())
		return saveQuestionAnswer({authedUser, qid, answer})
			.then(() => {
				dispatch(saveAnswer(qid, answer, authedUser))
				dispatch(updateUserAnswers(authedUser, qid, answer))
				dispatch(hideLoading())
			})
	}
}

