// import { TextItem } from "../types/types";
// import { useEffect, useRef } from "react";

// export function useCanvasDrag({
//   canvasRef,
//   textItems,
//   pageNum,
//   ctx,
//   onUpdate,
//   onRender,
// }: {
//   canvasRef: React.RefObject<HTMLCanvasElement>;
//   textItems: TextItem[];
//   pageNum: number;
//   ctx: CanvasRenderingContext2D;
//   onUpdate: (updatedItems: TextItem[]) => void;
//   onRender: () => void; 
// }) {
//   const draggingItemRef = useRef<TextItem | null>(null);
//   const offsetRef = useRef({ x: 0, y: 0 });
//   const scheduledRef = useRef(false);
//   const pendingItemsRef = useRef<TextItem[]>([]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas || !ctx) return;

//     const getCoords = (clientX: number, clientY: number) => {
//       const rect = canvas.getBoundingClientRect();
//       return {
//         x: ((clientX - rect.left) * canvas.width) / rect.width,
//         y: ((clientY - rect.top) * canvas.height) / rect.height,
//       };
//     };

//     const checkHit = (x: number, y: number) => {
//       for (const item of textItems) {
//         if (item.page !== pageNum) continue;
//         const metrics = ctx.measureText(item.text);
//         const w = metrics.width;
//         const h = 20;
//         const itemX = item.relativeX * canvas.width;
//         const itemY = item.relativeY * canvas.height;

//         if (x >= itemX && x <= itemX + w && y >= itemY && y <= itemY + h) {
//           draggingItemRef.current = item;
//           offsetRef.current = {
//             x: x - itemX,
//             y: y - itemY,
//           };
//           if (navigator.vibrate) navigator.vibrate(50);
//           break;
//         }
//       }
//     };

//     const scheduleUpdate = () => {
//       if (!scheduledRef.current) {
//         scheduledRef.current = true;
//         requestAnimationFrame(() => {
//           onUpdate([...pendingItemsRef.current]);
//           scheduledRef.current = false;
//         });
//       }
//     };

//     const handleStart = (x: number, y: number) => checkHit(x, y);

//     const handleMove = (x: number, y: number) => {
//       const item = draggingItemRef.current;
//       if (!item) return;
//       item.relativeX = (x - offsetRef.current.x) / canvas.width;
//       item.relativeY = (y - offsetRef.current.y) / canvas.height;
//       pendingItemsRef.current = [...textItems];
//       scheduleUpdate();
//     };

//     const handleEnd = () => {
//       draggingItemRef.current = null;
//       onUpdate([...textItems]); // финальное обновление данных
//       onRender(); // отрисовка страницы
//     };

//     // Touch and Mouse handlers
//     const touchStart = (e: TouchEvent) => {
//       const { x, y } = getCoords(e.touches[0].clientX, e.touches[0].clientY);
//       handleStart(x, y);
//     };

//     const touchMove = (e: TouchEvent) => {
//       if (!draggingItemRef.current) return;
//       e.preventDefault();
//       const { x, y } = getCoords(e.touches[0].clientX, e.touches[0].clientY);
//       handleMove(x, y);
//     };

//     const mouseDown = (e: MouseEvent) => {
//       const { x, y } = getCoords(e.clientX, e.clientY);
//       handleStart(x, y);
//     };

//     const mouseMove = (e: MouseEvent) => {
//       if (!draggingItemRef.current) return;
//       const { x, y } = getCoords(e.clientX, e.clientY);
//       handleMove(x, y);
//     };

//     const removeListeners = () => {
//       canvas.removeEventListener("touchstart", touchStart);
//       canvas.removeEventListener("touchmove", touchMove);
//       canvas.removeEventListener("touchend", handleEnd);
//       canvas.removeEventListener("mousedown", mouseDown);
//       canvas.removeEventListener("mousemove", mouseMove);
//       canvas.removeEventListener("mouseup", handleEnd);
//     };

