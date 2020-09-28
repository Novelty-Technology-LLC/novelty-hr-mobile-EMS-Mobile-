import { paix } from 'paix';

const mapDataToObject = (profile: any) => {
  const replacement = {
    id: 'uuid',
    givenName: 'first_name',
    familyName: 'last_name',
    photo: 'image_url',
    user: 'uuid',
  };
  let user = {
    id: null,
    email: null,
    givenName: null,
    familyName: null,
    photo: null,
  };

  for (let key in profile) {
    if (user.hasOwnProperty(key)) {
      user[key] = profile[key];
    }
  }

  const modified_object = paix(user, replacement);

  return {
    ...modified_object,
    designation: 'employee',
    join_date: new Date(),
    phone: '0123456789',
    is_active: 0,
    is_approver: 1,
    created_by: 'lovish hamal',
    updated_by: 'lovish hamal',
  };
};

export { mapDataToObject };
