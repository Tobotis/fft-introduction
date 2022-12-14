import * as React from 'react'
import { arraysEqual } from '../utils/general'

/* Beispiel-Nutzung:

<Quiz>
  Wie findest du dieses Quiz?
  <Answer>Gut</Answer>
  <Answer correct={true}>Schlecht</Answer>
</Quiz>

*/

export class Answer {
  text
  correct

  constructor(text: string, correct = false) {
    this.text = text
    this.correct = correct
  }
}

const MultipleCorrectAnswersQuiz: any = (
  children: Array<any>,
  elements: Array<any>,
  question: string,
  answers: Array<any>,
  correct_answers: Array<boolean>
) => {
  let [result, setResult]: any = React.useState('')
  let [result_positive, setResult_positive]: any = React.useState(true)

  function onTickedWrapper(index: number) {
    return (event: React.BaseSyntheticEvent) => {
      onTicked(event, index)
    }
  }

  function onTicked(event: React.BaseSyntheticEvent, index: number) {
    let state: boolean = event.target.checked
    let copy: Array<boolean> = selected_answers
    copy[index] = state
    set_selected_answers(copy)
  }

  function onAnswer() {
    // Richtige Anzahl prüfen
    let selected_answer_count: number = selected_answers.filter((e) => e).length
    if (selected_answer_count != correct_answer_count) {
      setResult(
        'Du hast ' +
          selected_answer_count +
          ' statt ' +
          correct_answer_count +
          ' Antworten ausgewählt.'
      )
      setResult_positive(false)
      return
    }

    if (arraysEqual(selected_answers, correct_answers)) {
      setResult('Richtig!')
      setResult_positive(true)
      return
    } else {
      setResult('Dies ist leider nicht korrekt. Probiere es nochmal!')
      setResult_positive(false)
      return
    }
  }

  let [selected_answers, set_selected_answers] = React.useState(
    Array(answers.length).fill(false)
  )

  answers.forEach((answer, index) => {
    if (answer.props['correct']) {
      correct_answers[index] = true
    }
  })

  let correct_answer_count = answers.filter((e) => {
    let props = e.props
    if (props['correct']) {
      return true
    }
  }).length

  return (
    <div className="border-2 border-gray-400 p-3 rounded-2xl my-5 w-auto">
      <div className="flex flex-col space-y-0">
        <p className="text-lg p-0 m-0">{question}</p>
        <p className="text-gray-600 text-xs m-0 pt-0">
          Es gibt {correct_answer_count} korrekte{' '}
          {correct_answer_count == 1 ? 'Antwort' : 'Antworten'}.
        </p>
      </div>
      <div className="pt-3">
        {answers.map((e, i) => {
          return (
            <div>
              <input
                type="checkbox"
                key={i}
                onClick={onTickedWrapper(i)}
                value={selected_answers[i]}
              />{' '}
              {e.props.children}
            </div>
          )
        })}
      </div>
      {result != '' ? (
        result_positive ? (
          <div className={'text-xs text-green-500'}>{result}</div>
        ) : (
          <div className={'text-xs text-red-700'}>{result}</div>
        )
      ) : (
        <></>
      )}

      <button type="button" onClick={onAnswer} className="mt-3">
        <div className="bg-sky-500 text-white rounded-lg px-2 py-1">
          Antworten
        </div>
      </button>
    </div>
  )
}

const OneCorrectAnswersQuiz: any = (
  children: Array<any>,
  elements: Array<any>,
  question: string,
  answers: Array<any>,
  correct_answers: Array<boolean>
) => {
  let [result, setResult]: any = React.useState('')
  let [result_positive, setResult_positive]: any = React.useState(true)

  function onTickedWrapper(index: number) {
    return (event: React.BaseSyntheticEvent) => {
      onTicked(event, index)
    }
  }

  function onTicked(event: React.BaseSyntheticEvent, index: number) {
    let new_ticked_answers = Array(answers.length).fill(false)
    new_ticked_answers[index] = true
    set_selected_answers(new_ticked_answers)
  }

  function onAnswer() {
    if (arraysEqual(selected_answers, correct_answers)) {
      setResult('Richtig!')
      setResult_positive(true)
      return
    } else {
      setResult('Dies ist leider nicht korrekt. Probiere es nochmal!')
      setResult_positive(false)
      return
    }
  }

  let [selected_answers, set_selected_answers] = React.useState(
    Array(answers.length).fill(false)
  )

  answers.forEach((answer, index) => {
    if (answer.props['correct']) {
      correct_answers[index] = true
    }
  })

  let correct_answer_count = answers.filter((e) => {
    let props = e.props
    if (props['correct']) {
      return true
    }
  }).length

  return (
    <div className="border-2 border-gray-400 p-3 rounded-2xl my-5 w-auto">
      <div className="flex flex-col space-y-0">
        <p className="text-lg p-0 m-0">{question}</p>
        <p className="text-gray-600 text-xs m-0 pt-0">
          Es gibt {correct_answer_count} korrekte{' '}
          {correct_answer_count == 1 ? 'Antwort' : 'Antworten'}.
        </p>
      </div>
      <form>
        <div className="pt-3">
          {answers.map((e, i) => {
            return (
              <div>
                <input
                  type="radio"
                  onClick={onTickedWrapper(i)}
                  key={i}
                  name="answer"
                />{' '}
                {e.props.children}
              </div>
            )
          })}
        </div>
      </form>
      {result != '' ? (
        result_positive ? (
          <div className={'text-xs text-green-500'}>{result}</div>
        ) : (
          <div className={'text-xs text-red-700'}>{result}</div>
        )
      ) : (
        <></>
      )}

      <button type="button" onClick={onAnswer} className="mt-3">
        <div className="bg-sky-500 text-white rounded-lg px-2 py-1">
          Antworten
        </div>
      </button>
    </div>
  )
}

const Quiz: React.FC = ({ children }: any) => {
  let elements: Array<any> = children.props.children
  let question: string = elements[0]
  let answers: Array<any> = elements.filter((e) => {
    return e.type?.name == 'Answer'
  })

  let correct_answers: Array<boolean> = Array(answers.length).fill(false)

  let correct_answer_count = answers.filter((e) => {
    let props = e.props
    if (props['correct']) {
      return true
    }
  }).length

  if (correct_answer_count == 1) {
    return OneCorrectAnswersQuiz(
      children,
      elements,
      question,
      answers,
      correct_answers
    )
  }

  return MultipleCorrectAnswersQuiz(
    children,
    elements,
    question,
    answers,
    correct_answers
  )
}

export default Quiz
