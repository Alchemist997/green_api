import ChatArea from '../ChatArea/ChatArea';
import SideBar from './../Sidebar/Sidebar/SideBar';
import { useState, useEffect, useContext } from 'react';
import { getUpdates } from '../../utils/axios';
import { AuthContext } from '../../App';

function WorkingArea() {
  const [currentChat, setCurrentChat] = useState(null);
  const [chatsHistory, setChatsHistory] = useState({});
  const { authState, setAuthState } = useContext(AuthContext);
  const { idInstance, token } = authState;

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
            sessionStorage.removeItem('green_idInstance');
            sessionStorage.removeItem('green_token');
            alert('Необходимо авторизовать Instance в ЛК Green API');
            return;
          }


          if (text) {
            const quoted = msgData?.messageData?.quotedMessage?.textMessage;
            const sender = msgData?.senderData.sender.split('@')[0];

            setChatsHistory(prev => {
              const prevMessages = prev[sender];
              return {
                ...prev,
                [sender]: prevMessages
                  ? [...prev[sender], { time, text, quoted, incoming: true }]
                  : [{ time, text, quoted, incoming: true }]
              };
            });
          }


          if (!active) return;
          window.timeoutId = setTimeout(checkUpdates, 0);
        })
        .catch(error => { alert(error.message); });
    }

    return () => {
      active = false;
    };

  }, [idInstance, setAuthState, token]);

  return (
    <div className='working-area'>

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
