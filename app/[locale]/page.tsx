import { getTranslations } from 'next-intl/server';

async function Page() {
  const t = await getTranslations('HomePage');

  return <span>{t('title')}</span>;
}

export default Page;
