'use server';

import { z } from 'zod';

export interface ISomeActionSchema {
  param1: string;
  param2: number;
}

const getSomeActionSchema = () => {
  return z.object({
    param1: z.string(),
    param2: z.number(),
  });
};

export const someActionName = async (
  data: z.infer<ReturnType<typeof getSomeActionSchema>>,
) => {
  const parsedData = await getSomeActionSchema().parseAsync(data);
  const { param1, param2 } = parsedData;

  return {
    param1,
    param2,
  };
};
