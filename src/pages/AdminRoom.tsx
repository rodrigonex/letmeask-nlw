// import { FormEvent, useState } from 'react';
import { useParams } from 'react-router';

import logoImg from '../assets/imagens/logo.svg';
import deleteImg from '../assets/imagens/delete.svg';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';

import { database } from '../services/firebase';
import { Question } from '../components/Questions';

import { useRoom } from '../hooks/useRoom';
import { useHistory } from 'react-router-dom';

import '../styles/room.scss';

type RoomParams = {
    id: string;
}

export function AdminRoom () {
    const history = useHistory()
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { title, questions } = useRoom(roomId);
  
    async function handleDeleteQuestion(questionId: string){
        if(window.confirm('Tem certeza que você deseja excluir esta pergunta?')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();  
        }
    }

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        })

        history.push("/");
    }
    return (
        <div id="page-room">
            <header>
                <div className="content-header">
                    <img src={logoImg} alt="letmeask"></img>
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
                    </div>
                </div>
            </header>

            <main className="content">
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} pergunta(s) </span>}
                </div>

                {questions.map(question => {
                    return(
                        <Question 
                            key={question.id}
                            content={question.content}
                            author={question.author}
                        >
                            <button
                                type="button"
                                onClick={() => handleDeleteQuestion(question.id)}
                            >
                                <img src={deleteImg} alt="deletar" />
                            </button>
                        </Question>
                    )
                })}
            </main>
        </div>
    )    
}