"use client";

import { useSearchQuery } from "@/state/api";
import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import Header from "../(components)/Header";
import TaskCard from "../(components)/TaskCard";
import ProjectCard from "../(components)/ProjectCard";
import UserCard from "../(components)/UserCard";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: searchResults,
    isLoading,
    isError,
  } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 2,
  });

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    500,
  );

  useEffect(() => {
    return handleSearch.cancel;
  }, [handleSearch.cancel]);

  return (
    <div className="p-8">
      <Header name="Search" />

      <div className="">
        <input
          type="text"
          placeholder="Search..."
          className="w-1/2 rounded border p-3 shadow focus:outline-none dark:border-dark-secondary dark:bg-gray-700 dark:text-white dark:placeholder:text-white"
          onChange={handleSearch}
        />
      </div>

      <div className="p-5">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error occured while fetching search results</p>}

        {!isLoading && !isError && searchResults && (
          <div>
            {/*--------- Task card ---------*/}

            {searchResults.tasks && searchResults.tasks.length > 0 && (
              <h2>Tasks</h2>
            )}
            {searchResults.tasks?.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}

            {/*----------- Project card -----------*/}

            {searchResults.projects && searchResults.projects.length > 0 && (
              <h2>Projects</h2>
            )}
            {searchResults.projects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}

            {/*------------- User card ------------*/}

            {searchResults.users && searchResults.users.length > 0 && (
              <h2>Users</h2>
            )}
            {searchResults.users?.map((user) => (
              <UserCard key={user.userId} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;