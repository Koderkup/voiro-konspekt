"use client";
import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Text, Image } from "react-konva";

const MyNotes = () => {
  const [textBlocks, setTextBlocks] = useState([
    { id: 1, x: 100, y: 100, text: "РАБОЧАЯ ТЕТРАДЬ", fontSize: 24 },
    {
      id: 2,
      x: 150,
      y: 150,
      text: "What is Lorem Ipsum?",
      fontSize: 20,
    },
  ]);

  const [background, setBackground] = useState<HTMLImageElement | null>(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const img = new window.Image();
    img.src = ""; // путь к фону
    img.onload = () => setBackground(img);

    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleDragEnd = (index: number, e: any) => {
    const newBlocks = [...textBlocks];
    newBlocks[index].x = e.target.x();
    newBlocks[index].y = e.target.y();
    setTextBlocks(newBlocks);
  };

  const saveLayout = () => {
    localStorage.setItem("pageLayout", JSON.stringify(textBlocks));
    alert("Сохранено!");
  };

  const loadLayout = () => {
    const saved = localStorage.getItem("pageLayout");
    if (saved) {
      setTextBlocks(JSON.parse(saved));
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={saveLayout}>💾 Сохранить</button>
        <button onClick={loadLayout}>📂 Загрузить</button>
      </div>
      <Stage
        width={dimensions.width}
        height={dimensions.height}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <Layer>
          {background && (
            <Image
              image={background}
              width={dimensions.width}
              height={dimensions.height}
            />
          )}
          {textBlocks.map((block, idx) => (
            <Text
              key={block.id}
              x={block.x}
              y={block.y}
              text={block.text}
              fontSize={block.fontSize}
              fill="black"
              draggable
              onDragEnd={(e) => handleDragEnd(idx, e)}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default MyNotes;
