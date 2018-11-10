import queryString from 'query-string';

export const serialize = function (form) {
  let field,
      l,
      s = [];

  if (typeof form === 'object' && form.nodeName === 'FORM') {
    const len = form.elements.length;

    for (let i = 0; i < len; i++) {
      field = form.elements[i];
      if (field.name && !field.disabled && field.type !== 'button' && field.type !== 'file' && field.type !== 'hidden' && field.type !== 'reset' && field.type !== 'submit') {
        if (field.type === 'select-multiple') {
          l = form.elements[i].options.length;

          for (let j = 0; j < l; j++) {
            if (field.options[j].selected) {
              s[s.length] = encodeURIComponent(field.name) + '=' + encodeURIComponent(field.options[j].value);
            }
          }
        }
        else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
          s[s.length] = encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value);
        }
      }
    }
  }
  return queryString.parse(s.join('&').replace(/%20/g, '+'));
};
