import { useState, useContext } from 'react';
import { AuthContext } from '../../../App';
import { sendMessage } from '../../../utils/axios';
import SVG from './../svg/SVGList';

function MessageInput({ currentChat, setChatsHistory }) {
  const [messageText, setMessageText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { idInstance, token } = useContext(AuthContext).authState;

  function onSubmitHandler(evt) {
    evt.preventDefault();
    if (!messageText.length) return;

    setIsLoading(true);
    sendMessage(idInstance, token, currentChat, messageText)
      .then(response => {

        setChatsHistory(prev => {
          return {
            ...prev,
            [currentChat]: [...prev[currentChat], { time: Date.now(), text: messageText }]
          };
        });

        setMessageText('');
      })
      .catch(error => { alert(`Ошибка при отправке\r\n\r\n ${error.message}`); })
      .finally(() => { setIsLoading(false); });
  }

  return (
    <div className={`${'message-input-wrap '} ${isLoading ? 'isLoading' : ''}`}>

      <SVG name='loader_circle' />

      <form action='#' onSubmit={onSubmitHandler}>
        <input
          type="text"
          className='message-input'
          value={messageText}
          onChange={evt => { setMessageText(evt.target.value); }}
        />
      </form>
    </div>
  );
}

export default MessageInput;
