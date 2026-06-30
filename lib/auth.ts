export interface User {
  userId: number;
  personId: number;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  status: "active" | "inactive";
}

export interface SignUpFieldErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

export interface LoginFieldErrors {
  email?: string;
  password?: string;
}

export interface Session {
  user: User;
  token: string;
}

export interface SignUpCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

const SESSION_KEY = "faalupega-session";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
  "http://localhost:3001";

export function validateEmail(email: string): string | null {
  const trimmed = email.trim();
  if (!trimmed) {
    return "Email is required.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return "Enter a valid email address.";
  }
  return null;
}

export function validateFirstName(firstName: string): string | null {
  const trimmed = firstName.trim();
  if (!trimmed) {
    return "First name is required.";
  }
  if (trimmed.length < 2) {
    return "First name must be at least 2 characters.";
  }
  return null;
}

export function validateLastName(lastName: string): string | null {
  const trimmed = lastName.trim();
  if (!trimmed) {
    return "Last name is required.";
  }
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) {
    return "Password is required.";
  }
  if (password.length < 8) {
    return "Password must be at least 8 characters.";
  }
  return null;
}

export function validateSignUpCredentials(
  credentials: SignUpCredentials,
): SignUpFieldErrors {
  const errors: SignUpFieldErrors = {};
  const firstNameError = validateFirstName(credentials.firstName);
  const lastNameError = validateLastName(credentials.lastName);
  const emailError = validateEmail(credentials.email);
  const passwordError = validatePassword(credentials.password);
  if (firstNameError) errors.firstName = firstNameError;
  if (lastNameError) errors.lastName = lastNameError;
  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;
  return errors;
}

export function validateLoginCredentials(
  credentials: LoginCredentials,
): LoginFieldErrors {
  const errors: LoginFieldErrors = {};
  const emailError = validateEmail(credentials.email);
  const passwordError = validatePassword(credentials.password);
  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;
  return errors;
}

function readStoredSession(): Session | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export function getSession(): User | null {
  return readStoredSession()?.user ?? null;
}

export function getToken(): string | null {
  return readStoredSession()?.token ?? null;
}

function persistSession(session: Session): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

async function parseErrorMessage(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as {
      message?: string | string[];
    };
    if (Array.isArray(body.message)) {
      return body.message.join(" ");
    }
    if (body.message) {
      return body.message;
    }
  } catch {
    // ignore parse errors
  }
  return "Something went wrong. Please try again.";
}

export async function signUp(
  credentials: SignUpCredentials,
): Promise<{ session: Session } | { error: string }> {
  const payload = {
    firstName: credentials.firstName.trim(),
    lastName: credentials.lastName.trim(),
    email: credentials.email.trim(),
    password: credentials.password,
  };
  const errors = validateSignUpCredentials(payload);
  if (errors.firstName || errors.lastName || errors.email || errors.password) {
    return {
      error:
        errors.firstName ??
        errors.lastName ??
        errors.email ??
        errors.password ??
        "Invalid input.",
    };
  }

  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return { error: await parseErrorMessage(response) };
    }

    const session = (await response.json()) as Session;
    persistSession(session);
    return { session };
  } catch {
    return { error: "Unable to reach the server. Is the API running?" };
  }
}

export async function login(
  credentials: LoginCredentials,
): Promise<{ session: Session } | { error: string }> {
  const payload = {
    email: credentials.email.trim(),
    password: credentials.password,
  };
  const errors = validateLoginCredentials(payload);
  if (errors.email || errors.password) {
    return {
      error: errors.email ?? errors.password ?? "Invalid input.",
    };
  }

  try {
    const response = await fetch(`${API_URL}/sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return { error: await parseErrorMessage(response) };
    }

    const session = (await response.json()) as Session;
    persistSession(session);
    return { session };
  } catch {
    return { error: "Unable to reach the server. Is the API running?" };
  }
}

export async function fetchCurrentUser(): Promise<User | null> {
  const token = getToken();
  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/sessions/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      clearSession();
      return null;
    }

    const user = (await response.json()) as User;
    persistSession({ user, token });
    return user;
  } catch {
    return getSession();
  }
}

export async function logoutRemote(): Promise<void> {
  const token = getToken();
  if (token) {
    try {
      await fetch(`${API_URL}/sessions/me`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      // ignore network errors on logout
    }
  }
  clearSession();
}
