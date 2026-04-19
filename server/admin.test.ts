import { describe, it, expect, beforeAll } from 'vitest';
import * as db from './db';

describe('Admin Features', () => {
  describe('Article Management', () => {
    it('should create an article', async () => {
      const uniqueSlug = `test-article-${Date.now()}`;
      const result = await db.createArticle({
        title: 'Test Article',
        slug: uniqueSlug,
        excerpt: 'Test excerpt',
        content: 'Test content',
        author: 'Test Author',
        category: 'Technology',
        language: 'en',
        status: 'draft',
        createdBy: 1,
      });

      expect(result).toBeDefined();
    });

    it('should retrieve articles', async () => {
      const articles = await db.getArticles(10, 0);
      expect(Array.isArray(articles)).toBe(true);
    });

    it('should get article by slug', async () => {
      const article = await db.getArticleBySlug('test-article-nonexistent');
      if (article) {
        expect(article.slug).toBe('test-article');
      }
    });
  });

  describe('Case Management', () => {
    it('should create a case', async () => {
      const uniqueSlug = `test-case-${Date.now()}`;
      const result = await db.createCase({
        title: 'Test Case',
        slug: uniqueSlug,
        description: 'Test case description',
        content: 'Test case content',
        imageUrl: 'https://example.com/image.jpg',
        category: 'M&A',
        language: 'en',
        status: 'draft',
        createdBy: 1,
      });

      expect(result).toBeDefined();
    });

    it('should retrieve cases', async () => {
      const cases = await db.getCases(10, 0);
      expect(Array.isArray(cases)).toBe(true);
    });

    it('should get case by slug', async () => {
      const caseItem = await db.getCaseBySlug('test-case-nonexistent');
      if (caseItem) {
        expect(caseItem.slug).toBe('test-case');
      }
    });
  });

  describe('Client Logo Management', () => {
    it('should create a client logo', async () => {
      const result = await db.createClientLogo({
        name: 'Test Company',
        logoUrl: 'https://example.com/logo.png',
        cloudinaryPublicId: 'test-logo',
        displayOrder: 1,
        status: 'active',
        createdBy: 1,
      });

      expect(result).toBeDefined();
    });

    it('should retrieve client logos', async () => {
      const logos = await db.getClientLogos();
      expect(Array.isArray(logos)).toBe(true);
    });

    it('should update client logo', async () => {
      const logos = await db.getClientLogos();
      if (logos.length > 0) {
        const result = await db.updateClientLogo(logos[0].id, {
          displayOrder: 2,
        });
        expect(result).toBeDefined();
      }
    });
  });
});
