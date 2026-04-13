/**
 * Shared type definitions for the RiseCoder application.
 */

import type { Store, Reducer } from '@reduxjs/toolkit';
import type { Session, User, AuthChangeEvent } from '@supabase/supabase-js';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

/* ─── Redux / Store ────────────────────────────────────── */

export interface InjectedReducersMap {
  [key: string]: Reducer;
}

export interface AppStore extends Store {
  injectedReducers: InjectedReducersMap;
}

/* ─── App State ────────────────────────────────────────── */

export interface UserData {
  repositories: Repo[] | false;
}

export interface AppState {
  loading: boolean;
  error: boolean | Error;
  currentUser: string | false;
  userData: UserData;
}

export interface LanguageState {
  locale: string;
}

export interface RootState {
  language: LanguageState;
  global?: AppState;
  [key: string]: unknown;
}

/* ─── Redux Actions ────────────────────────────────────── */

export interface LoadReposAction {
  type: 'risecoder/App/LOAD_REPOS';
  [key: string]: unknown;
}

export interface LoadReposSuccessAction {
  type: 'risecoder/App/LOAD_REPOS_SUCCESS';
  repos: Repo[];
  username: string;
  [key: string]: unknown;
}

export interface LoadReposErrorAction {
  type: 'risecoder/App/LOAD_REPOS_ERROR';
  error: Error;
  [key: string]: unknown;
}

export type AppAction =
  | LoadReposAction
  | LoadReposSuccessAction
  | LoadReposErrorAction;

export interface ChangeLocaleAction {
  type: 'risecoder/LanguageToggle/CHANGE_LOCALE';
  locale: string;
  [key: string]: unknown;
}

/* ─── Auth ─────────────────────────────────────────────── */

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (credentials: AuthCredentials) => Promise<unknown>;
  signIn: (credentials: AuthCredentials) => Promise<unknown>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<unknown>;
  updatePassword: (newPassword: string) => Promise<unknown>;
}

export type AuthStateChangeCallback = (
  event: AuthChangeEvent,
  session: Session | null,
) => void;

/* ─── Navigation ───────────────────────────────────────── */

export interface NavChild {
  id: string;
  label: string;
  path: string;
  desc?: string;
}

export interface NavSectionConfig {
  id: string;
  label: string;
  icon: IconDefinition;
  basePath: string;
  children: NavChild[];
  color?: string;
}

/* ─── Sidebar ──────────────────────────────────────────── */

export interface SidebarContextValue {
  collapsed: boolean;
  toggle: () => void;
}

/* ─── Theme ────────────────────────────────────────────── */

export type ThemeMode = 'dark' | 'light';

export interface ThemeContextValue {
  mode: ThemeMode;
  toggleTheme: () => void;
}

/* ─── i18n ─────────────────────────────────────────────── */

export type TranslationMessages = Record<string, Record<string, string>>;

/* ─── API / Repos ──────────────────────────────────────── */

export interface Repo {
  full_name: string;
  name: string;
}

/* ─── Design Tokens ────────────────────────────────────── */

export interface ColorScale {
  [key: number]: string;
}

export interface DesignColors {
  brand: ColorScale;
  surface: ColorScale;
  neutral: ColorScale;
  semantic: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  category: {
    frontend: string;
    backend: string;
    database: string;
    devops: string;
  };
}

export interface TypographyScaleEntry {
  size: string;
  lineHeight: string;
  weight: number;
}

export interface DesignTypography {
  fontFamily: string;
  scale: Record<string, TypographyScaleEntry>;
}

export interface DesignSpacing {
  [key: number]: number;
}

export interface DesignMotion {
  duration: Record<string, string>;
  easing: Record<string, string>;
}

export interface DesignLayout {
  sidebarWidth: number;
  sidebarCollapsedWidth: number;
  headerHeight: number;
  maxContentWidth: number;
  borderRadius: Record<string, number>;
}

/* ─── Request Utility ──────────────────────────────────── */

export interface RequestError extends Error {
  response?: Response;
}
