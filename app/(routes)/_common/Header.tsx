"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import {
  LogOutIcon,
  MoonIcon,
  SunIcon,
  MenuIcon,
  XIcon,
  UserIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useState } from "react";
import Link from "next/link";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

interface NavItem {
  label: string;
  href: string;
}

interface KindeUser {
  given_name?: string | null;
  family_name?: string | null;
  email?: string | null;
  picture?: string | null;
}

/* ------------------------------------------------------------------ */
/* Constants */
/* ------------------------------------------------------------------ */

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/pricing" },
];

/* ------------------------------------------------------------------ */
/* Header */
/* ------------------------------------------------------------------ */

const Header = () => {
  const { user, isLoading, isAuthenticated } = useKindeBrowserClient();
  const { resolvedTheme, setTheme } = useTheme();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /* ---------------------- Helpers ---------------------- */

  const toggleTheme = useCallback(() => {
    if (!resolvedTheme) return;
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  const getUserInitials = useCallback((): string => {
    if (!user) return "U";
    const first = user.given_name?.[0] ?? "";
    const last = user.family_name?.[0] ?? "";
    return first || last ? `${first}${last}` : "U";
  }, [user]);

  const getUserDisplayName = useCallback((): string => {
    if (!user) return "User";
    const fullName = `${user.given_name ?? ""} ${user.family_name ?? ""}`.trim();
    return fullName || user.email?.split("@")[0] || "User";
  }, [user]);

  const typedUser: KindeUser | null = user
    ? {
        given_name: user.given_name ?? null,
        family_name: user.family_name ?? null,
        email: user.email ?? null,
        picture: user.picture ?? null,
      }
    : null;

  /* ---------------------- Render ---------------------- */

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Left */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                {isMobileMenuOpen ? (
                  <XIcon className="h-5 w-5" />
                ) : (
                  <MenuIcon className="h-5 w-5" />
                )}
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-[320px] p-0">
              <MobileMenu
                user={typedUser}
                isAuthenticated={!!isAuthenticated}
                getUserDisplayName={getUserDisplayName}
                getUserInitials={getUserInitials}
                close={() => setIsMobileMenuOpen(false)}
              />
            </SheetContent>
          </Sheet>

          <Logo />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            aria-pressed={resolvedTheme === "dark"}
            disabled={!resolvedTheme}
          >
            {!resolvedTheme ? (
              <Skeleton className="h-5 w-5 rounded-full" />
            ) : resolvedTheme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>

          {isLoading ? (
            <>
              <Skeleton className="hidden md:block h-9 w-20 rounded-md" />
              <Skeleton className="h-9 w-9 rounded-full" />
            </>
          ) : isAuthenticated ? (
            <div className="hidden md:block">
              <DesktopUserDropdown
                user={typedUser}
                getUserDisplayName={getUserDisplayName}
                getUserInitials={getUserInitials}
              />
            </div>
          ) : (
            <div className="hidden md:flex gap-2">
              <LoginLink>
                <Button variant="outline" size="sm">
                  Sign in
                </Button>
              </LoginLink>
              <LoginLink>
                <Button size="sm">Get Started</Button>
              </LoginLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

/* ------------------------------------------------------------------ */
/* Mobile Menu */
/* ------------------------------------------------------------------ */

function MobileMenu({
  user,
  isAuthenticated,
  getUserDisplayName,
  getUserInitials,
  close,
}: {
  user: KindeUser | null;
  isAuthenticated: boolean;
  getUserDisplayName: () => string;
  getUserInitials: () => string;
  close: () => void;
}) {
  return (
    <div className="flex flex-col gap-6 p-4">
      <nav className="flex flex-col gap-4">
        {NAV_ITEMS.map((item) => (
          <SheetClose asChild key={item.href}>
            <Link
              href={item.href}
              onClick={close}
              className="text-lg font-medium"
            >
              {item.label}
            </Link>
          </SheetClose>
        ))}
      </nav>

      {isAuthenticated && user ? (
        <div className="border-t pt-6">
          <div className="flex items-center gap-3 mb-6">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.picture ?? undefined} />
              <AvatarFallback>{getUserInitials()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{getUserDisplayName()}</p>
              {user.email && (
                <p className="text-sm text-muted-foreground">{user.email}</p>
              )}
            </div>
          </div>

          <SheetClose asChild>
            <Link href="/dashboard" onClick={close} className="flex gap-3 py-2">
              <UserIcon className="h-5 w-5" />
              Dashboard
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <LogoutLink className="flex gap-3 py-2 text-destructive">
              <LogOutIcon className="h-5 w-5" />
              Logout
            </LogoutLink>
          </SheetClose>
        </div>
      ) : (
        <div className="border-t pt-6 space-y-3">
          <LoginLink>
            <Button className="w-full">Sign in</Button>
          </LoginLink>
          <LoginLink>
            <Button variant="outline" className="w-full">
              Get Started
            </Button>
          </LoginLink>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop User Dropdown */
/* ------------------------------------------------------------------ */

function DesktopUserDropdown({
  user,
  getUserDisplayName,
  getUserInitials,
}: {
  user: KindeUser | null;
  getUserDisplayName: () => string;
  getUserInitials: () => string;
}) {
  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.picture ?? undefined} />
            <AvatarFallback>{getUserInitials()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <p className="font-medium">{getUserDisplayName()}</p>
          {user.email && (
            <p className="text-xs text-muted-foreground">{user.email}</p>
          )}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className="text-destructive">
          <LogoutLink>
            <LogOutIcon className="mr-2 h-4 w-4" />
            Logout
          </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
