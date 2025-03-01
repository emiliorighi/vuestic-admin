export type PointGeoCoord = {
  latitude: number
  longitude: number
}

export type CountryItem = {
  code: string
  name: string
  value: number
  color: string
  latitude?: number
  longitude?: number
  radius?: number
}

export type ValueBounds = {
  min: number
  max: number
}

const latLng = {
  AD: {
    latitude: 42.5,
    longitude: 1.5,
  },
  AE: {
    latitude: 24,
    longitude: 54,
  },
  AF: {
    latitude: 33,
    longitude: 65,
  },
  AG: {
    latitude: 17.05,
    longitude: -61.8,
  },
  AI: {
    latitude: 18.25,
    longitude: -63.1667,
  },
  AL: {
    latitude: 41,
    longitude: 20,
  },
  AM: {
    latitude: 40,
    longitude: 45,
  },
  AN: {
    latitude: 12.25,
    longitude: -68.75,
  },
  AO: {
    latitude: -12.5,
    longitude: 18.5,
  },
  AP: {
    latitude: 35,
    longitude: 105,
  },
  AQ: {
    latitude: -90,
    longitude: 0,
  },
  AR: {
    latitude: -34,
    longitude: -64,
  },
  AS: {
    latitude: -14.3333,
    longitude: -170,
  },
  AT: {
    latitude: 47.3333,
    longitude: 13.3333,
  },
  AU: {
    latitude: -27,
    longitude: 133,
  },
  AW: {
    latitude: 12.5,
    longitude: -69.9667,
  },
  AZ: {
    latitude: 40.5,
    longitude: 47.5,
  },
  BA: {
    latitude: 44,
    longitude: 18,
  },
  BB: {
    latitude: 13.1667,
    longitude: -59.5333,
  },
  BD: {
    latitude: 24,
    longitude: 90,
  },
  BE: {
    latitude: 50.8333,
    longitude: 4,
  },
  BF: {
    latitude: 13,
    longitude: -2,
  },
  BG: {
    latitude: 43,
    longitude: 25,
  },
  BH: {
    latitude: 26,
    longitude: 50.55,
  },
  BI: {
    latitude: -3.5,
    longitude: 30,
  },
  BJ: {
    latitude: 9.5,
    longitude: 2.25,
  },
  BM: {
    latitude: 32.3333,
    longitude: -64.75,
  },
  BN: {
    latitude: 4.5,
    longitude: 114.6667,
  },
  BO: {
    latitude: -17,
    longitude: -65,
  },
  BR: {
    latitude: -10,
    longitude: -55,
  },
  BS: {
    latitude: 24.25,
    longitude: -76,
  },
  BT: {
    latitude: 27.5,
    longitude: 90.5,
  },
  BV: {
    latitude: -54.4333,
    longitude: 3.4,
  },
  BW: {
    latitude: -22,
    longitude: 24,
  },
  BY: {
    latitude: 53,
    longitude: 28,
  },
  BZ: {
    latitude: 17.25,
    longitude: -88.75,
  },
  CA: {
    latitude: 54,
    longitude: -100,
  },
  CC: {
    latitude: -12.5,
    longitude: 96.8333,
  },
  CD: {
    latitude: 0,
    longitude: 25,
  },
  CF: {
    latitude: 7,
    longitude: 21,
  },
  CG: {
    latitude: -1,
    longitude: 15,
  },
  CH: {
    latitude: 47,
    longitude: 8,
  },
  CI: {
    latitude: 8,
    longitude: -5,
  },
  CK: {
    latitude: -21.2333,
    longitude: -159.7667,
  },
  CL: {
    latitude: -30,
    longitude: -71,
  },
  CM: {
    latitude: 6,
    longitude: 12,
  },
  CN: {
    latitude: 35,
    longitude: 105,
  },
  CO: {
    latitude: 4,
    longitude: -72,
  },
  CR: {
    latitude: 10,
    longitude: -84,
  },
  CU: {
    latitude: 21.5,
    longitude: -80,
  },
  CV: {
    latitude: 16,
    longitude: -24,
  },
  CX: {
    latitude: -10.5,
    longitude: 105.6667,
  },
  CY: {
    latitude: 35,
    longitude: 33,
  },
  CZ: {
    latitude: 49.75,
    longitude: 15.5,
  },
  DE: {
    latitude: 51,
    longitude: 9,
  },
  DJ: {
    latitude: 11.5,
    longitude: 43,
  },
  DK: {
    latitude: 56,
    longitude: 10,
  },
  DM: {
    latitude: 15.4167,
    longitude: -61.3333,
  },
  DO: {
    latitude: 19,
    longitude: -70.6667,
  },
  DZ: {
    latitude: 28,
    longitude: 3,
  },
  EC: {
    latitude: -2,
    longitude: -77.5,
  },
  EE: {
    latitude: 59,
    longitude: 26,
  },
  EG: {
    latitude: 27,
    longitude: 30,
  },
  EH: {
    latitude: 24.5,
    longitude: -13,
  },
  ER: {
    latitude: 15,
    longitude: 39,
  },
  ES: {
    latitude: 40,
    longitude: -4,
  },
  ET: {
    latitude: 8,
    longitude: 38,
  },
  EU: {
    latitude: 47,
    longitude: 8,
  },
  FI: {
    latitude: 62,
    longitude: 26,
  },
  FJ: {
    latitude: -18,
    longitude: 175,
  },
  FK: {
    latitude: -51.75,
    longitude: -59,
  },
  FM: {
    latitude: 6.9167,
    longitude: 158.25,
  },
  FO: {
    latitude: 62,
    longitude: -7,
  },
  FR: {
    latitude: 46,
    longitude: 2,
  },
  GA: {
    latitude: -1,
    longitude: 11.75,
  },
  GB: {
    latitude: 54,
    longitude: -2,
  },
  GD: {
    latitude: 12.1167,
    longitude: -61.6667,
  },
  GE: {
    latitude: 42,
    longitude: 43.5,
  },
  GF: {
    latitude: 4,
    longitude: -53,
  },
  GH: {
    latitude: 8,
    longitude: -2,
  },
  GI: {
    latitude: 36.1833,
    longitude: -5.3667,
  },
  GL: {
    latitude: 72,
    longitude: -40,
  },
  GM: {
    latitude: 13.4667,
    longitude: -16.5667,
  },
  GN: {
    latitude: 11,
    longitude: -10,
  },
  GP: {
    latitude: 16.25,
    longitude: -61.5833,
  },
  GQ: {
    latitude: 2,
    longitude: 10,
  },
  GR: {
    latitude: 39,
    longitude: 22,
  },
  GS: {
    latitude: -54.5,
    longitude: -37,
  },
  GT: {
    latitude: 15.5,
    longitude: -90.25,
  },
  GU: {
    latitude: 13.4667,
    longitude: 144.7833,
  },
  GW: {
    latitude: 12,
    longitude: -15,
  },
  GY: {
    latitude: 5,
    longitude: -59,
  },
  HK: {
    latitude: 22.25,
    longitude: 114.1667,
  },
  HM: {
    latitude: -53.1,
    longitude: 72.5167,
  },
  HN: {
    latitude: 15,
    longitude: -86.5,
  },
  HR: {
    latitude: 45.1667,
    longitude: 15.5,
  },
  HT: {
    latitude: 19,
    longitude: -72.4167,
  },
  HU: {
    latitude: 47,
    longitude: 20,
  },
  ID: {
    latitude: -5,
    longitude: 120,
  },
  IE: {
    latitude: 53,
    longitude: -8,
  },
  IL: {
    latitude: 31.5,
    longitude: 34.75,
  },
  IN: {
    latitude: 20,
    longitude: 77,
  },
  IO: {
    latitude: -6,
    longitude: 71.5,
  },
  IQ: {
    latitude: 33,
    longitude: 44,
  },
  IR: {
    latitude: 32,
    longitude: 53,
  },
  IS: {
    latitude: 65,
    longitude: -18,
  },
  IT: {
    latitude: 42.8333,
    longitude: 12.8333,
  },
  JM: {
    latitude: 18.25,
    longitude: -77.5,
  },
  JO: {
    latitude: 31,
    longitude: 36,
  },
  JP: {
    latitude: 36,
    longitude: 138,
  },
  KE: {
    latitude: 1,
    longitude: 38,
  },
  KG: {
    latitude: 41,
    longitude: 75,
  },
  KH: {
    latitude: 13,
    longitude: 105,
  },
  KI: {
    latitude: 1.4167,
    longitude: 173,
  },
  KM: {
    latitude: -12.1667,
    longitude: 44.25,
  },
  KN: {
    latitude: 17.3333,
    longitude: -62.75,
  },
  KP: {
    latitude: 40,
    longitude: 127,
  },
  KR: {
    latitude: 37,
    longitude: 127.5,
  },
  KW: {
    latitude: 29.3375,
    longitude: 47.6581,
  },
  KY: {
    latitude: 19.5,
    longitude: -80.5,
  },
  KZ: {
    latitude: 48,
    longitude: 68,
  },
  LA: {
    latitude: 18,
    longitude: 105,
  },
  LB: {
    latitude: 33.8333,
    longitude: 35.8333,
  },
  LC: {
    latitude: 13.8833,
    longitude: -61.1333,
  },
  LI: {
    latitude: 47.1667,
    longitude: 9.5333,
  },
  LK: {
    latitude: 7,
    longitude: 81,
  },
  LR: {
    latitude: 6.5,
    longitude: -9.5,
  },
  LS: {
    latitude: -29.5,
    longitude: 28.5,
  },
  LT: {
    latitude: 55,
    longitude: 24,
  },
  LU: {
    latitude: 49.75,
    longitude: 6,
  },
  LV: {
    latitude: 57,
    longitude: 25,
  },
  LY: {
    latitude: 25,
    longitude: 17,
  },
  MA: {
    latitude: 32,
    longitude: -5,
  },
  MC: {
    latitude: 43.7333,
    longitude: 7.4,
  },
  MD: {
    latitude: 47,
    longitude: 29,
  },
  ME: {
    latitude: 42.5,
    longitude: 19.4,
  },
  MG: {
    latitude: -20,
    longitude: 47,
  },
  MH: {
    latitude: 9,
    longitude: 168,
  },
  MK: {
    latitude: 41.8333,
    longitude: 22,
  },
  ML: {
    latitude: 17,
    longitude: -4,
  },
  MM: {
    latitude: 22,
    longitude: 98,
  },
  MN: {
    latitude: 46,
    longitude: 105,
  },
  MO: {
    latitude: 22.1667,
    longitude: 113.55,
  },
  MP: {
    latitude: 15.2,
    longitude: 145.75,
  },
  MQ: {
    latitude: 14.6667,
    longitude: -61,
  },
  MR: {
    latitude: 20,
    longitude: -12,
  },
  MS: {
    latitude: 16.75,
    longitude: -62.2,
  },
  MT: {
    latitude: 35.8333,
    longitude: 14.5833,
  },
  MU: {
    latitude: -20.2833,
    longitude: 57.55,
  },
  MV: {
    latitude: 3.25,
    longitude: 73,
  },
  MW: {
    latitude: -13.5,
    longitude: 34,
  },
  MX: {
    latitude: 23,
    longitude: -102,
  },
  MY: {
    latitude: 2.5,
    longitude: 112.5,
  },
  MZ: {
    latitude: -18.25,
    longitude: 35,
  },
  NA: {
    latitude: -22,
    longitude: 17,
  },
  NC: {
    latitude: -21.5,
    longitude: 165.5,
  },
  NE: {
    latitude: 16,
    longitude: 8,
  },
  NF: {
    latitude: -29.0333,
    longitude: 167.95,
  },
  NG: {
    latitude: 10,
    longitude: 8,
  },
  NI: {
    latitude: 13,
    longitude: -85,
  },
  NL: {
    latitude: 52.5,
    longitude: 5.75,
  },
  NO: {
    latitude: 62,
    longitude: 10,
  },
  NP: {
    latitude: 28,
    longitude: 84,
  },
  NR: {
    latitude: -0.5333,
    longitude: 166.9167,
  },
  NU: {
    latitude: -19.0333,
    longitude: -169.8667,
  },
  NZ: {
    latitude: -41,
    longitude: 174,
  },
  OM: {
    latitude: 21,
    longitude: 57,
  },
  PA: {
    latitude: 9,
    longitude: -80,
  },
  PE: {
    latitude: -10,
    longitude: -76,
  },
  PF: {
    latitude: -15,
    longitude: -140,
  },
  PG: {
    latitude: -6,
    longitude: 147,
  },
  PH: {
    latitude: 13,
    longitude: 122,
  },
  PK: {
    latitude: 30,
    longitude: 70,
  },
  PL: {
    latitude: 52,
    longitude: 20,
  },
  PM: {
    latitude: 46.8333,
    longitude: -56.3333,
  },
  PR: {
    latitude: 18.25,
    longitude: -66.5,
  },
  PS: {
    latitude: 32,
    longitude: 35.25,
  },
  PT: {
    latitude: 39.5,
    longitude: -8,
  },
  PW: {
    latitude: 7.5,
    longitude: 134.5,
  },
  PY: {
    latitude: -23,
    longitude: -58,
  },
  QA: {
    latitude: 25.5,
    longitude: 51.25,
  },
  RE: {
    latitude: -21.1,
    longitude: 55.6,
  },
  RO: {
    latitude: 46,
    longitude: 25,
  },
  RS: {
    latitude: 44,
    longitude: 21,
  },
  RU: {
    latitude: 60,
    longitude: 100,
  },
  RW: {
    latitude: -2,
    longitude: 30,
  },
  SA: {
    latitude: 25,
    longitude: 45,
  },
  SB: {
    latitude: -8,
    longitude: 159,
  },
  SC: {
    latitude: -4.5833,
    longitude: 55.6667,
  },
  SD: {
    latitude: 15,
    longitude: 30,
  },
  SE: {
    latitude: 62,
    longitude: 15,
  },
  SG: {
    latitude: 1.3667,
    longitude: 103.8,
  },
  SH: {
    latitude: -15.9333,
    longitude: -5.7,
  },
  SI: {
    latitude: 46,
    longitude: 15,
  },
  SJ: {
    latitude: 78,
    longitude: 20,
  },
  SK: {
    latitude: 48.6667,
    longitude: 19.5,
  },
  SL: {
    latitude: 8.5,
    longitude: -11.5,
  },
  SM: {
    latitude: 43.7667,
    longitude: 12.4167,
  },
  SN: {
    latitude: 14,
    longitude: -14,
  },
  SO: {
    latitude: 10,
    longitude: 49,
  },
  SR: {
    latitude: 4,
    longitude: -56,
  },
  ST: {
    latitude: 1,
    longitude: 7,
  },
  SV: {
    latitude: 13.8333,
    longitude: -88.9167,
  },
  SY: {
    latitude: 35,
    longitude: 38,
  },
  SZ: {
    latitude: -26.5,
    longitude: 31.5,
  },
  TC: {
    latitude: 21.75,
    longitude: -71.5833,
  },
  TD: {
    latitude: 15,
    longitude: 19,
  },
  TF: {
    latitude: -43,
    longitude: 67,
  },
  TG: {
    latitude: 8,
    longitude: 1.1667,
  },
  TH: {
    latitude: 15,
    longitude: 100,
  },
  TJ: {
    latitude: 39,
    longitude: 71,
  },
  TK: {
    latitude: -9,
    longitude: -172,
  },
  TM: {
    latitude: 40,
    longitude: 60,
  },
  TN: {
    latitude: 34,
    longitude: 9,
  },
  TO: {
    latitude: -20,
    longitude: -175,
  },
  TR: {
    latitude: 39,
    longitude: 35,
  },
  TT: {
    latitude: 11,
    longitude: -61,
  },
  TV: {
    latitude: -8,
    longitude: 178,
  },
  TW: {
    latitude: 23.5,
    longitude: 121,
  },
  TZ: {
    latitude: -6,
    longitude: 35,
  },
  UA: {
    latitude: 49,
    longitude: 32,
  },
  UG: {
    latitude: 1,
    longitude: 32,
  },
  UM: {
    latitude: 19.2833,
    longitude: 166.6,
  },
  US: {
    latitude: 38,
    longitude: -97,
  },
  UY: {
    latitude: -33,
    longitude: -56,
  },
  UZ: {
    latitude: 41,
    longitude: 64,
  },
  VA: {
    latitude: 41.9,
    longitude: 12.45,
  },
  VC: {
    latitude: 13.25,
    longitude: -61.2,
  },
  VE: {
    latitude: 8,
    longitude: -66,
  },
  VG: {
    latitude: 18.5,
    longitude: -64.5,
  },
  VI: {
    latitude: 18.3333,
    longitude: -64.8333,
  },
  VN: {
    latitude: 16,
    longitude: 106,
  },
  VU: {
    latitude: -16,
    longitude: 167,
  },
  WF: {
    latitude: -13.3,
    longitude: -176.2,
  },
  WS: {
    latitude: -13.5833,
    longitude: -172.3333,
  },
  YE: {
    latitude: 15,
    longitude: 48,
  },
  YT: {
    latitude: -12.8333,
    longitude: 45.1667,
  },
  ZA: {
    latitude: -29,
    longitude: 24,
  },
  ZM: {
    latitude: -15,
    longitude: 30,
  },
  ZW: {
    latitude: -20,
    longitude: 30,
  },
}

