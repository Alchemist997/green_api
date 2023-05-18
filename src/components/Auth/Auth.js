import { useState } from 'react';
import { checkAuthStatus } from '../../utils/axios';
import BtnDefault from './../ui/buttons/BtnDefault/BtnDefault';
import BtnLink from './../ui/buttons/BtnLink/BtnLink';

function Auth({ setAuthState }) {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  function authorize(evt) {
    evt.preventDefault();

    if (!idInstance || !apiTokenInstance) return;

    setIsLoading(true);

    checkAuthStatus(idInstance, apiTokenInstance)
      .then(response => {
        const isInstanceAuth = response.data.statusInstance === 'online';
        if (!isInstanceAuth) throw new Error('NOT_AUTH');
        setAlert(null);
        setAuthState({
          isAuth: true,
          idInstance,
          token: apiTokenInstance,
        });
        localStorage.setItem('green_idInstance', idInstance);
        localStorage.setItem('green_token', apiTokenInstance);
      })
      .catch(error => {
        error.message === 'NOT_AUTH'
          ? setAlert('NOT_AUTH')
          : setAlert(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className='auth'>
      <div className="auth__wrap">
        <form action="#" className="auth__form" onSubmit={authorize}>
          <p className="auth__title">
            Авторизация
          </p>

          <input
            type="text"
            className="auth__input"
            value={idInstance}
            onChange={evt => { setIdInstance(evt.target.value); }}
            placeholder='idInstance'
          />

          <input
            type="text"
            className="auth__input"
            value={apiTokenInstance}
            onChange={evt => { setApiTokenInstance(evt.target.value); }}
            placeholder='apiTokenInstance'
          />

          <BtnDefault disabled={isLoading}>Войти</BtnDefault>

          <BtnLink text='Регистрация' href='https://console.green-api.com/' />
        </form>

        {alert
          ? alert === 'NOT_AUTH'
            ? <p className="auth__alert">
              <span>Для использования этого Instance, сначала авторизуйте его </span>
              <a
                href='https://console.green-api.com/instanceList'
                target='_blank'
                rel='noreferrer'
              >на сайте green API</a>
            </p>

            : <p className="auth__alert">{alert}</p>

          : null
        }
      </div>
    </div>
  );
}

export default Auth;
