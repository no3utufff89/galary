import PropTypes from 'prop-types';
import { FadeLoader } from 'react-spinners';

export const Loader = ({ size }) => (
  <FadeLoader color="#cc6633" css={{ display: 'block' }} size={size}/>
);

Loader.propTypes = {
  size: PropTypes.number,
};
