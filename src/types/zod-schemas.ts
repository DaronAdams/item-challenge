import { z } from 'zod';

/** Enums **/
const ItemTypeSchema = z.enum(['multiple-choice', 'free-response', 'essay']);
const StatusSchema = z.enum(['draft', 'review', 'approved', 'archived']);
const SecurityLevelSchema = z.enum(['standard', 'secure', 'highly-secure']);

export type ItemType = z.infer<typeof ItemTypeSchema>;
export type Status = z.infer<typeof StatusSchema>;
export type SecurityLevel = z.infer<typeof SecurityLevelSchema>;

const ContentSchema = z.object({
  question: z.string().min(1),
  options: z.array(z.string()).optional(),
  correctAnswer: z.string().min(1),
  explanation: z.string().min(1),
});

export const CreateItemSchema = z.object({
  subject: z.string().min(1),
  itemType: ItemTypeSchema,
  difficulty: z.number().int().min(1).max(5),
  content: ContentSchema,
  metadata: z.object({
    author: z.string().min(1),
    status: StatusSchema,
    tags: z.array(z.string()),
  }),
  securityLevel: SecurityLevelSchema,
});

export const UpdateItemSchema = z.object({
  subject: z.string().min(1).optional(),
  itemType: ItemTypeSchema.optional(),
  difficulty: z.number().int().min(1).max(5).optional(),
  content: ContentSchema.partial().optional(),
  metadata: z.object({
    author: z.string().optional(),
    status: StatusSchema.optional(),
    tags: z.array(z.string()).optional(),
  }).optional(),
  securityLevel: SecurityLevelSchema.optional(),
});

export type CreateItem = z.infer<typeof CreateItemSchema>;
export type UpdateItem = z.infer<typeof UpdateItemSchema>;