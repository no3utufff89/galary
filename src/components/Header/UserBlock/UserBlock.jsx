import style from './UserBlock.module.css';
import { RxAvatar } from 'react-icons/rx';
import { urlAuth } from '../../../api/auth';
import { useAuth } from '../../../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { clearLs } from '../../../api/token';
import { authLogout } from '../../../store/slice/authSlice';
import { deleteToken } from '../../../store/slice/tokenSlice';

export const UserBlock = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.token.token);
  const [userProfileData, dataLoading] = useAuth();

  const handleLogout = () => {
    dispatch(deleteToken());
    dispatch(authLogout());
    clearLs();
  };

  return (
    <div className={style.wrapper}>
      {!token && <>
        <RxAvatar size={80}/>
        <a href={urlAuth}>Войти</a>
      </>}
      {dataLoading && <p>Загрузка...</p>}
      {token && (<>
        <img
          src={userProfileData.image}
          alt="Аватарка пользователя"
          aria-label="Аватарка пользователя"
          className={style.profile_image}
        />
        <p className={style.user_name}>{userProfileData.username}</p>
        <button
          className={`${style.logout_btn} btn`}
          onClick={() => handleLogout()}>Выйти
        </button>
        <p className={style.disclaimer}>В полной версии будет доступен поиск</p>
      </>)}
    </div>
  );
};