//     canvas.addEventListener("touchstart", touchStart);
//     canvas.addEventListener("touchmove", touchMove, { passive: false });
//     canvas.addEventListener("touchend", handleEnd);
//     canvas.addEventListener("mousedown", mouseDown);
//     canvas.addEventListener("mousemove", mouseMove);
//     canvas.addEventListener("mouseup", handleEnd);

//     return removeListeners;
//   }, [canvasRef, textItems, pageNum, ctx, onUpdate, onRender]);
// }
import { useEffect, useRef } from "react";
import { TextItem } from "../types/types";

export function useCanvasDrag({
  canvasRef,
  textItems,
  pageNum,
  ctx,
  onUpdate,
  onRender,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  textItems: TextItem[];
  pageNum: number;
  ctx: CanvasRenderingContext2D;
  onUpdate: (updatedItems: TextItem[]) => void;
  onRender: () => void;
}) {
  const draggingIndexRef = useRef<number | null>(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !ctx) return;

    const getCoords = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: ((clientX - rect.left) * canvas.width) / rect.width,
        y: ((clientY - rect.top) * canvas.height) / rect.height,
      };
    };

    const findHitIndex = (x: number, y: number): number | null => {
      for (let i = 0; i < textItems.length; i++) {
        const item = textItems[i];
        if (item.page !== pageNum) continue;

        const metrics = ctx.measureText(item.text);
        const w = metrics.width;
        const h = 20;

        const itemX = item.relativeX * canvas.width;
        const itemY = item.relativeY * canvas.height;

        if (x >= itemX && x <= itemX + w && y >= itemY && y <= itemY + h) {
          offsetRef.current = { x: x - itemX, y: y - itemY };
          return i;
        }
      }
      return null;
    };

    const handleStart = (x: number, y: number) => {
      const index = findHitIndex(x, y);
      if (index !== null) {
        draggingIndexRef.current = index;
        if (navigator.vibrate) navigator.vibrate(50);
      }
    };

    const handleMove = (x: number, y: number) => {
      const index = draggingIndexRef.current;
      if (index === null) return;

      const updatedItems = textItems.map((item, i) =>
        i === index
          ? {
              ...item,
              relativeX: (x - offsetRef.current.x) / canvas.width,
              relativeY: (y - offsetRef.current.y) / canvas.height,
            }
          : item
      );

      onUpdate(updatedItems); // иммутабельное обновление
      onRender(); // перерисовка
    };

    const handleEnd = () => {
      draggingIndexRef.current = null;
    };

    // Events
    const mouseDown = (e: MouseEvent) => {
      const { x, y } = getCoords(e.clientX, e.clientY);
      handleStart(x, y);
    };
    const mouseMove = (e: MouseEvent) => {
      const { x, y } = getCoords(e.clientX, e.clientY);
      handleMove(x, y);
    };
    const mouseUp = () => handleEnd();

    const touchStart = (e: TouchEvent) => {
      const { x, y } = getCoords(e.touches[0].clientX, e.touches[0].clientY);
      handleStart(x, y);
    };
    const touchMove = (e: TouchEvent) => {
      e.preventDefault();
      const { x, y } = getCoords(e.touches[0].clientX, e.touches[0].clientY);
      handleMove(x, y);
    };
    const touchEnd = () => handleEnd();

    canvas.addEventListener("mousedown", mouseDown);
    canvas.addEventListener("mousemove", mouseMove);
    canvas.addEventListener("mouseup", mouseUp);
    canvas.addEventListener("touchstart", touchStart);
    canvas.addEventListener("touchmove", touchMove, { passive: false });
    canvas.addEventListener("touchend", touchEnd);

    return () => {
      canvas.removeEventListener("mousedown", mouseDown);
      canvas.removeEventListener("mousemove", mouseMove);
      canvas.removeEventListener("mouseup", mouseUp);
      canvas.removeEventListener("touchstart", touchStart);
      canvas.removeEventListener("touchmove", touchMove);
      canvas.removeEventListener("touchend", touchEnd);
    };
  }, [canvasRef, textItems, pageNum, ctx, onUpdate, onRender]);
}
