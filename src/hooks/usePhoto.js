import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getPhotoData } from '../store/slice/pictureSlice';

export const usePhoto = (id) => {
  const token = useSelector(state => state.token.token);
  const picture = useSelector(state => state.picture.picture);
  const liked = useSelector(state => state.picture.liked);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPhotoData(id));
  }, [token]);
  return [picture, liked];
};

