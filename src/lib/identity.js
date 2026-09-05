/**
 * Thin wrapper around Netlify Identity's underlying GoTrue REST API.
 *
 * Netlify Identity must be enabled on this site for these calls to work:
 * Netlify dashboard -> Site configuration -> Identity -> Enable Identity.
 *
 * We call GoTrue directly (instead of the netlify-identity-widget package)
 * so the login/signup UI can be fully custom-styled to match the site.
 */

const IDENTITY_URL = "/.netlify/identity";
const STORAGE_KEY = "solarbot-auth";

function saveSession(session) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

function clearSession() {
  window.localStorage.removeItem(STORAGE_KEY);
}

export function getStoredSession() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const payload = isJson ? await response.json().catch(() => ({})) : {};

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        "Login isn't set up on this site yet. The site owner needs to " +
        "enable Identity in the Netlify dashboard (Site configuration -> Identity)."
      );
    }

    throw new Error(
      payload.error_description ||
        payload.msg ||
        payload.error ||
        `Something went wrong (${response.status}).`
    );
  }

  return payload;
}

export async function signup(email, password) {
  const response = await fetch(`${IDENTITY_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return parseResponse(response);
}

export async function login(email, password) {
  const response = await fetch(`${IDENTITY_URL}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "password",
      username: email,
      password,
    }),
  });

  const session = await parseResponse(response);
  saveSession(session);
  return session;
}

export async function getCurrentUser(accessToken) {
  const response = await fetch(`${IDENTITY_URL}/user`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return parseResponse(response);
}

export async function updateUserMetadata(accessToken, data) {
  const response = await fetch(`${IDENTITY_URL}/user`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  });

  return parseResponse(response);
}

export function logout() {
  clearSession();
}
