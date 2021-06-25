
import { useContext } from 'react'
import { useHistory } from 'react-router-dom';

import { Button } from '../components/Button'

import '../styles/auth.scss'

import { auth, firebase } from '../services/firebase'

import illustrationImg from '../assets/images/illustration.svg'
import logImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import { TestContext } from '../App'

export function Home() {
  const history = useHistory();
  const { value, setValue } = useContext(TestContext)

  function handleCreateRoom() {
    const provider = new firebase.auth.GoogleAuthProvider()

    auth.signInWithPopup(provider)
      .then(result => {
        console.log(result)
      })

    // history.push('/rooms/new')
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="" />
        <strong> Crie salas de Q&amp;A ao-vivo </strong>
        <p>
          Tire as dúvidas da sua audiência em tempo-real
        </p>
      </aside>
      <main>
        <h1> { value }</h1>
        <div className="main-content">
          <img src={logImg} alt="" />

          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="" />
            Crie sua sala com o Google
          </button>

          <div className="separator">
            ou entre em uma sala
          </div>

          <form>
            <input
              type="text"
              placeholder="Digite o código da sala" />

            <Button type="submit"> Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}