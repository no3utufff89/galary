import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authRequest } from '../store/slice/authSlice';

export const useAuth = () => {
  const token = useSelector(state => state.token.token);
  const userProfileData = useSelector(state => state.auth.data);
  const dataLoading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(authRequest(token));
    }
  }, [token]);

  return [userProfileData, dataLoading];
};
