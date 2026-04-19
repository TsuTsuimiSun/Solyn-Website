import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import {
  Mail,
  User,
  Calendar,
  MessageSquare,
  CheckCircle2,
  Clock,
  XCircle,
  Inbox,
  Trash2,
  Reply,
  RefreshCw,
} from 'lucide-react';

type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

interface Ticket {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: TicketStatus;
  adminReply: string | null;
  repliedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const STATUS_CONFIG: Record<
  TicketStatus,
  { label: string; color: string; icon: React.ReactNode }
> = {
  open: {
    label: 'Open',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: <Inbox className="w-3 h-3" />,
  },
  in_progress: {
    label: 'In Progress',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: <Clock className="w-3 h-3" />,
  },
  resolved: {
    label: 'Resolved',
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: <CheckCircle2 className="w-3 h-3" />,
  },
  closed: {
    label: 'Closed',
    color: 'bg-gray-100 text-gray-600 border-gray-200',
    icon: <XCircle className="w-3 h-3" />,
  },
};

function StatusBadge({ status }: { status: TicketStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${cfg.color}`}
    >
      {cfg.icon}
      {cfg.label}
    </span>
  );
}

function formatDate(d: Date | string | null) {
  if (!d) return '—';
  return new Date(d).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function TicketManager() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [replyText, setReplyText] = useState('');
  const [filterStatus, setFilterStatus] = useState<TicketStatus | 'all'>('all');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState<number | null>(null);

  const utils = trpc.useUtils();

  const { data: tickets = [], isLoading, refetch } = trpc.tickets.list.useQuery({ limit: 200 });

  const replyMutation = trpc.tickets.reply.useMutation({
    onSuccess: () => {
      toast.success('Reply sent successfully');
      setReplyText('');
      setSelectedTicket(null);
      utils.tickets.list.invalidate();
    },
    onError: (err) => toast.error(`Failed to send reply: ${err.message}`),
  });

  const updateStatusMutation = trpc.tickets.updateStatus.useMutation({
    onSuccess: () => {
      toast.success('Status updated');
      utils.tickets.list.invalidate();
      if (selectedTicket) {
        setSelectedTicket(null);
      }
    },
    onError: (err) => toast.error(`Failed to update status: ${err.message}`),
  });

  const deleteMutation = trpc.tickets.delete.useMutation({
    onSuccess: () => {
      toast.success('Ticket deleted');
      setShowDeleteConfirm(false);
      setTicketToDelete(null);
      setSelectedTicket(null);
      utils.tickets.list.invalidate();
    },
    onError: (err) => toast.error(`Failed to delete ticket: ${err.message}`),
  });

  const filtered =
    filterStatus === 'all'
      ? tickets
      : tickets.filter((t) => t.status === filterStatus);

  const counts = {
    all: tickets.length,
    open: tickets.filter((t) => t.status === 'open').length,
    in_progress: tickets.filter((t) => t.status === 'in_progress').length,
    resolved: tickets.filter((t) => t.status === 'resolved').length,
    closed: tickets.filter((t) => t.status === 'closed').length,
  };

  const handleReply = () => {
    if (!selectedTicket || !replyText.trim()) return;
    replyMutation.mutate({ id: selectedTicket.id, reply: replyText.trim() });
  };

  const handleStatusChange = (id: number, status: TicketStatus) => {
    updateStatusMutation.mutate({ id, status });
  };

  const confirmDelete = (id: number) => {
    setTicketToDelete(id);
    setShowDeleteConfirm(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Support Tickets</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage feedback and inquiries from website visitors
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => refetch()} className="gap-2">
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </Button>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {(['all', 'open', 'in_progress', 'resolved', 'closed'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              filterStatus === s
                ? 'bg-foreground text-background'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {s === 'all' ? 'All' : STATUS_CONFIG[s].label}
            <span className="ml-1.5 text-xs opacity-70">({counts[s]})</span>
          </button>
        ))}
      </div>

      {/* Ticket List */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No tickets found</p>
          <p className="text-sm mt-1">
            {filterStatus === 'all'
              ? 'No feedback has been submitted yet.'
              : `No ${STATUS_CONFIG[filterStatus as TicketStatus]?.label.toLowerCase()} tickets.`}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((ticket) => (
            <Card
              key={ticket.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedTicket?.id === ticket.id ? 'ring-2 ring-foreground' : ''
              }`}
              onClick={() => {
                setSelectedTicket(ticket as Ticket);
                setReplyText('');
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <StatusBadge status={ticket.status as TicketStatus} />
                      <span className="text-xs text-muted-foreground">#{ticket.id}</span>
                    </div>
                    <h3 className="font-semibold text-sm truncate">{ticket.subject}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {ticket.name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {ticket.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(ticket.createdAt)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">
                      {ticket.message}
                    </p>
                  </div>
                  {ticket.adminReply && (
                    <Badge variant="secondary" className="text-xs flex-shrink-0">
                      Replied
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Ticket Detail Dialog */}
      <Dialog open={!!selectedTicket} onOpenChange={(open) => !open && setSelectedTicket(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedTicket && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <StatusBadge status={selectedTicket.status} />
                  <span className="truncate">{selectedTicket.subject}</span>
                </DialogTitle>
                <DialogDescription>
                  Ticket #{selectedTicket.id} · Submitted {formatDate(selectedTicket.createdAt)}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5 py-2">
                {/* Sender Info */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-0.5">From</p>
                    <p className="font-medium">{selectedTicket.name}</p>
                    <a
                      href={`mailto:${selectedTicket.email}`}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      {selectedTicket.email}
                    </a>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-0.5">Status</p>
                    <select
                      value={selectedTicket.status}
                      onChange={(e) =>
                        handleStatusChange(selectedTicket.id, e.target.value as TicketStatus)
                      }
                      className="w-full bg-transparent text-sm font-medium outline-none cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <option value="open">Open</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                    Message
                  </p>
                  <div className="bg-muted/30 rounded-lg p-4 text-sm leading-relaxed whitespace-pre-wrap">
                    {selectedTicket.message}
                  </div>
                </div>

                {/* Existing Reply */}
                {selectedTicket.adminReply && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                      Your Reply · {formatDate(selectedTicket.repliedAt)}
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm leading-relaxed whitespace-pre-wrap">
                      {selectedTicket.adminReply}
                    </div>
                  </div>
                )}

                {/* Reply Form */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                    {selectedTicket.adminReply ? 'Update Reply' : 'Write a Reply'}
                  </p>
                  <Textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply here…"
                    rows={5}
                    className="resize-none"
                  />
                </div>
              </div>

              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  className="gap-1.5 sm:mr-auto"
                  onClick={() => confirmDelete(selectedTicket.id)}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedTicket(null)}
                >
                  Close
                </Button>
                <Button
                  onClick={handleReply}
                  disabled={!replyText.trim() || replyMutation.isPending}
                  className="gap-1.5"
                >
                  {replyMutation.isPending ? (
                    <span className="w-3.5 h-3.5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                  ) : (
                    <Reply className="w-3.5 h-3.5" />
                  )}
                  Send Reply
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Ticket?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The ticket and all its data will be permanently removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => ticketToDelete && deleteMutation.mutate({ id: ticketToDelete })}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Deleting…' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
