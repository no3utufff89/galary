import style from './ListItem.module.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Like from '../../../Like';

export const ListItem = ({ item }) => {
  console.log('d');
  return (
    <li className={style.listItem}>
      <Link to={`/picture/${item.id}`}>
        <img className={style.image} src={item.urls.small}/>
      </Link>
      <div className={style.aboutBlock}>
        <a
          href={item.user.links.self}
          target='blank'
          className={style.authorName}>
          {item.user.name}
        </a>
        <img src={item.user.profile_image.small} alt=""/>
      </div>
      <Like id={item.id} st={item.liked_by_user}/>
    </li>
  );
};
ListItem.propTypes = {
  item: PropTypes.object,
};

