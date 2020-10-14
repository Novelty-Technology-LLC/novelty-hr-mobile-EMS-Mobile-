const clone = (obj) => Object.assign({}, obj);

const renameKey = (old, newobj) => {
  const clonedObj = clone(old);

  for (let key in clonedObj) {
    if (newobj.hasOwnProperty(key)) {
      const targetKey = clonedObj[key];
      delete clonedObj[key];
      clonedObj[newobj[key]] = targetKey;
    }
  }
  return clonedObj;
};

const mapDataToObject = (profile: any) => {
  const replacement = {
    id: 'uuid',
    givenName: 'first_name',
    familyName: 'last_name',
    photo: 'image_url',
    user: 'uuid',
  };


  const modified_object = renameKey(profile, replacement);

  return {
    uuid:modified_object.uuid,
    image_url:modified_object.image_url,
    email:modified_object.email
  };
};


export { mapDataToObject };