const data = [
  {
    code: 'AF',
    name: 'Afghanistan',
    value: 32358260,
    color: '#eea638',
  },
  {
    code: 'AL',
    name: 'Albania',
    value: 3215988,
    color: '#6bbfe4',
  },
  {
    code: 'DZ',
    name: 'Algeria',
    value: 35980193,
    color: '#e96e6e',
  },
  {
    code: 'AO',
    name: 'Angola',
    value: 19618432,
    color: '#e96e6e',
  },
  {
    code: 'AR',
    name: 'Argentina',
    value: 40764561,
    color: '#6be59c',
  },
  {
    code: 'AM',
    name: 'Armenia',
    value: 3100236,
    color: '#6bbfe4',
  },
  {
    code: 'AU',
    name: 'Australia',
    value: 22605732,
    color: '#8aabb0',
  },
  {
    code: 'AT',
    name: 'Austria',
    value: 8413429,
    color: '#6bbfe4',
  },
  {
    code: 'AZ',
    name: 'Azerbaijan',
    value: 9306023,
    color: '#6bbfe4',
  },
  {
    code: 'BH',
    name: 'Bahrain',
    value: 1323535,
    color: '#eea638',
  },
  {
    code: 'BD',
    name: 'Bangladesh',
    value: 150493658,
    color: '#eea638',
  },
  {
    code: 'BY',
    name: 'Belarus',
    value: 9559441,
    color: '#6bbfe4',
  },
  {
    code: 'BE',
    name: 'Belgium',
    value: 10754056,
    color: '#6bbfe4',
  },
  {
    code: 'BJ',
    name: 'Benin',
    value: 9099922,
    color: '#e96e6e',
  },
  {
    code: 'BT',
    name: 'Bhutan',
    value: 738267,
    color: '#eea638',
  },
  {
    code: 'BO',
    name: 'Bolivia',
    value: 10088108,
    color: '#6be59c',
  },
  {
    code: 'BA',
    name: 'Bosnia and Herzegovina',
    value: 3752228,
    color: '#6bbfe4',
  },
  {
    code: 'BW',
    name: 'Botswana',
    value: 2030738,
    color: '#e96e6e',
  },
  {
    code: 'BR',
    name: 'Brazil',
    value: 196655014,
    color: '#6be59c',
  },
  {
    code: 'BN',
    name: 'Brunei',
    value: 405938,
    color: '#eea638',
  },
  {
    code: 'BG',
    name: 'Bulgaria',
    value: 7446135,
    color: '#6bbfe4',
  },
  {
    code: 'BF',
    name: 'Burkina Faso',
    value: 16967845,
    color: '#e96e6e',
  },
  {
    code: 'BI',
    name: 'Burundi',
    value: 8575172,
    color: '#e96e6e',
  },
  {
    code: 'KH',
    name: 'Cambodia',
    value: 14305183,
    color: '#eea638',
  },
  {
    code: 'CM',
    name: 'Cameroon',
    value: 20030362,
    color: '#e96e6e',
  },
  {
    code: 'CA',
    name: 'Canada',
    value: 34349561,
    color: '#f6d35b',
  },
  {
    code: 'CV',
    name: 'Cape Verde',
    value: 500585,
    color: '#e96e6e',
  },
  {
    code: 'CF',
    name: 'Central African Rep.',
    value: 4486837,
    color: '#e96e6e',
  },
  {
    code: 'TD',
    name: 'Chad',
    value: 11525496,
    color: '#e96e6e',
  },
  {
    code: 'CL',
    name: 'Chile',
    value: 17269525,
    color: '#6be59c',
  },
  {
    code: 'CN',
    name: 'China',
    value: 1347565324,
    color: '#eea638',
  },
  {
    code: 'CO',
    name: 'Colombia',
    value: 46927125,
    color: '#6be59c',
  },
  {
    code: 'KM',
    name: 'Comoros',
    value: 753943,
    color: '#e96e6e',
  },
  {
    code: 'CD',
    name: 'Congo, Dem. Rep.',
    value: 67757577,
    color: '#e96e6e',
  },
  {
    code: 'CG',
    name: 'Congo, Rep.',
    value: 4139748,
    color: '#e96e6e',
  },
  {
    code: 'CR',
    name: 'Costa Rica',
    value: 4726575,
    color: '#f6d35b',
  },
  {
    code: 'CI',
    name: "Cote d'Ivoire",
    value: 20152894,
    color: '#e96e6e',
  },
  {
    code: 'HR',
    name: 'Croatia',
    value: 4395560,
    color: '#6bbfe4',
  },
  {
    code: 'CU',
    name: 'Cuba',
    value: 11253665,
    color: '#f6d35b',
  },
  {
    code: 'CY',
    name: 'Cyprus',
    value: 1116564,
    color: '#6bbfe4',
  },
  {
    code: 'CZ',
    name: 'Czech Rep.',
    value: 10534293,
    color: '#6bbfe4',
  },
  {
    code: 'DK',
    name: 'Denmark',
    value: 5572594,
    color: '#6bbfe4',
  },
  {
    code: 'DJ',
    name: 'Djibouti',
    value: 905564,
    color: '#e96e6e',
  },
  {
    code: 'DO',
    name: 'Dominican Rep.',
    value: 10056181,
    color: '#f6d35b',
  },
  {
    code: 'EC',
    name: 'Ecuador',
    value: 14666055,
    color: '#6be59c',
  },
  {
    code: 'EG',
    name: 'Egypt',
    value: 82536770,
    color: '#e96e6e',
  },
  {
    code: 'SV',
    name: 'El Salvador',
    value: 6227491,
    color: '#f6d35b',
  },
  {
    code: 'GQ',
    name: 'Equatorial Guinea',
    value: 720213,
    color: '#e96e6e',
  },
  {
    code: 'ER',
    name: 'Eritrea',
    value: 5415280,
    color: '#e96e6e',
  },
  {
    code: 'EE',
    name: 'Estonia',
    value: 1340537,
    color: '#6bbfe4',
  },
  {
    code: 'ET',
    name: 'Ethiopia',
    value: 84734262,
    color: '#e96e6e',
  },
  {
    code: 'FJ',
    name: 'Fiji',
    value: 868406,
    color: '#8aabb0',
  },
  {
    code: 'FI',
    name: 'Finland',
    value: 5384770,
    color: '#6bbfe4',
  },
  {
    code: 'FR',
    name: 'France',
    value: 63125894,
    color: '#6bbfe4',
  },
  {
    code: 'GA',
    name: 'Gabon',
    value: 1534262,
    color: '#e96e6e',
  },
  {
    code: 'GM',
    name: 'Gambia',
    value: 1776103,
    color: '#e96e6e',
  },
  {
    code: 'GE',
    name: 'Georgia',
    value: 4329026,
    color: '#6bbfe4',
  },
  {
    code: 'DE',
    name: 'Germany',
    value: 82162512,
    color: '#6bbfe4',
  },
  {
    code: 'GH',
    name: 'Ghana',
    value: 24965816,
    color: '#e96e6e',
  },
  {
    code: 'GR',
    name: 'Greece',
    value: 11390031,
    color: '#6bbfe4',
  },
  {
    code: 'GT',
    name: 'Guatemala',
    value: 14757316,
    color: '#f6d35b',
  },
  {
    code: 'GN',
    name: 'Guinea',
    value: 10221808,
    color: '#e96e6e',
  },
  {
    code: 'GW',
    name: 'Guinea-Bissau',
    value: 1547061,
    color: '#e96e6e',
  },
  {
    code: 'GY',
    name: 'Guyana',
    value: 756040,
    color: '#6be59c',
  },
  {
    code: 'HT',
    name: 'Haiti',
    value: 10123787,
    color: '#f6d35b',
  },
  {
    code: 'HN',
    name: 'Honduras',
    value: 7754687,
    color: '#f6d35b',
  },
  {
    code: 'HK',
    name: 'Hong Kong, China',
    value: 7122187,
    color: '#eea638',
  },
  {
    code: 'HU',
    name: 'Hungary',
    value: 9966116,
    color: '#6bbfe4',
  },
  {
    code: 'IS',
    name: 'Iceland',
    value: 324366,
    color: '#6bbfe4',
  },
  {
    code: 'IN',
    name: 'India',
    value: 1241491960,
    color: '#eea638',
  },
  {
    code: 'ID',
    name: 'Indonesia',
    value: 242325638,
    color: '#eea638',
  },
  {
    code: 'IR',
    name: 'Iran',
    value: 74798599,
    color: '#eea638',
  },
  {
    code: 'IQ',
    name: 'Iraq',
    value: 32664942,
    color: '#eea638',
  },
  {
    code: 'IE',
    name: 'Ireland',
    value: 4525802,
    color: '#6bbfe4',
  },
  {
    code: 'IL',
    name: 'Israel',
    value: 7562194,
    color: '#eea638',
  },
  {
    code: 'IT',
    name: 'Italy',
    value: 60788694,
    color: '#6bbfe4',
  },
  {
    code: 'JM',
    name: 'Jamaica',
    value: 2751273,
    color: '#f6d35b',
  },
  {
    code: 'JP',
    name: 'Japan',
    value: 126497241,
    color: '#eea638',
  },
  {
    code: 'JO',
    name: 'Jordan',
    value: 6330169,
    color: '#eea638',
  },
  {
    code: 'KZ',
    name: 'Kazakhstan',
    value: 16206750,
    color: '#eea638',
  },
  {
    code: 'KE',
    name: 'Kenya',
    value: 41609728,
    color: '#e96e6e',
  },
  {
    code: 'KR',
    name: 'Korea, Dem. Rep.',
    value: 24451285,
    color: '#eea638',
  },
  {
    code: 'KP',
    name: 'Korea, Rep.',
    value: 48391343,
    color: '#eea638',
  },
  {
    code: 'KW',
    name: 'Kuwait',
    value: 2818042,
    color: '#eea638',
  },
  {
    code: 'KG',
    name: 'Kyrgyzstan',
    value: 5392580,
    color: '#eea638',
  },
  {
    code: 'LA',
    name: 'Laos',
    value: 6288037,
    color: '#eea638',
  },
  {
    code: 'LV',
    name: 'Latvia',
    value: 2243142,
    color: '#6bbfe4',
  },
  {
    code: 'LB',
    name: 'Lebanon',
    value: 4259405,
    color: '#eea638',
  },
  {
    code: 'LS',
    name: 'Lesotho',
    value: 2193843,
    color: '#e96e6e',
  },
  {
    code: 'LR',
    name: 'Liberia',
    value: 4128572,
    color: '#e96e6e',
  },
  {
    code: 'LY',
    name: 'Libya',
    value: 6422772,
    color: '#e96e6e',
  },
  {
    code: 'LT',
    name: 'Lithuania',
    value: 3307481,
    color: '#6bbfe4',
  },
  {
    code: 'LU',
    name: 'Luxembourg',
    value: 515941,
    color: '#6bbfe4',
  },
  {
    code: 'MK',
    name: 'Macedonia, FYR',
    value: 2063893,
    color: '#6bbfe4',
  },
  {
    code: 'MG',
    name: 'Madagascar',
    value: 21315135,
    color: '#e96e6e',
  },
  {
    code: 'MW',
    name: 'Malawi',
    value: 15380888,
    color: '#e96e6e',
  },
  {
    code: 'MY',
    name: 'Malaysia',
    value: 28859154,
    color: '#eea638',
  },
  {
    code: 'ML',
    name: 'Mali',
    value: 15839538,
    color: '#e96e6e',
  },
  {
    code: 'MR',
    name: 'Mauritania',
    value: 3541540,
    color: '#e96e6e',
  },
  {
    code: 'MU',
    name: 'Mauritius',
    value: 1306593,
    color: '#e96e6e',
  },
  {
    code: 'MX',
    name: 'Mexico',
    value: 114793341,
    color: '#f6d35b',
  },
  {
    code: 'MD',
    name: 'Moldova',
    value: 3544864,
    color: '#6bbfe4',
  },
  {
    code: 'MN',
    name: 'Mongolia',
    value: 2800114,
    color: '#eea638',
  },
  {
    code: 'ME',
    name: 'Montenegro',
    value: 632261,
    color: '#6bbfe4',
  },
  {
    code: 'MA',
    name: 'Morocco',
    value: 32272974,
    color: '#e96e6e',
  },
  {
    code: 'MZ',
    name: 'Mozambique',
    value: 23929708,
    color: '#e96e6e',
  },
  {
    code: 'MM',
    name: 'Myanmar',
    value: 48336763,
    color: '#eea638',
  },
  {
    code: 'NA',
    name: 'Namibia',
    value: 2324004,
    color: '#e96e6e',
  },
  {
    code: 'NP',
    name: 'Nepal',
    value: 30485798,
    color: '#eea638',
  },
  {
    code: 'NL',
    name: 'Netherlands',
    value: 16664746,
    color: '#6bbfe4',
  },
  {
    code: 'NZ',
    name: 'New Zealand',
    value: 4414509,
    color: '#8aabb0',
  },
  {
    code: 'NI',
    name: 'Nicaragua',
    value: 5869859,
    color: '#f6d35b',
  },
  {
    code: 'NE',
    name: 'Niger',
    value: 16068994,
    color: '#e96e6e',
  },
  {
    code: 'NG',
    name: 'Nigeria',
    value: 162470737,
    color: '#e96e6e',
  },
  {
    code: 'NO',
    name: 'Norway',
    value: 4924848,
    color: '#6bbfe4',
  },
  {
    code: 'OM',
    name: 'Oman',
    value: 2846145,
    color: '#eea638',
  },
  {
    code: 'PK',
    name: 'Pakistan',
    value: 176745364,
    color: '#eea638',
  },
  {
    code: 'PA',
    name: 'Panama',
    value: 3571185,
    color: '#f6d35b',
  },
  {
    code: 'PG',
    name: 'Papua New Guinea',
    value: 7013829,
    color: '#8aabb0',
  },
  {
    code: 'PY',
    name: 'Paraguay',
    value: 6568290,
    color: '#6be59c',
  },
  {
    code: 'PE',
    name: 'Peru',
    value: 29399817,
    color: '#6be59c',
  },
  {
    code: 'PH',
    name: 'Philippines',
    value: 94852030,
    color: '#eea638',
  },
  {
    code: 'PL',
    name: 'Poland',
    value: 38298949,
    color: '#6bbfe4',
  },
  {
    code: 'PT',
    name: 'Portugal',
    value: 10689663,
    color: '#6bbfe4',
  },
  {
    code: 'PR',
    name: 'Puerto Rico',
    value: 3745526,
    color: '#f6d35b',
  },
  {
    code: 'QA',
    name: 'Qatar',
    value: 1870041,
    color: '#eea638',
  },
  {
    code: 'RO',
    name: 'Romania',
    value: 21436495,
    color: '#6bbfe4',
  },
  {
    code: 'RU',
    name: 'Russia',
    value: 142835555,
    color: '#6bbfe4',
  },
  {
    code: 'RW',
    name: 'Rwanda',
    value: 10942950,
    color: '#e96e6e',
  },
  {
    code: 'SA',
    name: 'Saudi Arabia',
    value: 28082541,
    color: '#eea638',
  },
  {
    code: 'SN',
    name: 'Senegal',
    value: 12767556,
    color: '#e96e6e',
  },
  {
    code: 'RS',
    name: 'Serbia',
    value: 9853969,
    color: '#6bbfe4',
  },
  {
    code: 'SL',
    name: 'Sierra Leone',
    value: 5997486,
    color: '#e96e6e',
  },
  {
    code: 'SG',
    name: 'Singapore',
    value: 5187933,
    color: '#eea638',
  },
  {
    code: 'SK',
    name: 'Slovak Republic',
    value: 5471502,
    color: '#6bbfe4',
  },
  {
    code: 'SI',
    name: 'Slovenia',
    value: 2035012,
    color: '#6bbfe4',
  },
  {
    code: 'SB',
    name: 'Solomon Islands',
    value: 552267,
    color: '#8aabb0',
  },
  {
    code: 'SO',
    name: 'Somalia',
    value: 9556873,
    color: '#e96e6e',
  },
  {
    code: 'ZA',
    name: 'South Africa',
    value: 50459978,
    color: '#e96e6e',
  },
  {
    code: 'ES',
    name: 'Spain',
    value: 46454895,
    color: '#6bbfe4',
  },
  {
    code: 'LK',
    name: 'Sri Lanka',
    value: 21045394,
    color: '#eea638',
  },
  {
    code: 'SD',
    name: 'Sudan',
    value: 34735288,
    color: '#e96e6e',
  },
  {
    code: 'SR',
    name: 'Suriname',
    value: 529419,
    color: '#6be59c',
  },
  {
    code: 'SZ',
    name: 'Swaziland',
    value: 1203330,
    color: '#e96e6e',
  },
  {
    code: 'SE',
    name: 'Sweden',
    value: 9440747,
    color: '#6bbfe4',
  },
  {
    code: 'CH',
    name: 'Switzerland',
    value: 7701690,
    color: '#6bbfe4',
  },
  {
    code: 'SY',
    name: 'Syria',
    value: 20766037,
    color: '#eea638',
  },
  {
    code: 'TW',
    name: 'Taiwan',
    value: 23072000,
    color: '#eea638',
  },
  {
    code: 'TJ',
    name: 'Tajikistan',
    value: 6976958,
    color: '#eea638',
  },
  {
    code: 'TZ',
    name: 'Tanzania',
    value: 46218486,
    color: '#e96e6e',
  },
  {
    code: 'TH',
    name: 'Thailand',
    value: 69518555,
    color: '#eea638',
  },
  {
    code: 'TG',
    name: 'Togo',
    value: 6154813,
    color: '#e96e6e',
  },
  {
    code: 'TT',
    name: 'Trinidad and Tobago',
    value: 1346350,
    color: '#f6d35b',
  },
  {
    code: 'TN',
    name: 'Tunisia',
    value: 10594057,
    color: '#e96e6e',
  },
  {
    code: 'TR',
    name: 'Turkey',
    value: 73639596,
    color: '#6bbfe4',
  },
  {
    code: 'TM',
    name: 'Turkmenistan',
    value: 5105301,
    color: '#eea638',
  },
  {
    code: 'UG',
    name: 'Uganda',
    value: 34509205,
    color: '#e96e6e',
  },
  {
    code: 'UA',
    name: 'Ukraine',
    value: 45190180,
    color: '#6bbfe4',
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    value: 7890924,
    color: '#eea638',
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    value: 62417431,
    color: '#6bbfe4',
  },
  {
    code: 'US',
    name: 'United States',
    value: 313085380,
    color: '#f6d35b',
  },
  {
    code: 'UY',
    name: 'Uruguay',
    value: 3380008,
    color: '#6be59c',
  },
  {
    code: 'UZ',
    name: 'Uzbekistan',
    value: 27760267,
    color: '#eea638',
  },
  {
    code: 'VE',
    name: 'Venezuela',
    value: 29436891,
    color: '#6be59c',
  },
  {
    code: 'PS',
    name: 'West Bank and Gaza',
    value: 4152369,
    color: '#eea638',
  },
  {
    code: 'VN',
    name: 'Vietnam',
    value: 88791996,
    color: '#eea638',
  },
  {
    code: 'YE',
    name: 'Yemen, Rep.',
    value: 24799880,
    color: '#eea638',
  },
  {
    code: 'ZM',
    name: 'Zambia',
    value: 13474959,
    color: '#e96e6e',
  },
  {
    code: 'ZW',
    name: 'Zimbabwe',
    value: 12754378,
    color: '#e96e6e',
  },
]

