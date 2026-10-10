import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Globe, Users, MessageSquare, Share2, ExternalLink, Activity, Heart, Repeat2, Eye, TrendingUp } from "lucide-react";

// Mock data for Fediverse interactions
const mockFediverseStats = {
  totalFollowers: 2847,
  totalPosts: 156,
  totalInteractions: 8932,
  weeklyGrowth: 12.5,
  platforms: {
    mastodon: { followers: 1523, posts: 89, interactions: 5234 },
    threads: { followers: 894, posts: 45, interactions: 2876 },
    other: { followers: 430, posts: 22, interactions: 822 }
  }
};

const mockFediversePosts = [
  {
    id: 1,
    title: "How to Set Up Ghost with MySQL",
    site: "blog.example.com",
    fediverseUrl: "@blog@example.com/posts/mysql-setup",
    platforms: ["mastodon", "threads"],
    publishedAt: "2 hours ago",
    stats: { likes: 23, shares: 8, replies: 5, views: 342 },
    status: "federated"
  },
  {
    id: 2,
    title: "Advanced Ghost Theming Guide", 
    site: "docs.example.com",
    fediverseUrl: "@docs@example.com/posts/theming-guide",
    platforms: ["mastodon"],
    publishedAt: "1 day ago",
    stats: { likes: 45, shares: 12, replies: 9, views: 567 },
    status: "federated"
  },
  {
    id: 3,
    title: "New Guide: Managing Ghost Member Access",
    site: "shop.example.com", 
    fediverseUrl: "@shop@example.com/posts/member-access",
    platforms: ["threads", "mastodon"],
    publishedAt: "3 days ago",
    stats: { likes: 89, shares: 34, replies: 23, views: 1234 },
    status: "federated"
  }
];

const mockFediverseInteractions = [
  {
    id: 1,
    type: "follow",
    platform: "mastodon",
    user: "@sarah@mastodon.social",
    action: "followed @blog@example.com",
    timestamp: "5 min ago",
    avatar: "S"
  },
  {
    id: 2,
    type: "share",
    platform: "threads",
    user: "@mike_dev",
    action: 'shared "How to Set Up Ghost with MySQL"',
    timestamp: "15 min ago",
    avatar: "M"
  },
  {
    id: 3,
    type: "reply",
    platform: "mastodon",
    user: "@ghost_fan@fosstodon.org",
    action: 'replied to "Advanced Ghost Theming Guide"',
    timestamp: "1 hour ago",
    avatar: "G"
  },
  {
    id: 4,
    type: "like",
    platform: "threads",
    user: "@web_designer",
    action: 'liked "Managing Ghost Member Access"',
    timestamp: "2 hours ago",
    avatar: "W"
  }
];

export default function FediverseManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("all");

  const getPlatformBadge = (platform: string) => {
    const configs = {
      mastodon: { color: "bg-purple-100 text-purple-800", label: "Mastodon" },
      threads: { color: "bg-blue-100 text-blue-800", label: "Threads" },
      other: { color: "bg-gray-100 text-gray-800", label: "Other" }
    };
    const config = configs[platform as keyof typeof configs] || configs.other;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case "follow": return <Users className="h-4 w-4 text-blue-600" />;
      case "share": return <Repeat2 className="h-4 w-4 text-green-600" />;
      case "reply": return <MessageSquare className="h-4 w-4 text-orange-600" />;
      case "like": return <Heart className="h-4 w-4 text-red-600" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Fediverse Management</h2>
        <p className="text-muted-foreground">
          Manage your decentralized presence across Mastodon, Threads, and the entire Fediverse
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockFediverseStats.totalFollowers.toLocaleString()}</div>
            <p className="text-xs text-green-600 mt-1">+{mockFediverseStats.weeklyGrowth}% this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Federated Posts</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockFediverseStats.totalPosts}</div>
            <p className="text-xs text-muted-foreground">Across all platforms</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Interactions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockFediverseStats.totalInteractions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Likes, shares, replies</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Reach</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Active platforms</p>
          </CardContent>
        </Card>
      </div>

      {/* Platform Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="font-medium">Mastodon</span>
                </div>
                <Badge variant="outline">{mockFediverseStats.platforms.mastodon.followers} followers</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                {mockFediverseStats.platforms.mastodon.posts} posts • {mockFediverseStats.platforms.mastodon.interactions.toLocaleString()} interactions
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium">Threads</span>
                </div>
                <Badge variant="outline">{mockFediverseStats.platforms.threads.followers} followers</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                {mockFediverseStats.platforms.threads.posts} posts • {mockFediverseStats.platforms.threads.interactions.toLocaleString()} interactions
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  <span className="font-medium">Other</span>
                </div>
                <Badge variant="outline">{mockFediverseStats.platforms.other.followers} followers</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                {mockFediverseStats.platforms.other.posts} posts • {mockFediverseStats.platforms.other.interactions.toLocaleString()} interactions
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="posts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="posts">Federated Posts</TabsTrigger>
          <TabsTrigger value="interactions">Live Interactions</TabsTrigger>
          <TabsTrigger value="settings">Federation Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Federated Posts</CardTitle>
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                  <Button variant="outline" size="sm">Refresh</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockFediversePosts.map((post) => (
                  <div key={post.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-medium">{post.title}</h3>
                          <Badge className="bg-green-100 text-green-800">Federated</Badge>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Globe className="h-3 w-3" />
                            <span>{post.site}</span>
                          </div>
                          <span>{post.fediverseUrl}</span>
                          <span>{post.publishedAt}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {post.platforms.map((platform) => getPlatformBadge(platform))}
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm">
                          <div className="flex items-center space-x-1">
                            <Heart className="h-4 w-4 text-red-500" />
                            <span>{post.stats.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Repeat2 className="h-4 w-4 text-green-500" />
                            <span>{post.stats.shares}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="h-4 w-4 text-blue-500" />
                            <span>{post.stats.replies}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4 text-gray-500" />
                            <span>{post.stats.views}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Live Fediverse Interactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockFediverseInteractions.map((interaction) => (
                  <div key={interaction.id} className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-center space-x-3">
                      {getActionIcon(interaction.type)}
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {interaction.avatar}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{interaction.user}</span>
                        {getPlatformBadge(interaction.platform)}
                      </div>
                      <p className="text-sm text-muted-foreground">{interaction.action}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {interaction.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Federation Settings</CardTitle>
              <p className="text-muted-foreground">
                Configure how your Ghost sites federate to the decentralized web
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Site Federation Status</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">blog.example.com</div>
                      <div className="text-sm text-muted-foreground">@blog@example.com</div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">shop.example.com</div>
                      <div className="text-sm text-muted-foreground">@shop@example.com</div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">docs.example.com</div>
                      <div className="text-sm text-muted-foreground">@docs@example.com</div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Platform Integration</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                      <span className="font-medium">Mastodon</span>
                      <Badge className="bg-green-100 text-green-800">Connected</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Auto-federate posts to the Mastodon network
                    </p>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                      <span className="font-medium">Threads</span>
                      <Badge className="bg-green-100 text-green-800">Connected</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Cross-post to Meta's Threads platform
                    </p>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}