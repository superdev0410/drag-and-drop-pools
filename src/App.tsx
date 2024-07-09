import { useCallback, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import DragDropList from "@/components/DragDropList";
import { Button } from "@/components/ui/button";
import { Item } from "@/lib/types";

const App = () => {
  const [items, setItems] = useState<Item[]>(
    Array(10)
      .fill(0)
      .map((_, index) => ({
        id: `Item ${index}`,
        boxId: "Box 1",
      }))
  );

  const moveItem = (id: string, boxId: string) => {
    setItems((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            boxId: boxId,
          };
        } else {
          return item;
        }
      });
    });
  };

  const onDragEnd = useCallback((result: DropResult) => {
    if (result.destination) {
      moveItem(result.draggableId, result.destination.droppableId);
    }
  }, []);

  const onReset = useCallback(() => {
    setItems(
      Array(10)
        .fill(0)
        .map((_, index) => ({
          id: `Item ${index}`,
          boxId: "Box 1",
        }))
    );
  }, []);

  return (
    <div className="tw-flex tw-flex-col tw-gap-4 tw-p-4 tw-items-center">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="tw-flex tw-gap-4">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <DragDropList id={`Box ${index + 1}`} items={items} />
            ))}
        </div>
      </DragDropContext>

      <Button className="tw-w-fit" onClick={onReset}>Reset</Button>
    </div>
  );
};

export default App;
