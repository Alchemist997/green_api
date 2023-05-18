import ChatArea from '../ChatArea/ChatArea';
import SideBar from './../Sidebar/Sidebar/SideBar';
import { useState, useEffect, useContext, useRef } from 'react';
import { getUpdates } from '../../utils/axios';
import { AuthContext } from '../../App';
import Audio from '../ui/audio/Audio';

function WorkingArea() {
  const [currentChat, setCurrentChat] = useState(null);
  const [chatsHistory, setChatsHistory] = useState({});
  const { authState, setAuthState } = useContext(AuthContext);
  const { idInstance, token } = authState;
  const notify = useRef();

  useEffect(() => {
    const startDate = Date.now();
    let active = true;
    checkUpdates();

    function checkUpdates() {

      getUpdates(idInstance, token)
        .then(response => {
          const msgData = response?.body;
          const time = msgData?.timestamp * 1000;
          const text = msgData?.messageData?.textMessageData?.textMessage
            ?? msgData?.messageData?.extendedTextMessageData?.text;

          const isUnAuthorized =
            msgData?.stateInstance === 'notAuthorized'
            && time >= startDate;

          if (isUnAuthorized) {
            setAuthState({ isAuth: false });
            localStorage.removeItem('green_idInstance');
            localStorage.removeItem('green_token');
            alert('Необходимо авторизовать Instance в ЛК Green API');
            return;
          }


          if (text) {
            const quoted = msgData?.messageData?.quotedMessage?.textMessage;
            const senderName = msgData?.senderData.senderName;
            const chatId = msgData?.senderData.chatId.split('@')[0];
            const sender = msgData?.senderData.sender.split('@')[0];
            const wid = msgData?.instanceData.wid.split('@')[0];
            const incoming = sender !== wid || chatId === wid;
            // console.log(chatId, sender, wid, sender !== wid);

            setChatsHistory(prev => {
              const prevMessages = prev[chatId];
              return {
                ...prev,
                [chatId]: prevMessages
                  ? [...prev[chatId], { time, text, quoted, incoming, senderName }]
                  : [{ time, text, quoted, incoming, senderName }]
              };
            });

            console.log(notify);
            notify?.current?.play();
          }


          if (!active) return;
          window.timeoutId = setTimeout(checkUpdates, 0);
        })
        .catch(error => { alert(error.message); });
    }

    return () => {
      active = false;
    };

  }, [idInstance, notify, setAuthState, token]);

  return (
    <div className='working-area'>
      <Audio ref={notify} />

      <SideBar
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
        chatsHistory={chatsHistory}
      />

      <ChatArea
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
        chatHistory={chatsHistory[currentChat]}
        setChatsHistory={setChatsHistory}
      />

    </div>
  );
}

export default WorkingArea;
