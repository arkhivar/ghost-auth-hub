import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MoreHorizontal, Mail, Globe } from "lucide-react";

// Mock data - replace with real API calls
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    sites: [
      { name: "blog.example.com", access: "subscriber" },
      { name: "shop.example.com", access: "premium" },
      { name: "docs.example.com", access: "none" }
    ],
    lastActive: "2 hours ago"
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    sites: [
      { name: "blog.example.com", access: "premium" },
      { name: "shop.example.com", access: "subscriber" },
      { name: "docs.example.com", access: "premium" }
    ],
    lastActive: "1 day ago"
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    sites: [
      { name: "blog.example.com", access: "none" },
      { name: "shop.example.com", access: "none" },
      { name: "docs.example.com", access: "subscriber" }
    ],
    lastActive: "3 days ago"
  }
];

const mockSites = ["blog.example.com", "shop.example.com", "docs.example.com"];

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users] = useState(mockUsers);

  const getAccessBadgeVariant = (access: string) => {
    switch (access) {
      case "premium": return "default";
      case "subscriber": return "secondary";
      case "none": return "outline";
      default: return "outline";
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground">
            Manage user access across all your Ghost sites
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Header Row */}
            <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-muted/50 rounded-lg text-sm font-medium">
              <div className="col-span-3">User</div>
              <div className="col-span-6">Site Access</div>
              <div className="col-span-2">Last Active</div>
              <div className="col-span-1">Actions</div>
            </div>

            {/* User Rows */}
            {filteredUsers.map((user) => (
              <div key={user.id} className="grid grid-cols-12 gap-4 px-4 py-3 border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="col-span-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Mail className="mr-1 h-3 w-3" />
                        {user.email}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-6">
                  <div className="flex flex-wrap gap-2">
                    {user.sites.map((site, idx) => (
                      <div key={idx} className="flex items-center space-x-1">
                        <Globe className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{site.name.split('.')[0]}</span>
                        <Badge variant={getAccessBadgeVariant(site.access)} className="text-xs">
                          {site.access}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-span-2">
                  <span className="text-sm text-muted-foreground">{user.lastActive}</span>
                </div>

                <div className="col-span-1">
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bulk Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Button variant="outline">Import from CSV</Button>
            <Button variant="outline">Export Users</Button>
            <Button variant="outline">Bulk Update Access</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}