import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit2, Trash2, Save, Image } from 'lucide-react';
import { toast } from 'sonner';
import CloudinaryUpload from '@/components/CloudinaryUpload';
import BlockEditor from '@/components/admin/BlockEditor';

interface ArticleForm {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  language: 'zh' | 'en' | 'ja';
  status: 'draft' | 'published' | 'archived';
  coverImage?: string;
  coverImagePublicId?: string;
}

/**
 * Convert a title string to a URL-friendly slug.
 * - Converts to lowercase
 * - Replaces spaces and special characters with hyphens
 * - Strips characters that are not alphanumeric or hyphens
 * - Collapses multiple consecutive hyphens
 * - Trims leading/trailing hyphens
 * For CJK characters (Chinese/Japanese), keeps them as-is since they are valid in URLs.
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')          // spaces and underscores → hyphen
    .replace(/[^\w\u4e00-\u9fff\u3040-\u30ff-]/g, '') // keep word chars, CJK, hyphens
    .replace(/-{2,}/g, '-')            // collapse multiple hyphens
    .replace(/^-+|-+$/g, '');          // trim leading/trailing hyphens
}

export default function ArticleManager() {
  const { t } = useTranslation();
  const [articles, setArticles] = useState<ArticleForm[]>([]);
  const [currentForm, setCurrentForm] = useState<ArticleForm>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    language: 'en',
    status: 'draft',
    coverImage: '',
    coverImagePublicId: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('list');
  // Track whether the slug has been manually edited so we don't overwrite it
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  // Use listAll (admin route) to see ALL articles including drafts
  const listQuery = trpc.articles.listAll.useQuery({ limit: 100, offset: 0 });
  const createMutation = trpc.articles.create.useMutation();
  const updateMutation = trpc.articles.update.useMutation();
  const deleteMutation = trpc.articles.delete.useMutation();

  const handleSave = async () => {
    try {
      if (!currentForm.title || !currentForm.slug || !currentForm.content) {
        toast.error('Please fill in all required fields');
        return;
      }

      if (isEditing && currentForm.id) {
        await updateMutation.mutateAsync({
          id: currentForm.id,
          ...currentForm,
          coverImage: currentForm.coverImage || undefined,
          coverImagePublicId: currentForm.coverImagePublicId || undefined,
        });
        toast.success('Article updated successfully');
      } else {
        await createMutation.mutateAsync({
          title: currentForm.title,
          slug: currentForm.slug,
          excerpt: currentForm.excerpt,
          content: currentForm.content,
          author: currentForm.author,
          category: currentForm.category,
          language: currentForm.language,
          status: currentForm.status,
          coverImage: currentForm.coverImage || undefined,
          coverImagePublicId: currentForm.coverImagePublicId || undefined,
        });
        toast.success('Article created successfully');
      }

      setCurrentForm({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        author: '',
        category: '',
        language: 'en',
        status: 'draft',
        coverImage: '',
        coverImagePublicId: '',
      });
      setIsEditing(false);
      setActiveTab('list');
      await listQuery.refetch();
    } catch (error) {
      toast.error('Error saving article');
      console.error(error);
    }
  };

  const handleEdit = (article: any) => {
    setCurrentForm({
      id: article.id,
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt || '',
      content: article.content,
      author: article.author,
      category: article.category || '',
      language: article.language,
      status: article.status,
      coverImage: article.coverImage || '',
      coverImagePublicId: article.coverImagePublicId || '',
    });
    setIsEditing(true);
    setSlugManuallyEdited(true); // don't overwrite slug when editing
    setActiveTab('form');
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this article?')) {
      try {
        await deleteMutation.mutateAsync({ id });
        toast.success('Article deleted successfully');
        await listQuery.refetch();
      } catch (error) {
        toast.error('Error deleting article');
        console.error(error);
      }
    }
  };

  const handleNew = () => {
    setCurrentForm({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      author: '',
      category: '',
      language: 'en',
      status: 'draft',
      coverImage: '',
      coverImagePublicId: '',
    });
    setIsEditing(false);
    setSlugManuallyEdited(false);
    setActiveTab('form');
  };

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">Articles List</TabsTrigger>
          <TabsTrigger value="form">
            {isEditing ? 'Edit Article' : 'New Article'}
          </TabsTrigger>
        </TabsList>

        {/* Articles List Tab */}
        <TabsContent value="list" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">All Articles</h3>
            <Button onClick={handleNew} className="gap-2">
              <Plus className="w-4 h-4" />
              New Article
            </Button>
          </div>

          {listQuery.isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          ) : listQuery.data && listQuery.data.length > 0 ? (
            <div className="space-y-2">
              {listQuery.data.map((article: any) => (
                <Card key={article.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-base mb-1">{article.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {article.excerpt || article.content.substring(0, 100)}...
                        </p>
                        <div className="flex gap-2 text-xs text-muted-foreground">
                          <span>By {article.author}</span>
                          <span>•</span>
                          <span>{article.language.toUpperCase()}</span>
                          <span>•</span>
                          <span className={`px-2 py-1 rounded ${
                            article.status === 'published' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {article.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(article)}
                          className="gap-1"
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(article.id)}
                          className="gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No articles found. Create one to get started!
            </div>
          )}
        </TabsContent>

        {/* Article Form Tab */}
        <TabsContent value="form" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{isEditing ? 'Edit Article' : 'Create New Article'}</CardTitle>
              <CardDescription>
                Fill in the article details below
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Language Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Language</label>
                  <Select value={currentForm.language} onValueChange={(value: any) => 
                    setCurrentForm({ ...currentForm, language: value })
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="zh">中文</SelectItem>
                      <SelectItem value="ja">日本語</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Status</label>
                  <Select value={currentForm.status} onValueChange={(value: any) => 
                    setCurrentForm({ ...currentForm, status: value })
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="text-sm font-medium mb-2 block">Title *</label>
                <Input
                  value={currentForm.title}
                  onChange={(e) => {
                    const newTitle = e.target.value;
                    // Auto-generate slug only when not manually edited
                    if (!slugManuallyEdited) {
                      setCurrentForm({
                        ...currentForm,
                        title: newTitle,
                        slug: generateSlug(newTitle),
                      });
                    } else {
                      setCurrentForm({ ...currentForm, title: newTitle });
                    }
                  }}
                  placeholder="Article title"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Slug *
                  {!slugManuallyEdited && (
                    <span className="ml-2 text-xs text-muted-foreground font-normal">
                      (auto-generated from title)
                    </span>
                  )}
                  {slugManuallyEdited && (
                    <button
                      type="button"
                      className="ml-2 text-xs text-accent hover:underline font-normal"
                      onClick={() => {
                        setSlugManuallyEdited(false);
                        setCurrentForm({
                          ...currentForm,
                          slug: generateSlug(currentForm.title),
                        });
                      }}
                    >
                      Reset to auto
                    </button>
                  )}
                </label>
                <Input
                  value={currentForm.slug}
                  onChange={(e) => {
                    setSlugManuallyEdited(true);
                    setCurrentForm({ ...currentForm, slug: e.target.value });
                  }}
                  placeholder="article-slug"
                />
              </div>

              {/* Author */}
              <div>
                <label className="text-sm font-medium mb-2 block">Author</label>
                <Input
                  value={currentForm.author}
                  onChange={(e) => setCurrentForm({ ...currentForm, author: e.target.value })}
                  placeholder="Author name"
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <Input
                  value={currentForm.category}
                  onChange={(e) => setCurrentForm({ ...currentForm, category: e.target.value })}
                  placeholder="Article category"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="text-sm font-medium mb-2 block">Excerpt</label>
                <Textarea
                  value={currentForm.excerpt}
                  onChange={(e) => setCurrentForm({ ...currentForm, excerpt: e.target.value })}
                  placeholder="Brief summary of the article"
                  rows={3}
                />
              </div>

              {/* Cover Image */}
              <div>
                <label className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Image className="w-4 h-4" />
                  Cover Image
                  <span className="text-xs text-muted-foreground font-normal">(optional)</span>
                </label>
                <CloudinaryUpload
                  onUploadComplete={(url, publicId) => {
                    setCurrentForm({
                      ...currentForm,
                      coverImage: url,
                      coverImagePublicId: publicId ?? '',
                    });
                  }}
                  currentUrl={currentForm.coverImage || undefined}
                  maxSize={5}
                />
                {currentForm.coverImage && (
                  <button
                    type="button"
                    className="mt-1 text-xs text-destructive hover:underline"
                    onClick={() => setCurrentForm({ ...currentForm, coverImage: '', coverImagePublicId: '' })}
                  >
                    Remove cover image
                  </button>
                )}
              </div>

              {/* Content */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Content *
                  <span className="ml-2 text-xs text-muted-foreground font-normal">
                    Add text paragraphs, headings, and images in any order
                  </span>
                </label>
                <BlockEditor
                  value={currentForm.content}
                  onChange={(val) => setCurrentForm({ ...currentForm, content: val })}
                />
              </div>

              {/* Save Button */}
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isEditing ? 'Update Article' : 'Create Article'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setActiveTab('list');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
