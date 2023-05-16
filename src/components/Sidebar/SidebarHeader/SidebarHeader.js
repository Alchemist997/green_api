import { useContext } from 'react';
import { AuthContext } from '../../../App';
import BtnDefault from './../../ui/buttons/BtnDefault/BtnDefault';
import SVG from './../../ui/svg/SVGList';

function SidebarHeader({ setCurrentChat }) {
  const setAuthState = useContext(AuthContext).setAuthState;

  return (
    <div className='sidebar__header'>
      <BtnDefault title='Новое сообщение' action={() => { setCurrentChat('new'); }}>
        <SVG name='new_message' />
      </BtnDefault>

      <BtnDefault
        title='Выйти'
        action={() => {
          setAuthState({ isAuth: false });
          sessionStorage.removeItem('green_idInstance');
          sessionStorage.removeItem('green_token');
        }}>

        <SVG name='logout' />
      </BtnDefault>
    </div>
  );
}

export default SidebarHeader;
