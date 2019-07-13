export function formatQuestion (question, author, authedUser) {
  const { id, optionOne, optionTwo } = question
  const { name, avatarURL } = author

  return {
    name,
    id,
    avatar: avatarURL,
    optionOneText: optionOne.text,
    optionTwoText: optionTwo.text,
  }
}

/**
 * Filters answered and unanswered questions from the current lot
 */
export function filterQuestions (questions, authedUser) {
  let answered = {}
  let unanswered = {}

  let currentQuestion = {}
  for (var id in questions) {
    currentQuestion = questions[id]
    if (checkQuestionAnswered(currentQuestion, authedUser).answered === true) {
      answered = {
        ...answered,
        [currentQuestion.id]: currentQuestion
      }
    } else {
      unanswered = {
        ...unanswered,
        [currentQuestion.id]: currentQuestion,
      }
    }
  }

  return {
    answered,
    unanswered,
  }
}

/**
 * returns the option 'authedUser' has opted for
 */
export function checkQuestionAnswered (question, authedUser) {

  if (question.optionOne.votes.indexOf(authedUser) > -1)  {
    return {
      answered: true,
      answer: question.optionOne,
    }
  } else if (question.optionTwo.votes.indexOf(authedUser) > -1) {
      return {
        answered: true,
        answer: question.optionTwo,
      }
  } else {
    return {
      answered: false,
      answer: null,
    }
  }

}

/**
 * returns total questions asked, answered by 'authedUser'
 */
export function getQuestionsAndAnswersCount (answers, questions) {

  const questionsAnswered = Object.keys(answers).length
  const questionsAsked = questions.length

 return {
    questionsAnswered,
    questionsAsked,
    total: questionsAsked + questionsAnswered,
  }
}