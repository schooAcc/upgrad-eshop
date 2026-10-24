const decodeToken = (token) => {
  try {
    const parts = token.split('.');
    if (parts.length < 2) {
      return null;
    }
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
    return JSON.parse(atob(padded));
  } catch (error) {
    return null;
  }
};

const normalizeRole = (value) => {
  if (!value) {
    return 'USER';
  }
  const text = Array.isArray(value) ? value.join(' ') : String(value);
  return text.toUpperCase().includes('ADMIN') ? 'ADMIN' : 'USER';
};

const getHeader = (headers, name) => {
  if (!headers) {
    return null;
  }
  if (typeof headers.get === 'function') {
    const value = headers.get(name);
    if (value) {
      return value;
    }
  }
  const key = Object.keys(headers).find((header) => header.toLowerCase() === name);
  return key ? headers[key] : null;
};

export const readLoginResponse = (response) => {
  const body = response && response.data && typeof response.data === 'object' ? response.data : {};
  const headers = (response && response.headers) || {};
  let token = getHeader(headers, 'x-auth-token');
  if (!token) {
    token = body.token || body['x-auth-token'] || body.jwt || null;
  }
  const claims = decodeToken(token || '');
  let role = body.role || body.roles || null;
  if (!role && claims) {
    role = claims.role || claims.roles || null;
    if (!role && Array.isArray(claims.authorities) && claims.authorities.length) {
      role = claims.authorities.map((authority) => (authority && authority.authority) || authority);
    }
  }
  if (!role && claims) {
    const { sub, ...rest } = claims;
    if (JSON.stringify(rest).toUpperCase().includes('ADMIN')) {
      role = 'ADMIN';
    }
  }
  return {
    token,
    role: normalizeRole(role),
    firstName: body.firstName || (claims && claims.sub) || '',
  };
};
