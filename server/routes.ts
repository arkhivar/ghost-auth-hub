import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import session from "express-session";
import bcrypt from "bcrypt";

export async function registerRoutes(app: Express): Promise<Server> {
  // Configure session middleware
  app.use(session({
    secret: process.env.SESSION_SECRET || 'dev-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: false, // Set to true in production with HTTPS
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));

  // Authentication routes
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(email);
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create user
      const user = await storage.createUser({ username: email, password: hashedPassword });
      
      (req.session as any).userId = user.id;
      (req.session as any).userEmail = email;
      
      res.json({ user: { id: user.id, email: email } });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ error: "Signup failed" });
    }
  });

  app.post("/api/auth/signin", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Find user
      const user = await storage.getUserByUsername(email);
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      // Check password
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      (req.session as any).userId = user.id;
      (req.session as any).userEmail = email;
      
      res.json({ user: { id: user.id, email: email } });
    } catch (error) {
      console.error("Signin error:", error);
      res.status(500).json({ error: "Signin failed" });
    }
  });

  app.post("/api/auth/signout", async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Could not log out" });
      }
      res.json({ success: true });
    });
  });

  app.get("/api/auth/session", async (req, res) => {
    const session = req.session as any;
    if (session.userId) {
      res.json({ 
        user: { 
          id: session.userId, 
          email: session.userEmail 
        } 
      });
    } else {
      res.json({ user: null });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
