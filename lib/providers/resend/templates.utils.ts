export type EmailTemplateName = keyof IntlMessages['EmailTemplates'];

export type EmailTemplates = {
  [key in EmailTemplateName]: string;
};

// You can add new email templates here with the following format:
// 'ExampleEmailTemplate': 'example-email-template',
// The key should be the same as the key in the json file in messages folder, in the EmailTemplates object.
// The value should be the name of the file in the templates folder
export const emailTemplates: EmailTemplates = {
  ExampleEmailTemplate: 'example-email-template',
};

export type TranslationEmailTemplateFunction<T extends EmailTemplateName> = (
  key: keyof IntlMessages['EmailTemplates'][T],
  params?: Record<string, any>,
) => string;

export type EmailTemplateComponentProps<T, Y extends EmailTemplateName> = {
  data: T;
  locale: string;
  t: TranslationEmailTemplateFunction<Y>;
};

export type EmailTemplateComponent<T, Y extends EmailTemplateName> = (
  props: EmailTemplateComponentProps<T, Y>,
) => JSX.Element;
