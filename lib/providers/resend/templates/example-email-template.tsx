import { Html, Heading, Text } from '@react-email/components';
import { EmailTemplateComponentProps } from '../templates.utils';

export interface IExampleEmailTemplateData {
  name: string;
  email: string;
  message: string;
}

const ExampleEmailTemplate = ({
  data: { name, email, message },
  locale,
  t,
}: EmailTemplateComponentProps<
  IExampleEmailTemplateData,
  'ExampleEmailTemplate'
>) => {
  return (
    <Html lang={locale}>
      <Heading as="h1">{t('title')}</Heading>
      <Text>{t('subtitle')}</Text>
      <Text>{t('name', { name })}</Text>
      <Text>{t('email', { email })}</Text>
      <Text>{t('message', { message })}</Text>
    </Html>
  );
};

export default ExampleEmailTemplate;
