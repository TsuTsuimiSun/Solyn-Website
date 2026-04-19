import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Lock, ShieldAlert, Loader2 } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { useAuth } from '@/lib/auth';
import { getLoginUrl } from '@/const';
import ArticleManager from '@/components/admin/ArticleManager';
import CaseManager from '@/components/admin/CaseManager';
import ClientLogoManager from '@/components/admin/ClientLogoManager';
import TicketManager from '@/components/admin/TicketManager';

export default function AdminDashboard() {
  const auth = useAuth();
  const logoutMutation = trpc.auth.logout.useMutation();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    window.location.href = '/';
  };

  const handleLogin = () => {
    // Encode returnPath so after login user comes back to /admin
    const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
    const appId = import.meta.env.VITE_APP_ID;
    const redirectUri = `${window.location.origin}/api/oauth/callback`;
    const state = btoa(JSON.stringify({ redirectUri, returnPath: '/admin' }));

    const url = new URL(`${oauthPortalUrl}/app-auth`);
    url.searchParams.set('appId', appId);
    url.searchParams.set('redirectUri', redirectUri);
    url.searchParams.set('state', state);
    url.searchParams.set('type', 'signIn');
    window.location.href = url.toString();
  };

  // Loading state while auth is being checked
  if (auth.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Not logged in → show login page
  if (!auth.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
              <Lock className="w-7 h-7 text-primary" />
            </div>
            <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
            <CardDescription>
              Sign in with your Manus account to access the Solyn Advisory admin panel.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" size="lg" onClick={handleLogin}>
              Login with Manus
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Only authorized administrators can access this area.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Logged in but not admin → show access denied
  if (auth.user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-14 h-14 bg-destructive/10 rounded-full flex items-center justify-center">
              <ShieldAlert className="w-7 h-7 text-destructive" />
            </div>
            <CardTitle className="text-2xl">Access Denied</CardTitle>
            <CardDescription>
              You are logged in as <strong>{auth.user.name}</strong>, but your account does not have admin privileges.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-center text-muted-foreground">
              Please contact the website owner to request admin access.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => window.location.href = '/'}>
                Back to Home
              </Button>
              <Button variant="destructive" className="flex-1" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin user → show dashboard
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container h-16 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Solyn Advisory — Admin Dashboard</h1>
            <p className="text-xs text-muted-foreground">Manage content and media</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, <strong>{auth.user.name}</strong>
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <Tabs defaultValue="articles" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="cases">Cases</TabsTrigger>
            <TabsTrigger value="logos">Client Logos</TabsTrigger>
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="space-y-4">
            <ArticleManager />
          </TabsContent>

          <TabsContent value="cases" className="space-y-4">
            <CaseManager />
          </TabsContent>

          <TabsContent value="logos" className="space-y-4">
            <ClientLogoManager />
          </TabsContent>

          <TabsContent value="tickets" className="space-y-4">
            <TicketManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
