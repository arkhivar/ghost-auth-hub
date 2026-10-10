import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { auth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const title = mode === "login" ? "Sign in | Ghost Auth Hub" : "Create account | Ghost Auth Hub";
    document.title = title;

    const metaDesc = document.querySelector('meta[name="description"]') || document.createElement("meta");
    metaDesc.setAttribute("name", "description");
    metaDesc.setAttribute("content", "Sign in to manage access across your Ghost sites.");
    document.head.appendChild(metaDesc);

    const link = document.querySelector('link[rel="canonical"]') || document.createElement("link");
    link.setAttribute("rel", "canonical");
    link.setAttribute("href", `${window.location.origin}/auth`);
    document.head.appendChild(link);
  }, [mode]);

  useEffect(() => {
    // Check current session and redirect if already logged in
    auth.getSession().then(({ user }) => {
      if (user) navigate("/");
    });

    // Listen for auth state changes
    const { unsubscribe } = auth.onAuthStateChange((user) => {
      if (user) navigate("/");
    });

    return unsubscribe;
  }, [navigate]);

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) return;

    if (mode === "login") {
      const { user, error } = await auth.signIn(email, password);
      if (error) {
        toast({ title: "Login failed", description: error, variant: "destructive" });
        return;
      }
      toast({ title: "Welcome back", description: "Logged in successfully." });
      navigate("/");
    } else {
      const { user, error } = await auth.signUp(email, password);
      if (error) {
        toast({ title: "Sign up failed", description: error, variant: "destructive" });
        return;
      }
      toast({ title: "Account created", description: "You can now log in with your credentials." });
      setMode("login");
    }
  }

  async function handleGoogle() {
    toast({ title: "Coming soon", description: "Google sign-in will be available soon.", variant: "default" });
  }

  return (
    <main className="container max-w-lg py-16">
      <Card className="surface-card">
        <CardHeader>
          <CardTitle>{mode === "login" ? "Login" : "Create your account"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={mode} onValueChange={(v) => setMode(v as any)} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign up</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleEmailAuth} className="space-y-4" aria-label="Login form">
                <div className="space-y-2">
                  <Label htmlFor="email-login">Email</Label>
                  <Input id="email-login" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-login">Password</Label>
                  <Input id="password-login" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full">Login</Button>
              </form>
            </TabsContent>
            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleEmailAuth} className="space-y-4" aria-label="Sign up form">
                <div className="space-y-2">
                  <Label htmlFor="email-signup">Email</Label>
                  <Input id="email-signup" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signup">Password</Label>
                  <Input id="password-signup" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full">Create account</Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <Button variant="secondary" onClick={handleGoogle} className="w-full">Continue with Google</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
