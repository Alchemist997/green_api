import ChatsListItem from '../ChatsListItem/ChatsListItem';

function ChatsList({ chatsHistory, action, currentChat }) {
  return (
    <>
      {
        Object.entries(chatsHistory)
          .map(([key, val]) => <ChatsListItem
            key={key}
            data={{ chatId: key, lastMessage: val.at(-1) }}
            currentChat={currentChat}
            action={action}
          />)
      }
    </>
  );
}

export default ChatsList;
