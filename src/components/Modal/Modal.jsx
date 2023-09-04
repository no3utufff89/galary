import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import style from './Modal.module.css';
import { useNavigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { openNewPhoto } from '../../store/slice/pictureSlice';
import { usePhoto } from '../../hooks/usePhoto';
import { AiOutlineEye } from 'react-icons/ai';
import { LiaDownloadSolid } from 'react-icons/lia';
import Like from '../Like';

export const Modal = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [picture] = usePhoto(id);
  const date = picture.created;
  console.log(date);
  const overlayRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(openNewPhoto());
  }, []);

  const handleClose = (e) => {
    const target = e.target;
    if ((target === overlayRef.current) || (e.keyCode === 27)) {
      navigate('/');
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClose);
    document.addEventListener('keydown', handleClose);
    return () => {
      document.removeEventListener('click', handleClose);
      document.removeEventListener('keydown', handleClose);
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={style.overlay} ref={overlayRef}>
      <div className={style.modalWindow}>
        <aside className={style.modal_side}>
          <div className={style.modal_side_shadow}/>
          <div className={style.modal_header}>
            <div className={style.author}>
              <a href={picture.selfUrl}
                className={style.author_name}>{picture.name}</a>
              <img src={picture.profileImage} alt=""/>
            </div>
          </div>
          <div className={style.modal_footer}>
            <div className={style.photo_information}>
              <p className={style.views}>
                {picture.views}
                <AiOutlineEye color="green" size={20} title="Просмотры"/>
              </p>
              <p className={style.downloads}>
                {picture.downloads}
                <LiaDownloadSolid color="green" size={20} title="Загрузки"/>
              </p>
            </div>
            {picture.description && <div className={style.description_block}>
              <p className={style.description_block_title}>
                Описание фото:
              </p>
              <p className={style.description}>
                {picture.description}
              </p>
            </div>}
            <Like id={id}/>
          </div>
        </aside>
        <div className={style.modal_body}>
          <div className={style.modal_image}>
            <img src={picture.image} alt={picture.description}
              className={style.modal_image}/>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root'),
  );
};
