export const TOKEN_KEY = "access-token";
export const CLIENT = "client";
export const UID = "uid";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getClient = () => localStorage.getItem(CLIENT);
export const getUid = () => localStorage.getItem(UID);

export const login = (token, client, uid) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(CLIENT, client);
  localStorage.setItem(UID, uid);

};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(CLIENT);
  localStorage.removeItem(UID);
};

export const config = {
  headers: {
      'Content-Type': 'application/json',
      'access-token': getToken(),
      'client': getClient(),
      'uid': getUid()
  }
};