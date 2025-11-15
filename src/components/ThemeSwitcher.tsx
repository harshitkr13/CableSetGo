import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Palette, Check } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: "purple" as const, label: "Purple", color: "hsl(270 91% 65%)" },
    { value: "blue" as const, label: "Blue", color: "hsl(210 100% 60%)" },
    { value: "pink" as const, label: "Pink", color: "hsl(330 85% 65%)" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Palette className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.value}
            onClick={() => setTheme(t.value)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full border-2 border-border"
                style={{ backgroundColor: t.color }}
              />
              <span>{t.label}</span>
            </div>
            {theme === t.value && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
