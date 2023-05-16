function Message({ text, quoted, incoming }) {
  return (
    <div className={`message ${incoming ? 'incoming' : ''}`} >
      {quoted ? <span className='message__quoted'>{quoted}</span> : null}
      <span>{text}</span>
    </div>
  );
}

export default Message;
