import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Image as ImageIcon,
  Type,
  GripVertical,
  AlignLeft,
} from 'lucide-react';
import CloudinaryUpload from '@/components/CloudinaryUpload';

// ─── Block Types ──────────────────────────────────────────────────────────────

export type TextBlock = {
  id: string;
  type: 'text';
  content: string;
};

export type ImageBlock = {
  id: string;
  type: 'image';
  url: string;
  publicId?: string;
  caption?: string;
  align?: 'left' | 'center' | 'right' | 'full';
};

export type HeadingBlock = {
  id: string;
  type: 'heading';
  content: string;
  level: 2 | 3;
};

export type ContentBlock = TextBlock | ImageBlock | HeadingBlock;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export function parseBlocks(raw: string): ContentBlock[] {
  if (!raw) return [{ id: uid(), type: 'text', content: '' }];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch {
    // Legacy plain-text content – wrap in a single text block
    return [{ id: uid(), type: 'text', content: raw }];
  }
  return [{ id: uid(), type: 'text', content: '' }];
}

export function serializeBlocks(blocks: ContentBlock[]): string {
  return JSON.stringify(blocks);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TextBlockEditor({
  block,
  onChange,
}: {
  block: TextBlock;
  onChange: (b: TextBlock) => void;
}) {
  return (
    <Textarea
      value={block.content}
      onChange={(e) => onChange({ ...block, content: e.target.value })}
      placeholder="Write your paragraph here…"
      rows={5}
      className="resize-y text-base leading-relaxed"
    />
  );
}

function HeadingBlockEditor({
  block,
  onChange,
}: {
  block: HeadingBlock;
  onChange: (b: HeadingBlock) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex gap-2 items-center">
        <span className="text-xs text-muted-foreground">Level:</span>
        {([2, 3] as const).map((lvl) => (
          <button
            key={lvl}
            type="button"
            onClick={() => onChange({ ...block, level: lvl })}
            className={`text-xs px-2 py-0.5 rounded border transition-colors ${
              block.level === lvl
                ? 'bg-accent text-accent-foreground border-accent'
                : 'border-border text-muted-foreground hover:border-accent/50'
            }`}
          >
            H{lvl}
          </button>
        ))}
      </div>
      <Input
        value={block.content}
        onChange={(e) => onChange({ ...block, content: e.target.value })}
        placeholder={`Heading ${block.level} text…`}
        className={block.level === 2 ? 'text-2xl font-bold' : 'text-xl font-semibold'}
      />
    </div>
  );
}

function ImageBlockEditor({
  block,
  onChange,
}: {
  block: ImageBlock;
  onChange: (b: ImageBlock) => void;
}) {
  return (
    <div className="space-y-3">
      <CloudinaryUpload
        onUploadComplete={(url, publicId) =>
          onChange({ ...block, url, publicId: publicId ?? '' })
        }
        currentUrl={block.url || undefined}
        maxSize={8}
      />
      {block.url && (
        <>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">
              Caption (optional)
            </label>
            <Input
              value={block.caption ?? ''}
              onChange={(e) => onChange({ ...block, caption: e.target.value })}
              placeholder="Image caption…"
              className="text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">
              Alignment
            </label>
            <div className="flex gap-2">
              {(['left', 'center', 'right', 'full'] as const).map((align) => (
                <button
                  key={align}
                  type="button"
                  onClick={() => onChange({ ...block, align })}
                  className={`text-xs px-2 py-0.5 rounded border capitalize transition-colors ${
                    (block.align ?? 'full') === align
                      ? 'bg-accent text-accent-foreground border-accent'
                      : 'border-border text-muted-foreground hover:border-accent/50'
                  }`}
                >
                  {align}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Main BlockEditor ─────────────────────────────────────────────────────────

interface BlockEditorProps {
  value: string; // serialized JSON blocks
  onChange: (value: string) => void;
}

export default function BlockEditor({ value, onChange }: BlockEditorProps) {
  const [blocks, setBlocks] = useState<ContentBlock[]>(() => parseBlocks(value));

  const commit = (updated: ContentBlock[]) => {
    setBlocks(updated);
    onChange(serializeBlocks(updated));
  };

  const updateBlock = (id: string, updated: ContentBlock) => {
    commit(blocks.map((b) => (b.id === id ? updated : b)));
  };

  const deleteBlock = (id: string) => {
    const next = blocks.filter((b) => b.id !== id);
    commit(next.length > 0 ? next : [{ id: uid(), type: 'text', content: '' }]);
  };

  const moveBlock = (id: string, direction: 'up' | 'down') => {
    const idx = blocks.findIndex((b) => b.id === id);
    if (idx < 0) return;
    const next = [...blocks];
    const swap = direction === 'up' ? idx - 1 : idx + 1;
    if (swap < 0 || swap >= next.length) return;
    [next[idx], next[swap]] = [next[swap], next[idx]];
    commit(next);
  };

  const addBlock = (afterId: string, type: ContentBlock['type']) => {
    const idx = blocks.findIndex((b) => b.id === afterId);
    const newBlock: ContentBlock =
      type === 'text'
        ? { id: uid(), type: 'text', content: '' }
        : type === 'heading'
        ? { id: uid(), type: 'heading', content: '', level: 2 }
        : { id: uid(), type: 'image', url: '', align: 'full' };
    const next = [...blocks];
    next.splice(idx + 1, 0, newBlock);
    commit(next);
  };

  return (
    <div className="space-y-3">
      {blocks.map((block, idx) => (
        <div key={block.id} className="group relative border border-border rounded-lg bg-card">
          {/* Block type label */}
          <div className="flex items-center gap-1 px-3 pt-2 pb-1 border-b border-border/50 bg-muted/30 rounded-t-lg">
            <GripVertical className="w-3 h-3 text-muted-foreground/50" />
            <span className="text-xs text-muted-foreground capitalize font-medium flex items-center gap-1">
              {block.type === 'text' && <AlignLeft className="w-3 h-3" />}
              {block.type === 'image' && <ImageIcon className="w-3 h-3" />}
              {block.type === 'heading' && <Type className="w-3 h-3" />}
              {block.type}
            </span>
            <div className="ml-auto flex items-center gap-1">
              <button
                type="button"
                onClick={() => moveBlock(block.id, 'up')}
                disabled={idx === 0}
                className="p-0.5 rounded hover:bg-muted disabled:opacity-30 transition-colors"
                title="Move up"
              >
                <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
              <button
                type="button"
                onClick={() => moveBlock(block.id, 'down')}
                disabled={idx === blocks.length - 1}
                className="p-0.5 rounded hover:bg-muted disabled:opacity-30 transition-colors"
                title="Move down"
              >
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
              <button
                type="button"
                onClick={() => deleteBlock(block.id)}
                className="p-0.5 rounded hover:bg-destructive/10 text-destructive/60 hover:text-destructive transition-colors"
                title="Delete block"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Block content */}
          <div className="p-3">
            {block.type === 'text' && (
              <TextBlockEditor
                block={block}
                onChange={(b) => updateBlock(block.id, b)}
              />
            )}
            {block.type === 'heading' && (
              <HeadingBlockEditor
                block={block}
                onChange={(b) => updateBlock(block.id, b)}
              />
            )}
            {block.type === 'image' && (
              <ImageBlockEditor
                block={block}
                onChange={(b) => updateBlock(block.id, b)}
              />
            )}
          </div>

          {/* Add block after this one */}
          <div className="flex items-center gap-1 px-3 pb-2 pt-1 border-t border-border/50">
            <span className="text-xs text-muted-foreground mr-1">Add after:</span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-6 text-xs px-2 gap-1"
              onClick={() => addBlock(block.id, 'text')}
            >
              <AlignLeft className="w-3 h-3" />
              Text
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-6 text-xs px-2 gap-1"
              onClick={() => addBlock(block.id, 'heading')}
            >
              <Type className="w-3 h-3" />
              Heading
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-6 text-xs px-2 gap-1"
              onClick={() => addBlock(block.id, 'image')}
            >
              <ImageIcon className="w-3 h-3" />
              Image
            </Button>
          </div>
        </div>
      ))}

      {/* Add first block if list is empty */}
      {blocks.length === 0 && (
        <div className="flex gap-2 justify-center py-6 border-2 border-dashed border-border rounded-lg">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => commit([{ id: uid(), type: 'text', content: '' }])}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add first block
          </Button>
        </div>
      )}
    </div>
  );
}
