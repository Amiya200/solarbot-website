import { useCallback, useEffect, useState } from "react";
import * as identity from "../lib/identity";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  // On first load, see if a session was saved from a previous visit
  // and check whether it's still valid.
  useEffect(() => {
    const stored = identity.getStoredSession();

    if (!stored?.access_token) {
      setCheckingSession(false);
      return;
    }

    identity
      .getCurrentUser(stored.access_token)
      .then((freshUser) => {
        setAccessToken(stored.access_token);
        setUser(freshUser);
      })
      .catch(() => {
        identity.logout();
      })
      .finally(() => setCheckingSession(false));
  }, []);

  const signup = useCallback(async (email, password) => {
    await identity.signup(email, password);
    // Depending on the site's Identity settings, a new account may need
    // email confirmation before it can log in.
  }, []);

  const login = useCallback(async (email, password) => {
    const session = await identity.login(email, password);
    const freshUser = await identity.getCurrentUser(session.access_token);
    setAccessToken(session.access_token);
    setUser(freshUser);
    return freshUser;
  }, []);

  const logout = useCallback(() => {
    identity.logout();
    setUser(null);
    setAccessToken(null);
  }, []);

  const pairDevice = useCallback(
    async (deviceId) => {
      if (!accessToken) throw new Error("Not logged in.");

      const updated = await identity.updateUserMetadata(accessToken, {
        ...(user?.user_metadata || {}),
        deviceId,
      });

      setUser(updated);
      return updated;
    },
    [accessToken, user]
  );

  return {
    user,
    isLoggedIn: Boolean(user),
    checkingSession,
    signup,
    login,
    logout,
    pairDevice,
  };
}
