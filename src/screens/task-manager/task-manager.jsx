import React, { useEffect, useState } from "react";
import { BiCopy, BiEdit, BiPlus, BiTrash, BiSave } from "react-icons/bi";
import { constants } from "../../utils/constants";
import { AiFillSave } from "react-icons/ai";
import moment from "moment";

const TaskManager = () => {
  const [isTaskAdd, setIsTaskAdd] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [textareaValue, setTextareaValue] = useState("");

  useEffect(() => {
    const getTask = JSON.parse(localStorage.getItem(constants.TASKS_KEY));
    if (getTask) {
      setTasks(getTask);
    }
  }, []);

  const toggleTaskAdd = () => {
    if (isTaskAdd) {
      // Clear the textarea value when closing the add/edit mode
      setTextareaValue("");
    } else {
      // Populate the textarea with existing tasks when entering add/edit mode
      const taskText = tasks.map((task) => task.task).join("\n");
      setTextareaValue(taskText);
    }
    setIsTaskAdd(!isTaskAdd);
  };

  const onSave = () => {
    localStorage.setItem(constants.TASKS_KEY, JSON.stringify(tasks));
    setIsTaskAdd(false);
  };

  const onSaveTextarea = () => {
    const newTasks = textareaValue.split("\n").map((item) => ({
      id: Math.random(),
      task: item,
      createdAt: moment().format(),
      updatedAt: moment().format(),
      done: false,
    }));
    setTasks(newTasks);
    localStorage.setItem(constants.TASKS_KEY, JSON.stringify(newTasks));
    setIsTaskAdd(false);
  };

  const onDeleteSaved = () => {
    localStorage.removeItem(constants.TASKS_KEY);
    setTasks([]);
  };

  const onDone = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              done: !task.done,
              updatedAt: moment().format(),
            }
          : task
      )
    );
  };

  const onCopyText = () => {
    const copyText = tasks
      .map((task) => `${task.task} ${task.done ? "✅" : ""}`)
      .join("\n");

    navigator.clipboard.writeText(copyText);
  };

  const onTextareaChange = (e) => {
    setTextareaValue(e.target.value);
  };

  return (
    <div className="h-full py-screen flex flex-col overflow-hidden">
      <div className="content-wrap px-0 mb-6">
        <h1>Task Manager</h1>
        <div className="flex w-max ml-auto gap-4 relative z-50">
          <button
            onClick={onCopyText}
            className="flex bg-secondary font-semibold px-6 py-2 items-center rounded-2xl gap-2 ml-auto"
          >
            <BiCopy className="text-2xl" />
          </button>
          <button
            onClick={onDeleteSaved}
            className="flex bg-secondary font-semibold px-6 py-2 items-center rounded-2xl gap-2 ml-auto"
          >
            <BiTrash className="text-2xl" />
          </button>
          <button
            onClick={onSave}
            className="flex bg-secondary font-semibold px-6 py-2 items-center rounded-2xl gap-2 ml-auto"
          >
            <AiFillSave className="text-2xl" />
          </button>
          <button
            onClick={toggleTaskAdd}
            className="flex bg-secondary font-semibold px-6 py-2 items-center rounded-2xl gap-2 ml-auto"
          >
            {tasks?.length > 0 ? (
              <span>
                <BiEdit className="text-2xl" />
              </span>
            ) : (
              <BiPlus
                className={`duration-200 ${isTaskAdd ? "rotate-45" : ""}`}
              />
            )}
          </button>
        </div>
      </div>

      <div className="content-wrap bg-gray-50 dark:bg-dark-background-secondary hide-scrollbar py-6 rounded-xl flex-grow overflow-auto">
        <div>
          {isTaskAdd ? (
            <div className="">
              <div className="flex flex-col items-center gap-4">
                <textarea
                  value={textareaValue}
                  onChange={onTextareaChange}
                  className="hide-scrollbar bg-gray-200 dark:bg-dark-background-secondary p-4 w-full max-w-[600px] min-h-[300px] rounded-2xl"
                ></textarea>
                <button
                  onClick={onSaveTextarea}
                  className="flex bg-secondary font-semibold px-6 py-2 items-center rounded-2xl gap-2"
                >
                  <BiSave className="text-2xl" /> Save Tasks
                </button>
              </div>
            </div>
          ) : null}
          {!isTaskAdd && (
            <div>
              {tasks.map((task, index) => (
                <div
                  className="flex justify-between border-t first:border-none py-4 border-primary"
                  key={task?.id + index + 1}
                >
                  <span className="font-medium">
                    {task?.done ? <del>{task?.task}</del> : task?.task}
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="text-xs dark:text-dark-text-secondary">
                      {moment(task?.updatedAt).format(constants.DATE_FORMAT)}
                    </span>
                    <span>
                      <input
                        value={task?.done}
                        checked={task?.done}
                        onChange={() => onDone(task?.id)}
                        type="checkbox"
                      />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
