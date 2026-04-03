import { z } from 'zod';

const ContentSchema = z.object({
  question: z.string().min(1),
  options: z.array(z.string()).optional(),
  correctAnswer: z.string().min(1),
  explanation: z.string().min(1),
});

export const CreateItemSchema = z.object({
  subject: z.string().min(1),
  itemType: z.enum(['multiple-choice', 'free-response', 'essay']),
  difficulty: z.number().int().min(1).max(5),
  content: ContentSchema,
  metadata: z.object({
    author: z.string().min(1),
    status: z.enum(['draft', 'review', 'approved', 'archived']),
    tags: z.array(z.string()),
  }),
  securityLevel: z.enum(['standard', 'secure', 'highly-secure']),
});

export type CreateItem = z.infer<typeof CreateItemSchema>;