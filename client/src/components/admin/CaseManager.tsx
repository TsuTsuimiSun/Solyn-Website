import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit2, Trash2, Save, Upload } from 'lucide-react';
import { toast } from 'sonner';
import CloudinaryUpload from '@/components/CloudinaryUpload';

interface CaseForm {
  id?: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  imageUrl: string;
  category: string;
  language: 'zh' | 'en' | 'ja';
  status: 'draft' | 'published' | 'archived';
}

export default function CaseManager() {
  const [cases, setCases] = useState<CaseForm[]>([]);
  const [currentForm, setCurrentForm] = useState<CaseForm>({
    title: '',
    slug: '',
    description: '',
    content: '',
    imageUrl: '',
    category: '',
    language: 'en',
    status: 'draft',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('list');

  const listQuery = trpc.cases.list.useQuery({ limit: 100, offset: 0 });
  const createMutation = trpc.cases.create.useMutation();
  const updateMutation = trpc.cases.update.useMutation();
  const deleteMutation = trpc.cases.delete.useMutation();

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
        });
        toast.success('Case updated successfully');
      } else {
        await createMutation.mutateAsync({
          title: currentForm.title,
          slug: currentForm.slug,
          description: currentForm.description,
          content: currentForm.content,
          imageUrl: currentForm.imageUrl,
          category: currentForm.category,
          language: currentForm.language,
        });
        toast.success('Case created successfully');
      }

      setCurrentForm({
        title: '',
        slug: '',
        description: '',
        content: '',
        imageUrl: '',
        category: '',
        language: 'en',
        status: 'draft',
      });
      setIsEditing(false);
      setActiveTab('list');
      await listQuery.refetch();
    } catch (error) {
      toast.error('Error saving case');
      console.error(error);
    }
  };

  const handleEdit = (caseItem: any) => {
    setCurrentForm({
      id: caseItem.id,
      title: caseItem.title,
      slug: caseItem.slug,
      description: caseItem.description || '',
      content: caseItem.content,
      imageUrl: caseItem.imageUrl || '',
      category: caseItem.category || '',
      language: caseItem.language,
      status: caseItem.status,
    });
    setIsEditing(true);
    setActiveTab('form');
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this case?')) {
      try {
        await deleteMutation.mutateAsync({ id });
        toast.success('Case deleted successfully');
        await listQuery.refetch();
      } catch (error) {
        toast.error('Error deleting case');
        console.error(error);
      }
    }
  };

  const handleNew = () => {
    setCurrentForm({
      title: '',
      slug: '',
      description: '',
      content: '',
      imageUrl: '',
      category: '',
      language: 'en',
      status: 'draft',
    });
    setIsEditing(false);
    setActiveTab('form');
  };

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">Cases List</TabsTrigger>
          <TabsTrigger value="form">
            {isEditing ? 'Edit Case' : 'New Case'}
          </TabsTrigger>
        </TabsList>

        {/* Cases List Tab */}
        <TabsContent value="list" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">All Cases</h3>
            <Button onClick={handleNew} className="gap-2">
              <Plus className="w-4 h-4" />
              New Case
            </Button>
          </div>

          {listQuery.isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          ) : listQuery.data && listQuery.data.length > 0 ? (
            <div className="space-y-2">
              {listQuery.data.map((caseItem: any) => (
                <Card key={caseItem.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-base mb-1">{caseItem.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {caseItem.description || caseItem.content.substring(0, 100)}...
                        </p>
                        <div className="flex gap-2 text-xs text-muted-foreground">
                          <span>{caseItem.language.toUpperCase()}</span>
                          <span>•</span>
                          <span className={`px-2 py-1 rounded ${
                            caseItem.status === 'published' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {caseItem.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(caseItem)}
                          className="gap-1"
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(caseItem.id)}
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
              No cases found. Create one to get started!
            </div>
          )}
        </TabsContent>

        {/* Case Form Tab */}
        <TabsContent value="form" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{isEditing ? 'Edit Case' : 'Create New Case'}</CardTitle>
              <CardDescription>
                Fill in the case study details below
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
                  onChange={(e) => setCurrentForm({ ...currentForm, title: e.target.value })}
                  placeholder="Case title"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="text-sm font-medium mb-2 block">Slug *</label>
                <Input
                  value={currentForm.slug}
                  onChange={(e) => setCurrentForm({ ...currentForm, slug: e.target.value })}
                  placeholder="case-slug"
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <Input
                  value={currentForm.category}
                  onChange={(e) => setCurrentForm({ ...currentForm, category: e.target.value })}
                  placeholder="Case category"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="text-sm font-medium mb-2 block">Case Image</label>
                <CloudinaryUpload
                  onUploadComplete={(url) => setCurrentForm({ ...currentForm, imageUrl: url })}
                />
                {currentForm.imageUrl && (
                  <div className="mt-4 border border-border rounded-lg p-4 bg-gray-50">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Current Image:</p>
                    <div className="w-full h-48 bg-white rounded overflow-hidden border border-border">
                      <img
                        src={currentForm.imageUrl}
                        alt="Case image"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  value={currentForm.description}
                  onChange={(e) => setCurrentForm({ ...currentForm, description: e.target.value })}
                  placeholder="Brief summary of the case"
                  rows={3}
                />
              </div>

              {/* Content */}
              <div>
                <label className="text-sm font-medium mb-2 block">Content *</label>
                <Textarea
                  value={currentForm.content}
                  onChange={(e) => setCurrentForm({ ...currentForm, content: e.target.value })}
                  placeholder="Full case study content"
                  rows={8}
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
                  {isEditing ? 'Update Case' : 'Create Case'}
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
