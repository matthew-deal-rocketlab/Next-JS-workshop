// DO NOT EDIT.  This is a generated file created with ./run api-update-models

export const ALL_TABLES: StringStringMap = {
  tbl_user: {
    date_created: 'object',
    date_updated: 'object',
    id: 'number',
    uid: 'string',
    verify_code: 'string',
    lastname: 'string',
    pass: 'string',
    session: 'string',
    email: 'string',
    firstname: 'string',
    status: 'string',
  },
  tbl_user_detail: {
    id: 'number',
    user_id: 'number',
    company_name: 'string',
    country: 'string',
    address: 'string',
    postcode: 'string',
    state: 'string',
    stripe_id: 'string',
    language: 'string',
    city: 'string',
  },
  tbl_collection: {
    id: 'number',
    user_id: 'number',
    name: 'string',
  },
  tbl_site: {
    id: 'number',
    user_id: 'number',
    timeout: 'number',
    height: 'number',
    collection_id: 'number',
    cookies: 'string',
    freqtime: 'object',
    width: 'number',
    url: 'string',
    useragent: 'string',
    freqtimezone: 'string',
    frequency: 'string',
  },
}

export const CRUD_TABLES: StringStringMap = {
  tbl_collection: ALL_TABLES['tbl_collection'] ?? '',
  tbl_site: ALL_TABLES['tbl_site'] ?? '',
}
