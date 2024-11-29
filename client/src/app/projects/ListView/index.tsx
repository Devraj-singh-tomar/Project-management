import Header from "@/app/(components)/Header";
import TaskCard from "@/app/(components)/TaskCard";
import { Task, useGetTasksQuery } from "@/state/api";
import React from "react";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const ListView = ({ id, setIsModalNewTaskOpen }: Props) => {
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading) return <div>loading...</div>;
  if (error)
    return <div className="">an error occured while fetching tasks </div>;

  return (
    <div className="px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header name="List"></Header>
      </div>
      <div className="lg:grid-gap-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks?.map((task: Task) => <TaskCard key={task.id} task={task} />)}
      </div>
    </div>
  );
};

export default ListView;
