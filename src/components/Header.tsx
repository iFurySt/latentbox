"use client";

import Link from "next/link";
import { clsx } from "clsx";
import React, { Fragment, useEffect, useState } from "react";
import {
  ChevronDownIcon,
  Cross1Icon,
  ArrowTopRightIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { transitionXl, transitionMd, transitionLg } from "@/lib/animations";
import { LatentBoxLogo } from "@/components/Logos";
import { Container, ContainerFull } from "@/components/Containers";

import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { usePathname } from "@/navigation";
import { trackEvent, TrackLink } from "@/components/TrackComponents";
import { useTranslations } from "next-intl";
import { DocsSidebarNav } from "@/components/DocsSideNav";
import { NavGroup, useNavData } from "@/lib/docs_navigation";

const scrollTopAtom = atom(true);
const menuOpenAtom = atom(false);

interface HeaderLinkProps {
  name: string;
  href: string;
  target?: string;
  onClick?: () => void;
}

interface HeaderProps {
  links: {
    name: string;
    href: string;
  }[];
}

function Logo(props: { ext: string }) {
  const setMenuOpen = useSetAtom(menuOpenAtom);
  return (
    <div className="overflow-hidden">
      <div>
        <TrackLink
          trackValue={["logo", "header"]}
          href="/"
          className="px-2 -mx-2 flex h-14 items-center"
          onClick={() => setMenuOpen(false)}
        >
          <LatentBoxLogo className="h-9" ext={props.ext} />
        </TrackLink>
      </div>
    </div>
  );
}

export function BorderBottom() {
  const isTop = useAtomValue(scrollTopAtom);
  return (
    <motion.div
      initial={{
        opacity: isTop ? 0 : 1,
      }}
      animate={{
        opacity: isTop ? 0 : 1,
      }}
      className="absolute bottom-0 left-0 h-[1px] w-full bg-foreground/10 translate-y-[1px]"
    />
  );
}

function MobileNavItem(props: HeaderLinkProps) {
  return (
    <li>
      <TrackLink
        trackValue={["mobile_nav", props.name]}
        href={props.href}
        target={props.target}
        onClick={props.onClick}
        className="py-1 font-bold text-xl flex items-center"
      >
        {props.name}
        {props.target && <ArrowTopRightIcon className="w-5 h-5 ml-2" />}
      </TrackLink>
    </li>
  );
}

function MobileNavigation(
  props: HeaderProps & { navigation: NavGroup[] } & React.ComponentPropsWithoutRef<"div">,
) {

  const [menuOpen, setMenuOpen] = useAtom(menuOpenAtom);
  const isTop = useAtomValue(scrollTopAtom);

  return (
    <>
      <div
        className={clsx(
          "fixed top-0 z-20 w-full h-14 flex md:hidden items-center justify-between px-6 _lg:px-12 break-words transition",
          props.className,
          isTop ? "" : "bg-background",
        )}
      >
        <Logo ext="mobile" />
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              trackEvent("toggle_menu", { to: !menuOpen });
              setMenuOpen(!menuOpen);
            }}
          >
            {!menuOpen ? (
              <Bars3Icon className="h-6 w-6 stroke-foreground" />
            ) : (
              <XMarkIcon className="h-6 w-6 text-foreground" />
            )}
          </Button>
          {/*<div className="w-3"></div>*/}
        </div>
        <BorderBottom />
      </div>
      <div className="lg:hidden">
        <motion.div
          className={clsx(
            "fixed z-10 w-full top-0 left-0 bg-background overflow-hidden",
            // menuOpen ? "block" : "hidden",
          )}
          initial={{
            height: 56,
            opacity: 0,
          }}
          animate={{
            height: menuOpen ? "100%" : 56,
            opacity: menuOpen ? 1 : 0,
          }}
          transition={transitionLg}
        >
          <div className={clsx("w-full h-screen top-0 left-0 flex flex-col")}>
            <HeaderPadding />
            <motion.div
              className="grow relative"
              animate={{
                y: menuOpen ? 0 : -20,
                // opacity: menuOpen ? 1 : 0,
              }}
              transition={transitionLg}
            >
              <div className="absolute w-full h-full top-0 left-0 overflow-y-auto px-6 lg:px-12 py-6">
                <nav className="">
                  <ul className="_-my-2 text-base text-zinc-800 dark:text-zinc-200">
                    {props.links.map((item, index) => (
                      <MobileNavItem
                        key={"mobile_nav_" + index}
                        {...item}
                        onClick={() => setMenuOpen(false)}
                      ></MobileNavItem>
                    ))}
                  </ul>
                </nav>
                <div className="h-6" />
                <DocsSidebarNav items={props.navigation} onClick={() => setMenuOpen(false)}/>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

function NavItem(props: HeaderLinkProps) {
  let isActive = usePathname() === props.href;

  return (
    <li>
      <TrackLink
        trackValue={["desktop_nav", props.name]}
        href={props.href}
        target={props.target}
        className={clsx(
          "relative flex items-center px-3 py-2 transition",
          isActive
            ? "text-foreground font-semibold"
            : "text-zinc-600 dark:text-zinc-400",
        )}
      >
        {props.name}
        {props.target && <ArrowTopRightIcon className="w-4 h-4 ml-1" />}
      </TrackLink>
    </li>
  );
}

function DesktopNavigation(
  props: HeaderProps & React.ComponentPropsWithoutRef<"nav">,
) {
  const isTop = useAtomValue(scrollTopAtom);
  return (
    <div
      className={clsx(
        "fixed top-0 z-20 w-full hidden md:flex break-words transition",
        props.className,
        isTop ? "" : "bg-background",
      )}
    >
      <ContainerFull>
        <div className="h-14 flex items-center justify-between">
          <Logo ext="desktop" />
          <div className="flex items-center">
            <nav>
              <ul className="flex text-sm _font-medium text-zinc-800 dark:text-zinc-200 items-center">
                {props.links.map((item, index) => (
                  <NavItem key={index} {...item}></NavItem>
                ))}
              </ul>
            </nav>
            {/*<div className="w-3"></div>*/}
          </div>
          <BorderBottom />
        </div>
      </ContainerFull>
    </div>
  );
}

export function Header(props: { navigation: NavGroup[] }) {
  const t = useTranslations("header");
  const headerLinks = [
    // {
    //   name: "Docs",
    //   href: "/docs",
    // },
    {
      name: t("docs"),
      href: "/docs",
    },
    {
      name: "Discord",
      href: "https://discord.gg/V9CNuqYfte",
      target: "_blank",
    },
    {
      name: "GitHub",
      href: "https://github.com/latentcat/latentbox",
      target: "_blank",
    },
  ];

  const setIsTop = useSetAtom(scrollTopAtom);

  useEffect(() => {
    function handleScroll() {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsTop(scrollTop <= 0);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <MobileNavigation links={headerLinks} navigation={props.navigation} />
      <DesktopNavigation links={headerLinks} />
    </>
  );
}

export function HeaderPadding() {
  return <div className="h-14" />;
}
