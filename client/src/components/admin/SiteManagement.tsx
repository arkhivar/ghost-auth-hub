import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Globe, Plus, Settings, Users, ExternalLink } from "lucide-react";

// Mock data - replace with real API calls
const mockSites = [
  {
    id: 1,
    name: "Main Blog",
    domain: "blog.example.com",
    status: "active",
    userCount: 456,
    subscribers: 234,
    premium: 122,
    lastSync: "5 minutes ago"
  },
  {
    id: 2,
    name: "E-commerce Store",
    domain: "shop.example.com", 
    status: "active",
    userCount: 289,
    subscribers: 156,
    premium: 89,
    lastSync: "12 minutes ago"
  },
  {
    id: 3,
    name: "Documentation",
    domain: "docs.example.com",
    status: "maintenance",
    userCount: 145,
    subscribers: 98,
    premium: 67,
    lastSync: "2 hours ago"
  },
  {
    id: 4,
    name: "Portfolio Site",
    domain: "portfolio.example.com",
    status: "inactive",
    userCount: 34,
    subscribers: 12,
    premium: 8,
    lastSync: "1 day ago"
  }
];

export default function SiteManagement() {
  const [sites] = useState(mockSites);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "maintenance": return <Badge className="bg-yellow-100 text-yellow-800">Maintenance</Badge>;
      case "inactive": return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Site Management</h2>
          <p className="text-muted-foreground">
            Manage your Ghost sites and their user access
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Site
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {sites.map((site) => (
          <Card key={site.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <CardTitle className="text-lg">{site.name}</CardTitle>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{site.domain}</span>
                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(site.status)}
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-blue-600">{site.userCount}</div>
                    <div className="text-xs text-muted-foreground">Total Users</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-green-600">{site.subscribers}</div>
                    <div className="text-xs text-muted-foreground">Subscribers</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-purple-600">{site.premium}</div>
                    <div className="text-xs text-muted-foreground">Premium</div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Last sync:</span>
                    <span>{site.lastSync}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Users className="mr-2 h-4 w-4" />
                    Manage Users
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Sync Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Site Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">
                {sites.reduce((sum, site) => sum + site.userCount, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Users</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-600">
                {sites.reduce((sum, site) => sum + site.subscribers, 0)}
              </div>
              <div className="text-sm text-muted-foreground">All Subscribers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600">
                {sites.reduce((sum, site) => sum + site.premium, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Premium Users</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-orange-600">
                {sites.filter(site => site.status === 'active').length}
              </div>
              <div className="text-sm text-muted-foreground">Active Sites</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}