import style from './Like.module.css';
import { AiFillHeart } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { changeLike } from '../../store/slice/photosSlice';
import { likeUpdate } from '../../api/like';

export const Like = (item) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.token.token);
  const photos = useSelector(state => state.photos.photos);
  const currentPhoto = photos.find(elem => elem.id === item.id);

  const handleLike = () => {
    console.log(currentPhoto);
    if (!token) return;
    likeUpdate(currentPhoto.id, token, currentPhoto.liked_by_user);
    dispatch(changeLike(item.id));
  };
  return (
    <div className={style.like_block}>
      <p className={style.total_likes}>{currentPhoto.likes}</p>
      <button
        onClick={() => {
          handleLike();
        }
        }
        aria-label="Поставить лайк фотографии"
        className={`${style.likeBtn} btn`}>
        {currentPhoto.liked_by_user ?
          <AiFillHeart size={40} className={style.heartIcon_liked}
            title="Убрать лайк"/> :
          <AiFillHeart size={40} className={style.heartIcon}
            title="Поставить лайк"/>}
      </button>
    </div>

  );
};
Like.propTypes = {
  item: PropTypes.object,
};

