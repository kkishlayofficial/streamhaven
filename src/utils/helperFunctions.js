export const mergeArraysFromObjects = (obj1, obj2) => {
  let result = [];

  for (let key in obj1) {
    if (Array.isArray(obj1[key])) {
      result.push({
        type: "movie",
        title: camelCaseToTitleCase(key),
        data: obj1[key],
      });
    }
  }

  for (let key in obj2) {
    if (Array.isArray(obj2[key])) {
      result.push({
        type: "tv",
        title: camelCaseToTitleCase(key),
        data: obj2[key],
      });
    }
  }

  return result;
};

const camelCaseToTitleCase = (camelCaseStr) => {
  let result = camelCaseStr.replace(/([A-Z])/g, " $1");

  result = result.replace(/\b\w/g, function (match) {
    return match.toUpperCase();
  });

  return result;
};
