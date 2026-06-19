export interface User {
  name: string;
  email: string;
}

export interface AuthFieldErrors {
  name?: string;
  email?: string;
}

const USERS_KEY = "faalupega-users";
const SESSION_KEY = "faalupega-session";

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

export function validateName(name: string): string | null {
  const trimmed = name.trim();
  if (!trimmed) {
    return "Name is required.";
  }
  if (trimmed.length < 2) {
    return "Name must be at least 2 characters.";
  }
  return null;
}

export function validateSignUp(name: string, email: string): AuthFieldErrors {
  const errors: AuthFieldErrors = {};
  const nameError = validateName(name);
  const emailError = validateEmail(email);
  if (nameError) errors.name = nameError;
  if (emailError) errors.email = emailError;
  return errors;
}

export function validateLogin(name: string, email: string): AuthFieldErrors {
  const errors: AuthFieldErrors = {};
  const nameError = validateName(name);
  const emailError = validateEmail(email);
  if (nameError) errors.name = nameError;
  if (emailError) errors.email = emailError;
  return errors;
}

function readUsers(): User[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as User[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUsers(users: User[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getSession(): User | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function setSession(user: User): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function signUp(name: string, email: string): { user: User } | { error: string } {
  const errors = validateSignUp(name, email);
  if (errors.name || errors.email) {
    return { error: errors.name ?? errors.email ?? "Invalid input." };
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user: User = { name: name.trim(), email: normalizedEmail };
  const users = readUsers();

  if (users.some((u) => u.email === normalizedEmail)) {
    return { error: "An account with this email already exists." };
  }

  writeUsers([...users, user]);
  setSession(user);
  return { user };
}

export function login(
  name: string,
  email: string,
): { user: User } | { error: string } {
  const errors = validateLogin(name, email);
  if (errors.name || errors.email) {
    return { error: errors.name ?? errors.email ?? "Invalid input." };
  }

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedName = name.trim().toLowerCase();
  const user = readUsers().find((u) => u.email === normalizedEmail);

  if (!user) {
    return { error: "No account found with this email. Please sign up first." };
  }

  if (user.name.toLowerCase() !== normalizedName) {
    return { error: "Name does not match this account." };
  }

  setSession(user);
  return { user };
}
