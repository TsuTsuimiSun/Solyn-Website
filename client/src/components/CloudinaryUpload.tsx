import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';

interface CloudinaryUploadProps {
  onUploadComplete: (url: string, publicId?: string) => void;
  onUploadStart?: () => void;
  onUploadEnd?: () => void;
  maxSize?: number; // in MB
  acceptedFormats?: string[];
  currentUrl?: string; // show existing image if any
}

export default function CloudinaryUpload({
  onUploadComplete,
  onUploadStart,
  onUploadEnd,
  maxSize = 5,
  acceptedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  currentUrl,
}: CloudinaryUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentUrl ?? null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = trpc.upload.image.useMutation();

  const handleUpload = async (file: File) => {
    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Validate file type
    if (!acceptedFormats.includes(file.type)) {
      toast.error('Invalid file format. Please upload a JPG, PNG, GIF, or WebP image.');
      return;
    }

    setIsUploading(true);
    onUploadStart?.();

    try {
      // Convert file to base64 data URL
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      // Show local preview immediately
      setPreviewUrl(dataUrl);

      // Upload via tRPC → server → Cloudinary
      const result = await uploadMutation.mutateAsync({ dataUrl });

      // Replace preview with the real CDN URL
      setPreviewUrl(result.url);
      onUploadComplete(result.url, result.publicId);
      toast.success('Image uploaded successfully');
    } catch (error: any) {
      console.error('Upload error:', error);
      setPreviewUrl(null);
      toast.error(error?.message ?? 'Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
      onUploadEnd?.();
      // Reset input so same file can be re-selected
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files?.[0]) handleUpload(files[0]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0]) handleUpload(files[0]);
  };

  return (
    <div className="space-y-3">
      {/* Preview */}
      {previewUrl && (
        <div className="border border-border rounded-lg p-3 bg-muted/30 flex items-center gap-3">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-16 h-16 object-contain rounded border border-border bg-white"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-green-500" />
              Image ready
            </p>
            <p className="text-xs text-muted-foreground truncate">{previewUrl}</p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-xs shrink-0"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            Change
          </Button>
        </div>
      )}

      {/* Drop zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          dragActive
            ? 'border-primary bg-primary/5'
            : 'border-border hover:border-primary/50 hover:bg-muted/20'
        } ${isUploading ? 'opacity-60 cursor-not-allowed' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          accept={acceptedFormats.join(',')}
          className="hidden"
          disabled={isUploading}
        />

        <div className="flex flex-col items-center gap-2">
          {isUploading ? (
            <>
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <p className="text-sm font-medium">Uploading to Cloudinary...</p>
              <p className="text-xs text-muted-foreground">Please wait</p>
            </>
          ) : (
            <>
              <Upload className="w-8 h-8 text-muted-foreground" />
              <p className="text-sm font-medium">
                {previewUrl ? 'Click or drag to replace image' : 'Drag & drop image here'}
              </p>
              <p className="text-xs text-muted-foreground">or click to browse</p>
              <p className="text-xs text-muted-foreground mt-1">
                Max {maxSize}MB · JPG, PNG, GIF, WebP
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
