"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import {
  AlertCircleIcon,
  AlertOctagonIcon,
  AlertTriangleIcon,
  BriefcaseIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  HomeIcon,
  Icon,
  Layers3Icon,
  LockIcon,
  LucideIcon,
  SearchIcon,
  SettingsIcon,
  ShieldAlertIcon,
  UserIcon,
  UsersIcon,
  XCircleIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);

  const dispatch = useAppDispatch();

  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const sidebarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl transition-all duration-400 h-full z-40 dark:bg-black  sidebarhidden overflow-y-auto bg-white ${isSidebarCollapsed ? "w-0 hidden" : "w-64"} `;

  return (
    <div className={sidebarClassNames}>
      <div className="sidebar flex h-[100%] w-full flex-col justify-start">
        {/*----- Top Logo -----*/}
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="text-xl font-bold uppercase text-gray-800 dark:text-white">
            planflow
          </div>

          {isSidebarCollapsed ? null : (
            <button
              className="py-3"
              onClick={() =>
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
              }
            >
              <XCircleIcon className="h-6 w-6 text-gray-800 hover:text-gray-600 dark:text-white dark:hover:text-gray-300" />
            </button>
          )}
        </div>

        {/*---- Team -----*/}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          <Image src="/planning.png" alt="logo" width={40} height={40} />
          <div className="">
            <h3 className="text-md font-bold uppercase tracking-wide dark:text-gray-200">
              pm team
            </h3>
            <div className="mt-1 flex items-start gap-1">
              <LockIcon className="mt-[0.1rem] h-4 w-4 text-gray-500 dark:text-gray-400" />
              <p className="text-sm text-gray-500">Private</p>
            </div>
          </div>
        </div>

        {/*----- NavBarLinks -----*/}
        <nav className="z-10 w-full">
          <SidebarLink icon={HomeIcon} label="Home" href="/" />
          <SidebarLink icon={BriefcaseIcon} label="Timeline" href="/timeline" />
          <SidebarLink icon={SearchIcon} label="Search" href="/search" />
          <SidebarLink icon={UserIcon} label="Users" href="/users" />
          <SidebarLink icon={UsersIcon} label="Teams" href="/teams" />
          <SidebarLink icon={SettingsIcon} label="Settings" href="/settings" />
        </nav>

        {/*------ Project Lists -------*/}
        <button
          onClick={() => setShowProjects((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-600"
        >
          <span className="text-[14px] tracking-wide">Projects</span>
          {showProjects ? (
            <ChevronUpIcon className="h-6 w-6" />
          ) : (
            <ChevronDownIcon className="h-6 w-6" />
          )}
        </button>

        {/*------ Priority Lists -------*/}
        <button
          onClick={() => setShowPriority((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-600"
        >
          <span className="text-[14px] tracking-wide">Priority</span>
          {showPriority ? (
            <ChevronUpIcon className="h-6 w-6" />
          ) : (
            <ChevronDownIcon className="h-6 w-6" />
          )}
        </button>
        {showPriority && (
          <>
            <SidebarLink
              icon={AlertCircleIcon}
              label="Urgent"
              href="/priority/urgent"
            />
            <SidebarLink
              icon={ShieldAlertIcon}
              label="High"
              href="/priority/high"
            />
            <SidebarLink
              icon={AlertTriangleIcon}
              label="Medium"
              href="/priority/medium"
            />
            <SidebarLink
              icon={AlertOctagonIcon}
              label="Low"
              href="/priority/low"
            />
            <SidebarLink
              icon={Layers3Icon}
              label="Backlog"
              href="/priority/backlog"
            />
          </>
        )}
      </div>
    </div>
  );
};

// ------ SidebarLinks ------ //

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
  const pathname = usePathname();

  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-200 dark:bg-black dark:hover:bg-gray-600 ${isActive ? "bg-gray-100 text-white dark:bg-gray-700" : ""} justify-start px-5 py-3`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-[100%] w-[4px] bg-blue-500" />
        )}

        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-50" />

        <span className={`font-medium text-gray-800 dark:text-gray-50`}>
          {label}
        </span>
      </div>
    </Link>
  );
};

export default Sidebar;
