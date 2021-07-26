const lang = {
  dashboard: 'Dashboard',
  overview: 'Overview',
  maps: 'Maps',
  modes: 'Modes',
  bans: 'Bans',
  servers: 'Servers',
  records: 'Records',
  jumpstats: 'Jumpstats'
};

export default async (context, locale) => {
  return await Promise.resolve(lang);
};
