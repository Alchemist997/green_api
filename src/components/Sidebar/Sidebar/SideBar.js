import ChatsList from '../ChatsList/ChatsList';
import SidebarHeader from './../SidebarHeader/SidebarHeader';

function SideBar({ setCurrentChat, chatsHistory, currentChat }) {
  return (
    <aside className='sidebar'>
      <SidebarHeader setCurrentChat={setCurrentChat} />
      <ChatsList chatsHistory={chatsHistory} action={setCurrentChat} currentChat={currentChat} />
    </aside>
  );
}

export default SideBar;
