import React from "react";
import ItemModal from "../../../modal/ItemModal";
import { useState } from "react";
import { ITodoTypes } from "../../../utils/items";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

interface ITodoItemsProps {
  setItemsArray: React.Dispatch<React.SetStateAction<ITodoTypes[]>>;
  itemsArray: ITodoTypes[];
}

const TodoItems: React.FC<ITodoItemsProps> = ({
  setItemsArray,
  itemsArray,
}) => {
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ITodoTypes | null>(null);

  const isNotCompleted = itemsArray.filter((task) => task.completed === false);

  const openModal = (item: ITodoTypes) => {
    setModal(true);
    setSelectedItem(item);
  };
  const closeModal = () => {
    setModal(false);
  };

  const editTask = (newItem: ITodoTypes) => {
    const newArray = itemsArray.map((i) => {
      if (i.id === newItem.id) {
        return newItem;
      }
      return i;
    });
    setItemsArray(newArray);
  };

  const deleteTask = (item: ITodoTypes) => {
    const newTasks = itemsArray.filter((i) => i.id !== item.id);
    setItemsArray(newTasks);
  };

  const checkTask = (item: ITodoTypes) => {
    const now = new Date();
    const formattedTime = now.toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
    const newCompleted = itemsArray.map((todo) => {
      if (item.id === todo.id) {
        return {
          ...todo,
          completed: !todo.completed,
          completedOn: formattedTime,
        };
      }
      return todo;
    });
    setItemsArray(newCompleted);
  };
  console.log(itemsArray);

  return (
    <>
      <div className="flex items-center w-full flex-col overflow-auto">
        {isNotCompleted.map((item) => (
          <div
            key={item.id}
            className="h-14 text-center px-5 w-11/12 rounded-full bg-red-600 mb-3 flex items-center justify-around"
          >
            <div className="w-full text-left flex items-center gap-2">
              <input
                className="cursor-pointer"
                title="Completed?"
                onChange={() => checkTask(item)}
                type="checkbox"
                checked={item.completed || false}
              />
              <div className="text-white w-full">{item.title}</div>
            </div>
            <div className="text-white w-1/5 flex gap-2 justify-end text-xl">
              <button onClick={() => openModal(item)}>
                <BiSolidEdit title="Edit" />
              </button>
              <button onClick={() => deleteTask(item)}>
                <MdDelete title="Delete?" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {modal && selectedItem && (
        <ItemModal
          selectedItem={selectedItem}
          closeModal={closeModal}
          editTask={editTask}
        />
      )}
    </>
  );
};

export default TodoItems;