export const bubbleMapData = {
  latLng,
  data,
}

export const returnColors = (size: number) => {
  if (size > data.length) return
  return data.splice(0, size).map((d) => d.color)
}

export const getValueBounds = (items: CountryItem[]) => {
  const values = items.map(({ value }) => value)
  return {
    min: Math.min(...values),
    max: Math.max(...values),
  }
}
import * as d3 from 'd3'

export const coordinatesPerCountry = (
  worldCountries: Array<Record<string, unknown>>,
  coordinates: Array<Record<string, unknown>>,
) => {
  const colors = data.map((d) => d.color)
  return worldCountries
    .map((ft, index) => {
      let count = 0
      coordinates.forEach((pointFt) => {
        if (d3.geoContains(ft, pointFt.geometry.coordinates)) {
          count++
        }
      })

      return {
        code: ft.id,
        name: ft.properties.name,
        value: count,
        color: colors[index] ? colors[index] : '#e96e6e',
      }
    })
    .filter((ft) => ft.value > 0)
}

export const getItemRadius = (item: CountryItem, values: ValueBounds, squares: ValueBounds) => {
  const square = ((item.value - values.min) / (values.max - values.min)) * (squares.max - squares.min) + squares.min
  return Math.round(Math.sqrt((4 * square) / Math.PI) * 10) / 10
}
