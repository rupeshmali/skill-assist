export const formatUserDataToObject = (data) => {
  const { displayName, email, phoneNumber, photoURL, uid } = data;
  return { displayName, email, phoneNumber, photoURL, uid };
};
export const objectHasValuesForKeys = (compareWith, object) => {
  const keys = Object.keys(object)
  const hasAllKeys = compareWith.every(key => keys.includes(key));
  if(hasAllKeys) {
      // check if all keys have value;
      const areKeysNull = shouldSubmitBeDisabled(object);
      return areKeysNull;
  }
  return !hasAllKeys;
}
export const getSrcFromBuffer = (profile) => {
  return `data:${profile.mimetype};base64,${Buffer.from(profile.file).toString('base64')}`
}
export const getFileExtension = (type) => {
  const ext = type.split('/');
  return ext[1];
}
export const getFormDataFromFile = (key, file) => {
  const formData = new FormData();
  formData.append(key, file);
  return formData;
}

export const sellerFormValidation = (form) => {
  // validations left
  // if error throw ERROR_MESSAGES

}

export const getTime = (date) => {
  const hours = new Date(date).getHours();
  const mins = new Date(date).getMinutes();
  const time = `${hours}:${mins}`;
  return time;
};

export const getFormattedTime = (time) => `${new Date(time).getHours()}:${new Date(time).getMinutes()}`


export const createRoomId = (one, two) => one.toLowerCase() > two.toLowerCase() ? `${one}-${two}` : `${two}-${one}`;
