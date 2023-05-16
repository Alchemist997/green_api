function ChatsListItem({ data, action, currentChat }) {

  const isActive = currentChat === data.chatId;

  return (
    <button
      className={`chat-list-item ${isActive ? 'active' : ''}`}
      onClick={() => { action(data.chatId); }}
    >
      <span className='chat-list-item__chat-id'>+{data.chatId}</span>
      <span className='chat-list-item__text'>{data.lastMessage?.text ?? 'Новый чат'}</span>
    </button>
  );
}

export default ChatsListItem;
