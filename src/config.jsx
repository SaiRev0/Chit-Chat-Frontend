// @mui
import { enUS } from "@mui/material/locale";

// routes
import { PATH_DASHBOARD } from "./routes/paths";

export const BASE_URL = import.meta.env.VITE_Backend;

export const defaultSettings = {
  themeMode: "dark",
  themeDirection: "ltr",
  themeContrast: "default",
  themeLayout: "horizontal",
  themeColorPresets: "default",
  themeStretch: false,
};

export const NAVBAR = {
  BASE_WIDTH: 260,
  DASHBOARD_WIDTH: 280,
  DASHBOARD_COLLAPSE_WIDTH: 88,
  //
  DASHBOARD_ITEM_ROOT_HEIGHT: 48,
  DASHBOARD_ITEM_SUB_HEIGHT: 40,
  DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32,
};

export const defaultLang = {
  label: "English",
  value: "en",
  systemValue: enUS,
  icon: "/assets/icons/flags/ic_flag_en.svg",
};

// DEFAULT ROOT PATH
export const DEFAULT_PATH = PATH_DASHBOARD.general.app; // as '/app'
