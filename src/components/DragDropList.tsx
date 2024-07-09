import { Droppable, Draggable } from "react-beautiful-dnd";

import { Item } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DragDropListProps {
  items: Item[];
  id: string;
}

const DragDropList = ({ items, id }: DragDropListProps) => {
  return (
    <Card className="tw-flex tw-flex-col">
      <CardHeader>
        <CardTitle>{id}</CardTitle>
      </CardHeader>

      <Droppable droppableId={id}>
        {(provided) => (
          <CardContent
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="tw-flex tw-grow-1 tw-flex-col tw-h-full"
          >
            {id !== "Box 2" &&
              items
                .filter((item) => item.boxId === id)
                .map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Badge>{item.id}</Badge>
                      </div>
                    )}
                  </Draggable>
                ))}
          </CardContent>
        )}
      </Droppable>
    </Card>
  );
};

export default DragDropList;
