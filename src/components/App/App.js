import style from './App.module.css';
import { Route, Routes } from 'react-router';
import Header from '../Header';
import Main from '../Main';
import { useDispatch } from 'react-redux';
import { setTokenToState } from '../../store/slice/tokenSlice';
import { getToken } from '../../api/token';

function App() {
  const dispatch = useDispatch();
  dispatch(setTokenToState(getToken()));
  console.log('app');
  return (
    <Routes>
      <Route
        path="*"
        element={
          <div className={style.wrapper}>
            <Header/>
            <Main/>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
