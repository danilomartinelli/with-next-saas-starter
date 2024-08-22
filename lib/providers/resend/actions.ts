'use server';

import { Resend } from 'resend';
import { getTranslations, getLocale } from 'next-intl/server';
import {
  EmailTemplateComponent,
  EmailTemplateName,
  emailTemplates,
} from './templates.utils';
import { env } from '@/lib/utils/t3/env';
import { config } from '@/lib/config';

interface ISendEmailParams<Data> {
  data: Data;
  templateName: EmailTemplateName;
  to: string | string[];
  subject: string;
}

async function sendEmail<Data>({
  data,
  templateName,
  to,
  subject,
}: ISendEmailParams<Data>) {
  const { default: Template } = (await import(
    `@/templates/${emailTemplates[templateName]}`
  )) as { default: EmailTemplateComponent<Data, EmailTemplateName> };

  const t = await getTranslations(`EmailTemplates.${templateName}`);

  const locale = await getLocale();

  if (!env.RESEND_API_KEY) {
    return {
      error: 'RESEND_API_KEY is not defined',
      success: false,
    };
  }

  try {
    const resend = new Resend(env.RESEND_API_KEY);

    await resend.emails.send({
      from: config.providers.resend.from,
      to,
      subject,
      react: Template({ data, locale, t }),
    });

    return {
      error: null,
      success: true,
    };
  } catch (error) {
    return {
      error: (error as Error).message,
      success: false,
    };
  }
}

export default sendEmail;
