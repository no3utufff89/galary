import style from './Header.module.css';
import UserBlock from './UserBlock';

export const Header = () => {
  console.log(style);
  return (
    <header className={style.header}>
      <UserBlock/>
    </header>
  );
};
