function Message({ text, quoted, incoming, date }) {

  const time = new Date(date);
  const minutes = `${time.getMinutes()}`;

  return (
    <div className={`message ${incoming ? 'incoming' : ''}`} >
      {quoted ? <span className='message__quoted'>{quoted}</span> : null}
      <span>{text}</span>
      <span className='message__time'>{time.getHours()}:{minutes.length > 1 ? minutes : 0 + minutes}</span>
    </div>
  );
}

export default Message;
