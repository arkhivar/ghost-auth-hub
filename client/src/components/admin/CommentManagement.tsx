import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MessageSquare, Globe, Flag, Check, X, MoreHorizontal } from "lucide-react";

// Mock data - replace with real Ghost API calls
const mockComments = [
  {
    id: 1,
    content: "This is exactly what I needed! Thanks for the detailed explanation.",
    author: "John Doe",
    authorEmail: "john@example.com",
    post: "How to Set Up Ghost with MySQL",
    site: "blog.example.com",
    status: "published",
    createdAt: "2 hours ago",
    likes: 5,
    isSpam: false
  },
  {
    id: 2,
    content: "Could you add more examples? The current ones are great but I'd love to see edge cases.",
    author: "Sarah Wilson", 
    authorEmail: "sarah@example.com",
    post: "Advanced Ghost Theming Guide",
    site: "docs.example.com",
    status: "published",
    createdAt: "4 hours ago",
    likes: 2,
    isSpam: false
  },
  {
    id: 3,
    content: "Buy cheap followers! Click here for amazing deals!!!",
    author: "Spam Bot",
    authorEmail: "spam@badsite.com",
    post: "Getting Started with Ghost",
    site: "blog.example.com",
    status: "pending",
    createdAt: "1 day ago",
    likes: 0,
    isSpam: true
  },
  {
    id: 4,
    content: "The new member access controls make it much easier to manage our Ghost sites.",
    author: "Mike Johnson",
    authorEmail: "mike@example.com", 
    post: "Interactive Learning Tools",
    site: "blog.example.com",
    status: "published",
    createdAt: "2 days ago",
    likes: 8,
    isSpam: false
  }
];

const mockStats = {
  total: 1247,
  pending: 23,
  published: 1198,
  spam: 26,
  todayCount: 34
};

export default function CommentManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [comments] = useState(mockComments);

  const getStatusBadge = (status: string, isSpam: boolean) => {
    if (isSpam) return <Badge className="bg-red-100 text-red-800">Spam</Badge>;
    
    switch (status) {
      case "published": return <Badge className="bg-green-100 text-green-800">Published</Badge>;
      case "pending": return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredComments = comments.filter(comment => {
    const matchesSearch = comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.post.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === "all" ||
                         (filterStatus === "spam" && comment.isSpam) ||
                         (filterStatus === "pending" && comment.status === "pending") ||
                         (filterStatus === "published" && comment.status === "published" && !comment.isSpam);
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Comment Management</h2>
        <p className="text-muted-foreground">
          Manage comments across all your Ghost sites
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.total.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Flag className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{mockStats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Check className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{mockStats.published.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Spam Blocked</CardTitle>
            <X className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{mockStats.spam}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{mockStats.todayCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search comments, authors, or posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-80"
                />
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant={filterStatus === "all" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setFilterStatus("all")}
                >
                  All
                </Button>
                <Button 
                  variant={filterStatus === "pending" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setFilterStatus("pending")}
                >
                  Pending
                </Button>
                <Button 
                  variant={filterStatus === "published" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setFilterStatus("published")}
                >
                  Published
                </Button>
                <Button 
                  variant={filterStatus === "spam" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setFilterStatus("spam")}
                >
                  Spam
                </Button>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Bulk Actions</Button>
              <Button variant="outline" size="sm">Export</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredComments.map((comment) => (
              <div key={comment.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {comment.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium">{comment.author}</div>
                        <div className="text-sm text-muted-foreground">{comment.authorEmail}</div>
                      </div>
                      {getStatusBadge(comment.status, comment.isSpam)}
                    </div>
                    
                    <div className="bg-muted/50 rounded p-3">
                      <p className="text-sm">{comment.content}</p>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Globe className="h-3 w-3" />
                          <span>{comment.site}</span>
                        </div>
                        <span>on "{comment.post}"</span>
                        <span>{comment.createdAt}</span>
                        {comment.likes > 0 && (
                          <span>♥ {comment.likes}</span>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        {comment.status === "pending" && (
                          <>
                            <Button variant="outline" size="sm">
                              <Check className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                            <Button variant="outline" size="sm">
                              <X className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}