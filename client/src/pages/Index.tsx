import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import UserManagement from "@/components/admin/UserManagement";
import SiteManagement from "@/components/admin/SiteManagement";
import Dashboard from "@/components/admin/Dashboard";
import CommentManagement from "@/components/admin/CommentManagement";
import FediverseManagement from "@/components/admin/FediverseManagement";

const Index = () => {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState("dashboard");

  useEffect(() => {
    document.title = "Ghost Active Directory - Admin Dashboard";
  }, []);

  useEffect(() => {
    // Check current session
    auth.getSession().then(({ user }) => {
      const isAuthed = !!user;
      setAuthed(isAuthed);
    });

    // Listen for auth state changes
    const { unsubscribe } = auth.onAuthStateChange((user) => {
      const isAuthed = !!user;
      setAuthed(isAuthed);
    });

    return unsubscribe;
  }, []);

  // Temporary bypass for demo - remove in production
  const showDashboard = true;

  if (!showDashboard && !authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 to-indigo-100">
        <div className="text-center space-y-6 p-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Ghost Active Directory</h1>
            <p className="text-muted-foreground text-lg">Centralized user management for your Ghost sites</p>
          </div>
          <Button 
            variant="default" 
            size="lg"
            onClick={() => navigate('/auth')}
            className="px-8"
          >
            Admin Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">Ghost Admin Dashboard</h1>
          </div>
          <Button variant="outline" onClick={async () => { 
            await auth.signOut(); 
            navigate('/auth'); 
          }}>
            Logout
          </Button>
        </div>
      </header>

      <main className="container py-8">
        <Tabs value={tab} onValueChange={setTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="sites">Sites</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="fediverse">Fediverse</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>
          
          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
          
          <TabsContent value="sites">
            <SiteManagement />
          </TabsContent>
          
          <TabsContent value="comments">
            <CommentManagement />
          </TabsContent>
          
          <TabsContent value="fediverse">
            <FediverseManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;