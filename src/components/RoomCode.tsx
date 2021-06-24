import copyImg from '../assets/imagens/copy.svg';

import '../styles/room-code.scss';

type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps){

    function copyRoomCodeToClipboard(){

        navigator.clipboard.writeText(props.code);
    }

    return(
        <button className="room-code" onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span> Sala #-Mcv1UWaol3YySaV64K0</span>
        </button>
    )
}