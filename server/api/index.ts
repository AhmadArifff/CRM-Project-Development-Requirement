import app from '../index';

let initError: any = null;

export default function handler(req: any, res: any) {
  if (initError) {
    return res.status(500).json({
      success: false,
      error: 'Serverless Function Initialization Error',
      message: initError.message,
    });
  }

  if (typeof app !== 'function') {
    return res.status(500).json({
      success: false,
      error: 'App Configuration Error',
      message: 'Express app is not exported properly',
    });
  }

  return app(req, res);
}
