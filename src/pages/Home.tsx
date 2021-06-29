import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';
import { Button } from '../components/Button';

import illustrationImg from '../assets/imagens/illustration.svg';
import logoImg from '../assets/imagens/logo.svg';
import googleIconImg from '../assets/imagens/google-icon.svg';

import '../styles/auth.scss';

export function Home() {
    const [ roomCode, setRoomCode ] = useState('');
    const history = useHistory();

    const { signInWitchGoogle, user } = useAuth();

    async function handleCreateRoom() {
        if(!user){
            await signInWitchGoogle()
        }

        history.push('rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault(); 
        
        if(roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()){
            alert('Room does not exist.');
            return;
        }

        if(roomRef.val().endedAt){
            alert("Room alerady closed.");
            return
        }

        history.push(`/rooms/${roomCode}`);

    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg}  alt="Ilustração sobolizando perguntas e respostas" /> 
                <strong>Crie salas de Q&amp;A ao-vivo</strong> 
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>

            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />  
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do google" />
                        Crie sua sala com o Google
                    </button>

                    <div className="separator"> ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                        type="text"
                        placeholder="Digite o código da sala"
                        onChange={event => setRoomCode(event.target.value)}
                        value={roomCode}
                        />
                        <Button type="submit"> 
                            Entrar na sala
                        </Button>
                    </form>
                </div>   
            </main>
        </div>      
    )
}