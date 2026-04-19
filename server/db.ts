import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, articles, InsertArticle, cases, InsertCase, clientLogos, InsertClientLogo, media, InsertMedia, tickets, InsertTicket } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Article queries
// Admin: returns ALL articles regardless of status
export async function getAllArticles(limit = 100, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  
  return db
    .select()
    .from(articles)
    .orderBy(desc(articles.createdAt))
    .limit(limit)
    .offset(offset);
}

export async function getArticles(limit = 10, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  
  return db
    .select()
    .from(articles)
    .where(eq(articles.status, 'published'))
    .orderBy(desc(articles.publishedAt))
    .limit(limit)
    .offset(offset);
}

export async function getArticleBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db
    .select()
    .from(articles)
    .where(eq(articles.slug, slug))
    .limit(1);
  
  return result.length > 0 ? result[0] : undefined;
}

export async function createArticle(article: InsertArticle) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  
  const result = await db.insert(articles).values(article);
  return result;
}

export async function updateArticle(id: number, article: Partial<InsertArticle>) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  
  const result = await db
    .update(articles)
    .set(article)
    .where(eq(articles.id, id));
  
  return result;
}

export async function deleteArticle(id: number) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  
  const result = await db
    .delete(articles)
    .where(eq(articles.id, id));
  
  return result;
}

// Case study queries
export async function getCases(limit = 10, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  
  return db
    .select()
    .from(cases)
    .where(eq(cases.status, 'published'))
    .orderBy(desc(cases.publishedAt))
    .limit(limit)
    .offset(offset);
}

export async function getCaseBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db
    .select()
    .from(cases)
    .where(eq(cases.slug, slug))
    .limit(1);
  
  return result.length > 0 ? result[0] : undefined;
}

export async function createCase(caseData: InsertCase) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  
  const result = await db.insert(cases).values(caseData);
  return result;
}

export async function updateCase(id: number, caseData: Partial<InsertCase>) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  
  const result = await db
    .update(cases)
    .set(caseData)
    .where(eq(cases.id, id));
  
  return result;
}

export async function deleteCase(id: number) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  
  const result = await db
    .delete(cases)
    .where(eq(cases.id, id));
  
  return result;
}

// Client logo queries
export async function getClientLogos() {
  const db = await getDb();
  if (!db) return [];
  
  return db
    .select()
    .from(clientLogos)
    .where(eq(clientLogos.status, 'active'))
    .orderBy(clientLogos.displayOrder);
}

export async function createClientLogo(logo: InsertClientLogo) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  
  const result = await db.insert(clientLogos).values(logo);
  return result;
}

export async function updateClientLogo(id: number, logo: Partial<InsertClientLogo>) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  
  const result = await db
    .update(clientLogos)
    .set(logo)
    .where(eq(clientLogos.id, id));
  
  return result;
}

export async function deleteClientLogo(id: number) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  
  const result = await db
    .delete(clientLogos)
    .where(eq(clientLogos.id, id));
  
  return result;
}

// Media queries
export async function createMedia(mediaData: InsertMedia) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  
  const result = await db.insert(media).values(mediaData);
  return result;
}

export async function deleteMedia(id: number) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  
  const result = await db
    .delete(media)
    .where(eq(media.id, id));
  
  return result;
}

// Ticket (support / feedback) queries
export async function getAllTickets(limit = 100, offset = 0) {
  const db = await getDb();
  if (!db) return [];
  
  return db
    .select()
    .from(tickets)
    .orderBy(desc(tickets.createdAt))
    .limit(limit)
    .offset(offset);
}

export async function getTicketById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db
    .select()
    .from(tickets)
    .where(eq(tickets.id, id))
    .limit(1);
  
  return result.length > 0 ? result[0] : undefined;
}

export async function createTicket(ticket: InsertTicket) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  
  return db.insert(tickets).values(ticket);
}

export async function updateTicket(id: number, data: Partial<InsertTicket>) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  
  return db.update(tickets).set(data).where(eq(tickets.id, id));
}

export async function deleteTicket(id: number) {
  const db = await getDb();
  if (!db) throw new Error('Database not available');
  
  return db.delete(tickets).where(eq(tickets.id, id));
}
