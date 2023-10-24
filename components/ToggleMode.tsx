import * as React from "react";
import { useTheme } from "next-themes";
import { Switch } from "./ui/switch";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (isChecked: boolean) => {
    
    setTheme(isChecked ? "dark" : "light");
  };

  return (
    <Switch
      checked={theme === "dark"} 
      onCheckedChange={handleThemeChange} 
    />
  );
}
