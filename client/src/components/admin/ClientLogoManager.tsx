import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit2, Trash2, Save, GripVertical } from 'lucide-react';
import { toast } from 'sonner';
import CloudinaryUpload from '@/components/CloudinaryUpload';

interface LogoForm {
  id?: number;
  name: string;
  logoUrl: string;
  displayOrder: number;
  status: 'active' | 'inactive';
}

export default function ClientLogoManager() {
  const [currentForm, setCurrentForm] = useState<LogoForm>({
    name: '',
    logoUrl: '',
    displayOrder: 0,
    status: 'active',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('list');

  const listQuery = trpc.clientLogos.list.useQuery();
  const createMutation = trpc.clientLogos.create.useMutation();
  const updateMutation = trpc.clientLogos.update.useMutation();
  const deleteMutation = trpc.clientLogos.delete.useMutation();

  const handleSave = async () => {
    try {
      if (!currentForm.name || !currentForm.logoUrl) {
        toast.error('Please fill in all required fields');
        return;
      }

      if (isEditing && currentForm.id) {
        await updateMutation.mutateAsync({
          id: currentForm.id,
          name: currentForm.name,
          logoUrl: currentForm.logoUrl,
          displayOrder: currentForm.displayOrder,
          status: currentForm.status,
        });
        toast.success('Logo updated successfully');
      } else {
        await createMutation.mutateAsync({
          name: currentForm.name,
          logoUrl: currentForm.logoUrl,
          displayOrder: currentForm.displayOrder,
        });
        toast.success('Logo created successfully');
      }

      setCurrentForm({
        name: '',
        logoUrl: '',
        displayOrder: 0,
        status: 'active',
      });
      setIsEditing(false);
      setActiveTab('list');
      await listQuery.refetch();
    } catch (error) {
      toast.error('Error saving logo');
      console.error(error);
    }
  };

  const handleEdit = (logo: any) => {
    setCurrentForm({
      id: logo.id,
      name: logo.name,
      logoUrl: logo.logoUrl,
      displayOrder: logo.displayOrder,
      status: logo.status,
    });
    setIsEditing(true);
    setActiveTab('form');
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this logo?')) {
      try {
        await deleteMutation.mutateAsync({ id });
        toast.success('Logo deleted successfully');
        await listQuery.refetch();
      } catch (error) {
        toast.error('Error deleting logo');
        console.error(error);
      }
    }
  };

  const handleNew = () => {
    setCurrentForm({
      name: '',
      logoUrl: '',
      displayOrder: (listQuery.data?.length || 0) + 1,
      status: 'active',
    });
    setIsEditing(false);
    setActiveTab('form');
  };

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">Logos List</TabsTrigger>
          <TabsTrigger value="form">
            {isEditing ? 'Edit Logo' : 'New Logo'}
          </TabsTrigger>
        </TabsList>

        {/* Logos List Tab */}
        <TabsContent value="list" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Client Logos</h3>
            <Button onClick={handleNew} className="gap-2">
              <Plus className="w-4 h-4" />
              New Logo
            </Button>
          </div>

          {listQuery.isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          ) : listQuery.data && listQuery.data.length > 0 ? (
            <div className="space-y-2">
              {listQuery.data.map((logo: any) => (
                <Card key={logo.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />
                        <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                          <img
                            src={logo.logoUrl}
                            alt={logo.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-base">{logo.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            Order: {logo.displayOrder} • Status: {logo.status}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(logo)}
                          className="gap-1"
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(logo.id)}
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
              No logos found. Add one to get started!
            </div>
          )}
        </TabsContent>

        {/* Logo Form Tab */}
        <TabsContent value="form" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{isEditing ? 'Edit Logo' : 'Add New Logo'}</CardTitle>
              <CardDescription>
                Fill in the logo details below
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Company Name */}
              <div>
                <label className="text-sm font-medium mb-2 block">Company Name *</label>
                <Input
                  value={currentForm.name}
                  onChange={(e) => setCurrentForm({ ...currentForm, name: e.target.value })}
                  placeholder="Client company name"
                />
              </div>

              {/* Logo Upload */}
              <div>
                <label className="text-sm font-medium mb-2 block">Logo Image</label>
                <CloudinaryUpload
                  onUploadComplete={(url) => setCurrentForm({ ...currentForm, logoUrl: url })}
                />
              </div>

              {/* Logo Preview */}
              {currentForm.logoUrl && (
                <div className="border border-border rounded-lg p-4 bg-gray-50">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Preview:</p>
                  <div className="w-32 h-32 bg-white rounded flex items-center justify-center overflow-hidden border border-border">
                    <img
                      src={currentForm.logoUrl}
                      alt="Logo preview"
                      className="w-full h-full object-contain"
                      onError={() => toast.error('Failed to load image')}
                    />
                  </div>
                </div>
              )}

              {/* Display Order */}
              <div>
                <label className="text-sm font-medium mb-2 block">Display Order</label>
                <Input
                  type="number"
                  value={currentForm.displayOrder}
                  onChange={(e) => setCurrentForm({ ...currentForm, displayOrder: parseInt(e.target.value) })}
                  placeholder="0"
                />
              </div>

              {/* Status */}
              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Select value={currentForm.status} onValueChange={(value: any) => 
                  setCurrentForm({ ...currentForm, status: value })
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Save Button */}
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isEditing ? 'Update Logo' : 'Add Logo'}
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
