// export const cleanNumbers = value => parseFloat(value.replace(/\D/g, ''));
// export const cleanNumber = value =>
//   typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value;

export const cleanNumber = value =>
  typeof value === 'string'
    ? // ? parseFloat(value.replace(/[^0-9-]/g, '').replace(/(?!^)-/g, ''))
      parseFloat(
        value
          .replace(/[^0-9.-]/g, '')
          .replace(/(\..*)\./g, '$1')
          .replace(/(?!^)-/g, '')
      )
    : value;

export const numberFormat = (value, sign, noDecimal) => {
  const numSign = sign || '',
    numVal = cleanNumber(value),
    cleanVal = !noDecimal ? numVal.toFixed(2) : Math.round(numVal);

  return `${numSign}${cleanVal
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

export const percentFormat = value => {
  return `${parseFloat(cleanNumber(value)).toFixed(2)}%`;
};

export const timeConverter = (timestamp, returning) => {
  const date = new Date(timestamp),
    months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

  switch (returning) {
    case 'year':
      return date.getFullYear();
    case 'month':
      return months[date.getMonth()];
    case 'date':
      return date.getDate();
    case 'datefull':
      return `${
        months[date.getMonth()]
      } ${date.getDate()}, ${date.getFullYear()}`;
    case 'dateshort':
      // return `${date.getMonth() + 1}/${date.getDate()}/${date
      //   .getFullYear()
      //   .toString()
      //   .slice(-2)}`;
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    case 'time':
      return `${date.getHours()}:${date.getMinutes()}`;
    case 'timefull':
      return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    default:
      return `${
        months[date.getMonth()]
      } ${date.getDate()}, ${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }
};
