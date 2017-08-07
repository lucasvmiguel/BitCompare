export const formatReal = (money) => {
  const tmpMoney = parseInt((money*100)+''.replace(/[\D]+/g,''));

  let tmp = tmpMoney+'';

  tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
  if(tmp.length > 6) {
    tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
  }

  return tmp;
};

export const formatTextHundred = (text) => {
  if (text < 60) return text;

  return text.substring(0, 60) + '...';
};