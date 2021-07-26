const lang = {
  dashboard: 'Dashboard',
  home: 'Home',
  maps: 'Maps'
};

export default async (context, locale) => {
  return await Promise.resolve(lang);
};
