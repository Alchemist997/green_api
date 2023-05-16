import { useState } from 'react';

function InputPhone({ setCurrentChat, setChatsHistory }) {
  const [inputValue, setInputValue] = useState('');

  function setNewCurrentChat(evt) {
    evt.preventDefault();

    if (!/^\+?\d{11}$/.test(inputValue)) return alert('Введите номер телефона (11 цифр)');

    const chatId = inputValue.replace('+', '');

    setCurrentChat(chatId);
    setChatsHistory(prev => { return { ...prev, [chatId]: [] }; });
  }

  return (
    <div className='input-phone-wrap'>
      <form action="#" className="input-phone__form" onSubmit={setNewCurrentChat}>

        <label className="input-phone__label">
          <p className="">Номер телефона получателя:</p>
          <input
            type="text"
            value={inputValue}
            onChange={evt => { setInputValue(evt.target.value); }}
            placeholder={'79991234567'}
            maxLength={12}
          />
        </label>

      </form>
    </div>
  );
}

export default InputPhone;
