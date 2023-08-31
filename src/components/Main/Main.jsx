import style from './Main.module.css';
import List from './List';
import { Route, Routes } from 'react-router';
import Modal from '../Modal';

export const Main = () => (
  <main className={style.main}>
    <Routes>
      <Route path='' element={<List/>}>
        <Route path='/picture/:id' element={<Modal/>} />
      </Route>
    </Routes>
  </main>
);
