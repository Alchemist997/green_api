function ChatsListItem({ data, action, currentChat, senderName }) {

  const isActive = currentChat === data.chatId;

  return (
    <button
      className={`chat-list-item ${isActive ? 'active' : ''}`}
      onClick={() => { action(data.chatId); }}
    >
      <span className='chat-list-item__chat-id'>+{data.chatId}</span>
      <span className='chat-list-item__text'>{data.lastMessage?.senderName}: {data.lastMessage?.text ?? 'Новый чат'}</span>
    </button>
  );
}

export default ChatsListItem;
