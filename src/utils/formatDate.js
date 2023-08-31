const formatDate = date => {
  const d = date;
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  return new Intl.DateTimeFormat('ru', options)
    .format(new Date(d));
};

export default formatDate;
