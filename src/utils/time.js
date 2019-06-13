import moment from 'moment';

const timeUtils = {
  toLocaleDateTime: time => (moment(time).format('YYYY-MM-DD, hh:mm:ss')),
};

export default timeUtils;
