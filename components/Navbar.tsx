"use client";
import Link from "next/link";
import { User } from "lucide-react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";

const Navbar = () => {
  const { isLoaded } = useUser();

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-dark-400/20 bg-background-secondary/80 backdrop-blur-md shadow-lg">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-primary-500 hover:text-accent-500 transition-colors">
              LakshyaAI
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-baseline ml-10 space-x-8">
              {/* Authentication Buttons */}
              <div className="flex items-center gap-3">
                {!isLoaded ? (
                  // Show login button immediately while loading
                  <button className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-dark-900 transition-colors duration-200 bg-primary-500 rounded-lg hover:bg-accent-500 shadow-lg">
                    <User size={16} />
                    Login
                  </button>
                ) : (
                  <>
                    <SignedOut>
                      <SignInButton mode="modal">
                        <button className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-dark-900 transition-colors duration-200 bg-primary-500 rounded-lg hover:bg-accent-500 shadow-lg">
                          <User size={16} />
                          Login
                        </button>
                      </SignInButton>
                    </SignedOut>
                    <SignedIn>
                      <Link
                        href="/dashboard"
                        className="px-3 py-2 text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-accent-500"
                      >
                        Dashboard
                      </Link>
                      <UserButton
                        appearance={{
                          elements: {
                            avatarBox: "w-8 h-8",
                          },
                        }}
                      />
                    </SignedIn>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Authentication */}
          <div className="md:hidden">
            {!isLoaded ? (
              // Show login button immediately while loading
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700">
                <User size={16} />
                Login
              </button>
            ) : (
              <>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700">
                      <User size={16} />
                      Login
                    </button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8",
                      },
                    }}
                  />
                </SignedIn>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
