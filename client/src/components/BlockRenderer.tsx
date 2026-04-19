import { parseBlocks, type ContentBlock, type TextBlock, type ImageBlock, type HeadingBlock } from '@/components/admin/BlockEditor';

// ─── Individual block renderers ───────────────────────────────────────────────

function RenderTextBlock({ block }: { block: TextBlock }) {
  if (!block.content.trim()) return null;
  return (
    <p className="text-lg text-foreground/80 leading-relaxed whitespace-pre-wrap mb-6">
      {block.content}
    </p>
  );
}

function RenderHeadingBlock({ block }: { block: HeadingBlock }) {
  if (!block.content.trim()) return null;
  if (block.level === 2) {
    return (
      <h2 className="text-3xl font-bold text-foreground mt-10 mb-4 leading-tight">
        {block.content}
      </h2>
    );
  }
  return (
    <h3 className="text-2xl font-semibold text-foreground mt-8 mb-3 leading-tight">
      {block.content}
    </h3>
  );
}

function RenderImageBlock({ block }: { block: ImageBlock }) {
  if (!block.url) return null;

  const alignClass =
    block.align === 'left'
      ? 'float-left mr-8 mb-4 max-w-sm clear-left'
      : block.align === 'right'
      ? 'float-right ml-8 mb-4 max-w-sm clear-right'
      : block.align === 'center'
      ? 'mx-auto mb-6 max-w-2xl'
      : 'w-full mb-6'; // full (default)

  return (
    <figure className={`${alignClass} block`}>
      <img
        src={block.url}
        alt={block.caption ?? ''}
        className="w-full rounded-lg shadow-md object-cover"
      />
      {block.caption && (
        <figcaption className="text-sm text-center text-muted-foreground mt-2 italic">
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}

// ─── Main BlockRenderer ───────────────────────────────────────────────────────

interface BlockRendererProps {
  content: string; // serialized JSON blocks OR legacy plain text
  className?: string;
}

export default function BlockRenderer({ content, className = '' }: BlockRendererProps) {
  const blocks = parseBlocks(content);

  return (
    <div className={`clearfix ${className}`}>
      {blocks.map((block: ContentBlock) => {
        switch (block.type) {
          case 'text':
            return <RenderTextBlock key={block.id} block={block} />;
          case 'heading':
            return <RenderHeadingBlock key={block.id} block={block} />;
          case 'image':
            return <RenderImageBlock key={block.id} block={block} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
