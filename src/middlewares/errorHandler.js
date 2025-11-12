// middlewares/errorHandler.js
function errorHandler(err, req, res, next) {
  console.error('Erreur non gérée:', err);
  const status = err.statusCode || err.status || 500;
  res.status(status).json({
    status: 'error',
    message: err.message || 'Erreur interne du serveur',
  });
}