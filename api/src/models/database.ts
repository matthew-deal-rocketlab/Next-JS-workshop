// DO NOT EDIT.  This is a generated file created with ./run api-update-models
export const SYSTEM_TABLE_FIELDS: StringStringMap = {
  'tbl_user': {
     "date_created": "timestamptz",
     "date_updated": "timestamptz",
     "id": "int4",
     "uid": "uuid",
     "verify_code": "uuid",
     "lastname": "varchar",
     "pass": "varchar",
     "session": "varchar",
     "email": "varchar",
     "firstname": "varchar",
     "status": "varchar",

  },
  'tbl_user_detail': {
     "id": "int4",
     "user_id": "int4",
     "company_name": "varchar",
     "country": "varchar",
     "address": "text",
     "postcode": "varchar",
     "state": "varchar",
     "stripe_id": "varchar",
     "language": "varchar",
     "city": "varchar",

  }
};


// All CRUD tables must have an incrementing id and must be linked to a user through a user_id
export const CRUD_TABLE_FIELDS: StringStringMap = {
  'tbl_collection': {
     "id": "int4",
     "user_id": "int4",
     "name": "varchar",

  },
  'tbl_site': {
     "id": "int4",
     "user_id": "int4",
     "timeout": "int4",
     "height": "int4",
     "collection_id": "int4",
     "cookies": "json",
     "freqtime": "timestamp",
     "width": "int4",
     "url": "text",
     "useragent": "varchar",
     "freqtimezone": "varchar",
     "frequency": "varchar",

  }
};
