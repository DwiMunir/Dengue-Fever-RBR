const CONTACT_INFO = {
  supportEmail: 'support@dengue-fever.umby.dev',
  policyEmail: 'support@dengue-fever.umby.dev',
  phone: '+62 895-3840-46096',
  location: {
    en: 'Yogyakarta, Indonesia',
    id: 'Yogyakarta, Indonesia'
  },
  hours: {
    en: '24/7 Available',
    id: 'Tersedia 24/7'
  }
};

const normalizeLocale = (locale) => {
  if (!locale) return 'en';
  return locale.split('-')[0];
};

export const getLocalizedContactInfo = (locale) => {
  const key = normalizeLocale(locale);
  return {
    location: CONTACT_INFO.location[key] || CONTACT_INFO.location.en,
    hours: CONTACT_INFO.hours[key] || CONTACT_INFO.hours.en
  };
};

export { CONTACT_INFO };
