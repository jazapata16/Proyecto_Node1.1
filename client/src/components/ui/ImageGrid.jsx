import { useEffect, useRef } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";

export function ImageGrid({ images, onImageDrop, onImageReorder }) {
  const gridRef = useRef(null);

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.IMAGE,
    drop: (item, monitor) => {
      const dropPosition = monitor.getSourceClientOffset();
      const gridPosition = gridRef.current.getBoundingClientRect();

      const x = dropPosition.x - gridPosition.left;
      const y = dropPosition.y - gridPosition.top;

      const newImage = {
        id: Date.now().toString(),
        src: item.src,
        position: { x, y },
      };

      onImageDrop(newImage);
    },
  }));

  useEffect(() => {
    const handleDragOver = (event) => {
      event.preventDefault();
    };

    gridRef.current.addEventListener("dragover", handleDragOver);

    return () => {
      gridRef.current.removeEventListener("dragover", handleDragOver);
    };
  }, []);

  const handleImageDragEnd = (event, image) => {
    const gridPosition = gridRef.current.getBoundingClientRect();
    const x = event.clientX - gridPosition.left;
    const y = event.clientY - gridPosition.top;

    const updatedImage = {
      ...image,
      position: { x, y },
    };

    const updatedImages = images.map((img) =>
      img.id === updatedImage.id ? updatedImage : img
    );

    onImageReorder(updatedImages);
  };

  return (
    <div className="image-grid" ref={(el) => {
        drop(el);
        gridRef.current = el;
      }}>
      
      {images.map((image) => (
        <div
          key={image.id}
          className="image-item"
          style={{ transform: `translate(${image.position.x}px, ${image.position.y}px)` }}
          draggable
          onDragEnd={(event) => handleImageDragEnd(event, image)}
        >
          <img src={image.src} alt="Draggable" />
        </div>
      ))}
    </div>
  );
}
