export const authorize = (allowedRoles) => (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized: No user role found' });
    return;
  }

  const hasRole = allowedRoles.some((role) => req.user?.role.includes(role));

  if (!hasRole) {
    res.status(403).json({ message: 'Forbidden: Insufficient role' });
    return;
  }

  next();
};
