
import { useHistory, useParams } from 'react-router-dom'

import logImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'

import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'

import { useRoom } from '../hooks/useRoom'


import '../styles/room.scss'
import { database } from '../services/firebase'

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const history = useHistory()

  const { title, questions } = useRoom(roomId)

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    })
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true
    })
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    })

    history.push('/')
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logImg} alt="leatmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}> Encerrar Sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {
            questions.map(question => {
              return (
                <Question
                  key={question.id}
                  content={question.content}
                  author={question.author}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}>
                  {
                    !question.isAnswered && (
                      <>
                        <button
                          onClick={() => handleCheckQuestionAsAnswered(question.id)}
                          type="button"
                        >
                          <img src={checkImg} alt="marcar pergunta como respondida" />
                        </button>
                        <button
                          onClick={() => handleHighlightQuestion(question.id)}
                          type="button"
                        >
                          <img src={answerImg} alt="dar destque a pergutna" />
                        </button>
                      </>
                    )
                  }
                  <button
                    onClick={() => handleDeleteQuestion(question.id)}
                    type="button"
                  >
                    <img src={deleteImg} alt="remover pergunta" />
                  </button>
                </Question>
              )
            })
          }
        </div>
      </main>
    </div>
  )
}