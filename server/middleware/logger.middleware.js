import { logger } from '../config/logger.config.js';

export const loggerMiddleware = (req, res, next) => {
  const start = Date.now();

  // Log request details
  logger.info('Incoming request', {
    method: req.method,
    url: req.url,
    // ip: req.ip,
    // headers: req.headers,
    // body: req.body,
  });

  const originalSend = res.send;
  res.send = (data) => {
    const responseTime = Date.now() - start;
    logger.info('Outgoing response', {
      status: res.statusCode,
      responseTime: responseTime,
      //   body: data,
    });
    return originalSend.call(res, data); // Return the result of the original res.send
  };

  next();
};
