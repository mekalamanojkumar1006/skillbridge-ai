import path from "path";
import express from "express";
import { createServer as createViteServer } from "vite";
import app from "./api/index.js";

const PORT = process.env.PORT || 3000;

async function startLocalServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");

    app.use((_req: any, res: any, next: any) => {
      res.setHeader("X-Robots-Tag", "index, follow");
      next();
    });

    app.get("/robots.txt", (_req: any, res: any) => {
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=86400");
      res.sendFile(path.join(distPath, "robots.txt"));
    });

    app.get("/sitemap.xml", (_req: any, res: any) => {
      res.setHeader("Content-Type", "application/xml; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=86400");
      res.sendFile(path.join(distPath, "sitemap.xml"));
    });

    app.use(express.static(distPath, {
      setHeaders: (res: any, filePath: string) => {
        if (filePath.endsWith(".html")) {
          res.setHeader("Cache-Control", "no-cache");
        } else {
          res.setHeader("Cache-Control", "public, max-age=604800, immutable");
        }
      }
    }));

    app.get("*", (_req: any, res: any) => {
      res.setHeader("Cache-Control", "no-cache");
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, () => {
    console.log(`Local dev server running on http://localhost:${PORT}`);
  });
}

startLocalServer();
