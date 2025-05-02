export const PATTERN = {
  CHAR_NUM_DOT_AT: /^[\s\S]+$/, // used for email fields
  CHAR_SPACE_DASH: /^[\s\S]+$/, // used for textfield fields
  CHAR_NUM_SPACE_DASH: /^[\s\S]+$/, // used for textfield fields
  ADDRESS_ONLY: /^[\s\S]+$/, // used for textfield address
  CHAR_SPEC_NUM_DASH: /^[\s\S]+$/, // used for textfield address
  CHAR_NUM_DASH: /^[\s\S]+$/, // used for only num,chars,dash like; postal code
  NUM_PLUS_MINUS: /^[+-\d\s]+$/,
  ACTION_WITHOUT_SPACE: /^[a-zA-Z0-9/-]+$/,
  PASSWORD: /^[\s\S]+$/,
  NUM_DASH: /^[0-9-]+$/, // used for num,dash type text
  PHONE: /^[\d()+-]*\d[\d()+-]*$/, // used for phone type text
  ONLY_NUM: /^\d+$/, // used for string type text
  ALLOW_ALL: /^[\s\S]+$/, // userd for allowed all
  POINT_NUM: /^[+-]?([0-9]*[.])?[0-9]+$/,
  CHAR_NUM_MINUS_AT_SPACE: /^[a-zA-Z0-9@ -]+$/,
  CHAR_NUM_MIN_AT_HASH_COM_DOT_SPA: /^[a-zA-Z0-9@,\-.# ]+$/,
  HOURS_MINTS_FORMAT: /^([0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/,
  EMAIL: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
};
