import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { apiRouter } from './server/api';

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  // Body parser for JSON and Form payloads
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Global Cross-Origin Resource Sharing (CORS) open for all external callers
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Api-Key, X-Key-Id, X-Pay-Token, *');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  // Mount the public API router
  app.use('/api', apiRouter);

  // Serve static public folder files explicitly if requested
  app.use('/workbench-catalog.json', (req, res) => {
    const catalogPath = path.resolve('public/workbench-catalog.json');
    if (fs.existsSync(catalogPath)) {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      fs.createReadStream(catalogPath).pipe(res);
    } else {
      res.status(404).send('workbench-catalog.json not found');
    }
  });

  if (!isProd) {
    // Development mode: Mount Vite middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: Serve built static files
    app.use(express.static(path.resolve('dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve('dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[API Server] Running at http://0.0.0.0:${PORT}`);
    console.log(`[API Server] Public API Gateway & Stretched DB ready at /api`);
  });
}

startServer().catch((err) => {
  console.error('[API Server] Failed to start:', err);
  process.exit(1);
});
