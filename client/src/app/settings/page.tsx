"use client";

import React from "react";
import Header from "../(components)/Header";
import { text } from "stream/consumers";

const Settings = () => {
  const userSettings = {
    username: "John doe",
    email: "john.doe@example.com",
    teamName: "Development Team",
    roleName: "Developer",
  };

  const labelStyles = "block text-sm font-medium dark:text-white";
  const textStyle =
    "mt-3 block w-1/2 border border-gray-300 rounded-md shadow-sm p-2 dark:text-white";

  return (
    <div className="p-6">
      <Header name="Settings" />
      <div className="space-y-4">
        <div className="">
          <label className={labelStyles}>Username</label>
          <div className={textStyle}>{userSettings.username}</div>
        </div>

        <div className="">
          <label className={labelStyles}>Email</label>
          <div className={textStyle}>{userSettings.email}</div>
        </div>

        <div className="">
          <label className={labelStyles}>Team</label>
          <div className={textStyle}>{userSettings.teamName}</div>
        </div>

        <div className="">
          <label className={labelStyles}>Role</label>
          <div className={textStyle}>{userSettings.roleName}</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
