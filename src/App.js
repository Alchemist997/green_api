import { useState, useEffect, createContext } from 'react';
import Auth from './components/Auth/Auth';
import WorkingArea from './components/WorkingArea/WorkingArea';

const defaultAuthData = {
  isAuth: false,
  idInstance: null,
  token: null
};

export const AuthContext = createContext();

function App() {
  const [authState, setAuthState] = useState(defaultAuthData);

  useEffect(() => {
    const idInstance = sessionStorage.getItem('green_idInstance');
    const token = sessionStorage.getItem('green_token');
    if (!idInstance || !token) return;
    setAuthState({
      isAuth: true,
      idInstance,
      token,
    });

  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {
        authState.isAuth
          ? <WorkingArea setAuthState={setAuthState} />
          : <Auth setAuthState={setAuthState} />
      }
    </AuthContext.Provider>
  );
}

export default App;
