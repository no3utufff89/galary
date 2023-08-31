---
to: <%= absPath %>/<%= component_name %>.jsx
---
import PropTypes from 'prop-types';
import style from './<%= component_name %>.module.css';

export const <%= component_name %> = () => {
  console.log(style);
  return (
    <div>Компонент <%= component_name %></div>
  );
};

<%= component_name %>.propTypes = {

};
