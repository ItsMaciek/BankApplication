const jwt = require('jsonwebtoken');

// Sekret używany do podpisywania tokenów
const JWT_SECRET = 'your_jwt_secret'; // Powinno być przechowywane w pliku konfiguracyjnym lub zmiennej środowiskowej

const auth = (req, res, next) => {
  const token = req.header('Authorization') ? req.header('Authorization').replace('Bearer ', '') : null;
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Zakładając, że token zawiera informacje o użytkowniku
    next();
  } catch (ex) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

module.exports = auth;
