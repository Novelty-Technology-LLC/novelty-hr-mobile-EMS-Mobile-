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
    ...modified_object,
    designation: 'employee',
    join_date: new Date(),
    phone: '0123456789',
    is_active: 0,
    is_approver: 0,
    created_by: 'lovish hamal',
    updated_by: 'lovish hamal',
  };
};

export { mapDataToObject };
