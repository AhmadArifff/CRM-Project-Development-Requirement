import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/auth.routes';
import leadsRoutes from './routes/leads.routes';
import dealsRoutes from './routes/deals.routes';
import tasksRoutes from './routes/tasks.routes';
import landingRoutes from './routes/landing.routes';
import aiRoutes from './routes/ai.routes';

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Security & Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Rate Limiter for API endpoints
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // max 300 requests per 15 minutes
  message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use('/api', apiLimiter);

// Health Check Endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    service: 'DevPulse Studio Backend API',
    version: 'v1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// API Routes Mounting
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/leads', leadsRoutes);
app.use('/api/v1/deals', dealsRoutes);
app.use('/api/v1/tasks', tasksRoutes);
app.use('/api/v1/landing-content', landingRoutes);
app.use('/api/v1/ai', aiRoutes);

// Global 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found.` });
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('❌ Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`🚀 DevPulse Studio Express API Server running on port ${PORT}`);
});

export default app;
