export const isEmpty = (value: any): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const validateEmails = (str: string): boolean => {
  var regex   = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  var result  = str.replace(/\s/g, "").split(/,|;/);
  for (var i = 0;i < result.length;i++) {
    if (!regex.test(result[i])) {
      return false;
    }
  }
  return true;
}
