import style from './List.module.css';
import { Outlet } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import ListItem from './ListItem';
import Masonry from 'react-masonry-css';
import { changePage, fetchPhotos } from '../../../store/slice/photosSlice';

export const List = () => {
  const dispatch = useDispatch();
  const endList = useRef(null);
  const page = useSelector(state => state.photos.page);
  const photos = useSelector(state => state.photos.photos);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  useEffect(() => {
    if (page < 3) {
      setTimeout(() => {
        dispatch(fetchPhotos());
      }, 1000);
    } else {
      dispatch(fetchPhotos());
    }
  }, [page]);


  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        dispatch(changePage(page));
      }
    }, {
      rootMargin: '550px',
    });
    observer.observe(endList.current);
    return () => {
      if (endList.current) {
        observer.unobserve(endList.current);
      }
    };
  }, []);

  return (
    <>
      <ul className={style.photos_list}>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column">
          {photos.map(elem => (
            <ListItem key={elem.blur_hash} item={elem}/>
          ))}
        </Masonry>
        <li ref={endList}/>
      </ul>
      <Outlet/>
    </>
  );
};
