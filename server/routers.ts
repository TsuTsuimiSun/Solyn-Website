import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { uploadImageToCloudinary } from "./cloudinary";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  articles: router({
    list: publicProcedure
      .input(z.object({ limit: z.number().default(10), offset: z.number().default(0) }))
      .query(({ input }) => db.getArticles(input.limit, input.offset)),
    
    // Admin-only: returns ALL articles regardless of status (draft, published, archived)
    listAll: protectedProcedure
      .input(z.object({ limit: z.number().default(100), offset: z.number().default(0) }))
      .query(({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        return db.getAllArticles(input.limit, input.offset);
      }),
    
    bySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(({ input }) => db.getArticleBySlug(input.slug)),
    
    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        slug: z.string(),
        excerpt: z.string().optional(),
        content: z.string(),
        author: z.string(),
        category: z.string().optional(),
        language: z.enum(['zh', 'en', 'ja']).default('en'),
        status: z.enum(['draft', 'published', 'archived']).default('draft'),
        coverImage: z.string().optional(),
        coverImagePublicId: z.string().optional(),
      }))
      .mutation(({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        const { status, ...rest } = input;
        return db.createArticle({
          ...rest,
          status,
          publishedAt: status === 'published' ? new Date() : null,
          createdBy: ctx.user.id,
        });
      }),
    
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        slug: z.string().optional(),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        author: z.string().optional(),
        category: z.string().optional(),
        status: z.enum(['draft', 'published', 'archived']).optional(),
        coverImage: z.string().optional(),
        coverImagePublicId: z.string().optional(),
      }))
      .mutation(({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        const { id, ...updates } = input;
        return db.updateArticle(id, {
          ...updates,
          publishedAt: updates.status === 'published' ? new Date() : undefined,
        });
      }),
    
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        return db.deleteArticle(input.id);
      }),
  }),

  cases: router({
    list: publicProcedure
      .input(z.object({ limit: z.number().default(10), offset: z.number().default(0) }))
      .query(({ input }) => db.getCases(input.limit, input.offset)),
    
    bySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(({ input }) => db.getCaseBySlug(input.slug)),
    
    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        slug: z.string(),
        description: z.string().optional(),
        content: z.string(),
        imageUrl: z.string().optional(),
        category: z.string().optional(),
        language: z.enum(['zh', 'en', 'ja']).default('en'),
      }))
      .mutation(({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        return db.createCase({
          ...input,
          status: 'draft',
          publishedAt: null,
          createdBy: ctx.user.id,
        });
      }),
    
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        slug: z.string().optional(),
        description: z.string().optional(),
        content: z.string().optional(),
        imageUrl: z.string().optional(),
        category: z.string().optional(),
        status: z.enum(['draft', 'published', 'archived']).optional(),
      }))
      .mutation(({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        const { id, ...updates } = input;
        return db.updateCase(id, {
          ...updates,
          publishedAt: updates.status === 'published' ? new Date() : undefined,
        });
      }),
    
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        return db.deleteCase(input.id);
      }),
  }),

  clientLogos: router({
    list: publicProcedure
      .query(() => db.getClientLogos()),
    
    create: protectedProcedure
      .input(z.object({
        name: z.string(),
        logoUrl: z.string(),
        cloudinaryPublicId: z.string().optional(),
        displayOrder: z.number().default(0),
      }))
      .mutation(({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        return db.createClientLogo({
          ...input,
          status: 'active',
          createdBy: ctx.user.id,
        });
      }),
    
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        logoUrl: z.string().optional(),
        displayOrder: z.number().optional(),
        status: z.enum(['active', 'inactive']).optional(),
      }))
      .mutation(({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        const { id, ...updates } = input;
        return db.updateClientLogo(id, updates);
      }),
    
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        return db.deleteClientLogo(input.id);
      }),
  }),
  upload: router({
    image: protectedProcedure
      .input(z.object({
        // base64-encoded data URL, e.g. "data:image/png;base64,..."
        dataUrl: z.string(),
        folder: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        const { url, publicId } = await uploadImageToCloudinary(
          input.dataUrl,
          input.folder ?? 'solyn_advisory'
        );
        return { url, publicId };
      }),
  }),

  tickets: router({
    // Public: anyone can submit a ticket
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1).max(255),
        email: z.string().email().max(320),
        subject: z.string().min(1).max(255),
        message: z.string().min(10),
      }))
      .mutation(async ({ input }) => {
        const ticket = await db.createTicket({
          name: input.name,
          email: input.email,
          subject: input.subject,
          message: input.message,
          status: 'open',
        });

        // Notify the site owner via Manus in-app notification
        try {
          await notifyOwner({
            title: `📩 New Support Ticket: ${input.subject}`,
            content: [
              `**From:** ${input.name} <${input.email}>`,
              `**Subject:** ${input.subject}`,
              `**Message:**`,
              input.message,
              ``,
              `View and reply in the Admin Dashboard → Tickets tab.`,
            ].join('\n'),
          });
        } catch (err) {
          // Notification failure should not block ticket submission
          console.warn('[Tickets] Failed to send owner notification:', err);
        }

        return { success: true };
      }),

    // Admin: list all tickets
    list: protectedProcedure
      .input(z.object({ limit: z.number().default(100), offset: z.number().default(0) }))
      .query(({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') throw new Error('Unauthorized');
        return db.getAllTickets(input.limit, input.offset);
      }),

    // Admin: get single ticket
    get: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') throw new Error('Unauthorized');
        return db.getTicketById(input.id);
      }),

    // Admin: update status
    updateStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(['open', 'in_progress', 'resolved', 'closed']),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') throw new Error('Unauthorized');
        await db.updateTicket(input.id, { status: input.status });
        return { success: true };
      }),

    // Admin: reply to ticket
    reply: protectedProcedure
      .input(z.object({
        id: z.number(),
        reply: z.string().min(1),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') throw new Error('Unauthorized');
        await db.updateTicket(input.id, {
          adminReply: input.reply,
          repliedAt: new Date(),
          repliedBy: ctx.user.id,
          status: 'in_progress',
        });
        return { success: true };
      }),

    // Admin: delete ticket
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') throw new Error('Unauthorized');
        await db.deleteTicket(input.id);
        return { success: true };
      }),
  }),
});
export type AppRouter = typeof appRouter;
