"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { nav, site } from "@/lib/site";
import Logo from "./Logo";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Solid header after scroll; transparent over hero at top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change + lock body scroll while drawer open.
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const solid = scrolled || mobileOpen || openMenu !== null;

  return (
    <>
    <header
      onMouseLeave={() => setOpenMenu(null)}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? "bg-navy-800/95 backdrop-blur supports-[backdrop-filter]:bg-navy-800/85 shadow-[0_1px_0_rgba(255,255,255,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Link
          href="/"
          className="shrink-0 text-white"
          aria-label={`${site.name} home`}
        >
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden lg:flex items-center gap-1">
          {nav.map((group) => (
            <div
              key={group.title}
              onMouseEnter={() => setOpenMenu(group.title)}
              className="relative"
            >
              <Link
                href={group.href}
                aria-expanded={openMenu === group.title}
                className="flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium text-white/85 hover:text-white transition-colors"
              >
                {group.title}
                {group.children && (
                  <ChevronDown
                    size={15}
                    className={`transition-transform ${
                      openMenu === group.title ? "rotate-180" : ""
                    }`}
                  />
                )}
              </Link>
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link href="/contact" className="text-sm font-medium text-white/85 hover:text-white">
            Contact
          </Link>
          <Link href="/quote" className="btn btn-primary">
            Request a Quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-md text-white hover:bg-white/10"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Desktop mega panel */}
      {nav.map((group) =>
        group.children && openMenu === group.title ? (
          <div
            key={group.title}
            className="hidden lg:block absolute inset-x-0 top-20 border-t border-white/10 bg-navy-800/98 backdrop-blur"
          >
            <div className="container-page py-8">
              <div className="mb-4 flex items-baseline justify-between">
                <p className="eyebrow text-amber-400">{group.title}</p>
                <Link
                  href={group.href}
                  className="text-sm text-white/70 hover:text-white"
                >
                  View all →
                </Link>
              </div>
              <ul className="grid grid-cols-2 gap-x-8 gap-y-1 xl:grid-cols-3">
                {group.children.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      className="group flex items-center gap-2 rounded-md px-3 py-2.5 text-[0.95rem] text-white/80 hover:bg-white/5 hover:text-white transition-colors"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500/70 transition-transform group-hover:scale-125" />
                      {child.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null
      )}

    </header>

      {/* Mobile drawer — rendered OUTSIDE <header> so it's positioned relative
          to the viewport. (A backdrop-filter on the header would otherwise make
          it the containing block and collapse this fixed panel to 0 height.) */}
      <div
        className={`lg:hidden fixed inset-x-0 top-20 bottom-0 z-40 overflow-y-auto bg-navy-800 transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "translate-x-full pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <nav aria-label="Mobile" className="container-page py-6">
          {nav.map((group) => (
            <MobileGroup key={group.title} group={group} />
          ))}
          <div className="mt-6 flex flex-col gap-3">
            <Link href="/quote" className="btn btn-primary w-full">
              Request a Quote
            </Link>
            <Link href="/contact" className="btn btn-ghost w-full">
              Contact Us
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}

function MobileGroup({ group }: { group: (typeof nav)[number] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <div className="flex items-center">
        <Link
          href={group.href}
          className="flex-1 py-4 text-lg font-semibold text-white"
        >
          {group.title}
        </Link>
        {group.children && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={`Toggle ${group.title}`}
            aria-expanded={open}
            className="inline-flex h-11 w-11 items-center justify-center text-white/70"
          >
            <ChevronDown
              size={20}
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
        )}
      </div>
      {group.children && open && (
        <ul className="pb-3">
          {group.children.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                className="block py-2.5 pl-3 text-white/75 hover:text-white"
              >
                {child.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
