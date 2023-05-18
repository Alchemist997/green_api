import InputPhone from '../ui/InputPhone/InputPhone';
import MessageInput from './../ui/inputs/MessageInput';
import Message from './../ui/messages/Message';

function ChatArea({ currentChat, setCurrentChat, chatHistory, setChatsHistory }) {

  return (
    <div className='chat-area'>
      {currentChat
        ? currentChat === 'new'
          ? <InputPhone
            setCurrentChat={setCurrentChat}
            setChatsHistory={setChatsHistory}
          />
          : <>
            <div className='chat-area__messages'>
              {chatHistory && chatHistory.length
                ? chatHistory
                  .map(el => <Message
                    key={el.time}
                    text={el.text}
                    date={el.time}
                    quoted={el.quoted}
                    incoming={el.incoming} />)

                : <div className='chat-area__empty-info'>Нет новых сообщений</div>
              }
            </div>
            <MessageInput currentChat={currentChat} setChatsHistory={setChatsHistory} />
          </>

        : <button
          className="chat-area__placeholder-btn"
          onClick={() => { setCurrentChat('new'); }}
        >
          Начните новый диалог
        </button>
      }
    </div>
  );
}

export default ChatArea;
