import moment from "moment";
import React, { useEffect, useState } from "react";
import { BiSave } from "react-icons/bi";
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdClose,
  MdCopyAll,
  MdDone,
  MdEditNote,
  MdOutlineDeleteForever,
  MdPlaylistAdd,
  MdStore,
} from "react-icons/md";
import { constants } from "../../utils/constants";

const TaskManager = () => {
  const [isTaskAdd, setIsTaskAdd] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [textareaValue, setTextareaValue] = useState("");

  const classes = {
    btn: "w-[50px] h-[50px] flex bg-secondary font-semibold justify-center items-center rounded-full gap-2 ml-auto hover:opacity-50 active:scale-110 duration-100 disabled:hidden",
  };

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

  const onCheckAll = () => {
    setTasks((prev) =>
      prev.map((task) => ({
        ...task,
        done: true,
        updatedAt: moment().format(),
      }))
    );
  };

  const onUncheckAll = () => {
    setTasks((prev) =>
      prev.map((task) => ({
        ...task,
        done: false,
        updatedAt: moment().format(),
      }))
    );
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

  const onCopyText = (isDoneOnly, notDoneOnly) => {
    let sortedTasksByText = [...tasks].sort((a, b) => {
      return a.task.localeCompare(b.task);
    });

    if (isDoneOnly) {
      sortedTasksByText = sortedTasksByText.filter((task) => task.done);
    }

    if (notDoneOnly) {
      sortedTasksByText = sortedTasksByText.filter((task) => !task.done);
    }

    const copyText = sortedTasksByText
      .map((task) => `${task.task} ${task.done ? "(Done)" : ""}`)
      .join("\n");

    navigator.clipboard.writeText(copyText);
  };

  const onCopyDoneOnly = () => {
    onCopyText(true);
  };

  const onCopyNotDoneOnly = () => {
    onCopyText(false, true);
  };

  const onTextareaChange = (e) => {
    setTextareaValue(e.target.value);
  };

  return (
    <div className="h-full py-screen flex flex-col overflow-hidden">
      <div className="content-wrap">
        <div className="content-wrap px-0 mb-6">
          <h1>Task Manager</h1>
          <div className="flex w-max ml-auto gap-4 relative z-50">
            <button
              className={classes?.btn}
              disabled={isTaskAdd}
              onClick={onCheckAll}
            >
              <MdCheckBox className="text-2xl" />
            </button>
            <button
              className={classes?.btn}
              disabled={isTaskAdd}
              onClick={onUncheckAll}
            >
              <MdCheckBoxOutlineBlank className="text-2xl" />
            </button>
            <button
              className={classes?.btn}
              disabled={isTaskAdd}
              onClick={onCopyNotDoneOnly}
            >
              <MdClose className="text-2xl" />
            </button>
            <button
              className={classes?.btn}
              disabled={isTaskAdd}
              onClick={onCopyDoneOnly}
            >
              <MdDone className="text-2xl" />
            </button>

            <button
              className={classes?.btn}
              disabled={isTaskAdd}
              onClick={onCopyText}
            >
              <MdCopyAll className="text-2xl" />
            </button>
            <button
              className={classes?.btn}
              disabled={isTaskAdd}
              onClick={onDeleteSaved}
            >
              <MdOutlineDeleteForever className="text-2xl" />
            </button>
            <button
              className={classes?.btn}
              disabled={isTaskAdd}
              onClick={onSave}
            >
              <MdStore className="text-2xl" />
            </button>
            <button className={classes?.btn} onClick={toggleTaskAdd}>
              {tasks?.length > 0 ? (
                <span>
                  <MdEditNote className="text-2xl" />
                </span>
              ) : (
                <MdPlaylistAdd className={`text-2xl`} />
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
                    className="hide-scrollbar resize-none bg-gray-100 border border-light-gray dark:bg-dark-background-primary p-4 w-full max-w-[600px] min-h-[300px] rounded-2xl"
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
                    className="flex justify-between border-t first:border-none py-4 border-light-gray"
                    key={task?.id + index + 1}
                  >
                    <span className="font-semibold">
                      {task?.done ? <del>{task?.task}</del> : task?.task}
                    </span>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-gray-500 dark:text-dark-text-secondary">
                        {moment(task?.updatedAt).format(
                          constants.DATE_TIME_FORMAT
                        )}
                      </span>
                      <span>
                        <input
                          value={task?.done}
                          checked={task?.done}
                          onChange={() => onDone(task?.id)}
                          type="checkbox"
                          className="scale-150"
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
    </div>
  );
};

export default TaskManager;
