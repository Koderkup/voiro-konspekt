"use client";

import React, { useRef, useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";


const PdfEditor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [pageNum, setPageNum] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [textItems, setTextItems] = useState<any[]>([]);
  const [scale, setScale] = useState(1.2);
  const isRendering = useRef(false);
  const currentViewport = useRef<any>(null);

  const openPDFDatabase = async () => {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open("PDFStorage", 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains("files")) {
          db.createObjectStore("files");
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };

  const savePDFToDB = async (key: string, bytes: Uint8Array): Promise<void> => {
    const db = await openPDFDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("files", "readwrite");
      const store = tx.objectStore("files");
      store.put(bytes, key);

      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  };

  const loadPDFFromDB = async (key: string): Promise<Uint8Array | null> => {
    const db = await openPDFDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("files", "readonly");
      const store = tx.objectStore("files");
      const request = store.get(key);
      request.onsuccess = () => {
        const result = request.result;
        if (result instanceof Blob) {
          result.arrayBuffer().then((buf) => resolve(new Uint8Array(buf)));
        } else if (
          result instanceof Uint8Array ||
          result instanceof ArrayBuffer
        ) {
          resolve(new Uint8Array(result));
        } else resolve(null);
      };
      request.onerror = () => reject(request.error);
    });
  };

  const wrapText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) => {
    const words = text.split(" ");
    let line = "";
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, y);
        line = words[n] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y);
  };

  const renderPage = async (n: number) => {
    if (isRendering.current || !pdfDoc) return;
    isRendering.current = true;

    const page = await pdfDoc.getPage(n);
    const viewport = page.getViewport({ scale });
    currentViewport.current = viewport;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: ctx, viewport }).promise;

    ctx.font = "16px sans-serif";
    ctx.fillStyle = "black";
    ctx.textBaseline = "top";

    textItems
      .filter((t) => t.page === n)
      .forEach((item) => {
        wrapText(ctx, item.text, item.canvasX, item.canvasY, 300, 20);
      });

    setPageNum(n);
    isRendering.current = false;
  };

  const loadPDF = () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return alert("Выберите PDF-файл");

    const reader = new FileReader();
    reader.onload = async () => {
      const bytes = new Uint8Array(reader.result as ArrayBuffer);
      await savePDFToDB("pdfRaw", bytes);

      const doc = await pdfjsLib.getDocument({ data: bytes }).promise;
      setPdfDoc(doc);
      setPageCount(doc.numPages);
      renderPage(1);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const canvasX = ((e.clientX - rect.left) * canvas.width) / rect.width;
    const canvasY = ((e.clientY - rect.top) * canvas.height) / rect.height;

    const text = textRef.current?.value.trim();
    if (!text) return;

    const newItem = { text, page: pageNum, canvasX, canvasY };
    const newItems = [...textItems, newItem];
    setTextItems(newItems);
    localStorage.setItem("textItems", JSON.stringify(newItems));
    renderPage(pageNum);
  };

  const savePdf = async () => {
    const pdfBytes = await loadPDFFromDB("pdfRaw");
    if (!pdfBytes || textItems.length === 0)
      return alert("Нет данных для сохранения");

    const doc = await PDFDocument.load(pdfBytes);
    doc.registerFontkit(fontkit);

    const fontBytes = await fetch(
      "https://cdn.jsdelivr.net/npm/dejavu-fonts-ttf@2.37/ttf/DejaVuSans.ttf"
    ).then((r) => r.arrayBuffer());
    const font = await doc.embedFont(fontBytes);
    const pages = doc.getPages();

    for (const item of textItems) {
      const page = pages[item.page - 1];
      const { width, height } = page.getSize();
      const scaleX = width / canvasRef.current!.width;
      const scaleY = height / canvasRef.current!.height;

      let pdfX = item.canvasX * scaleX;
      let pdfY = height - item.canvasY * scaleY;

      const maxWidth = 300;
      const lineHeight = 16;
      const words = item.text.split(" ");
      let line = "";

      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + " ";
        const testWidth = font.widthOfTextAtSize(testLine, 16);

        if (testWidth > maxWidth && i > 0) {
          page.drawText(line.trim(), {
            x: pdfX,
            y: pdfY,
            size: 11,
            font,
            color: rgb(0, 0, 0),
          });
          line = words[i] + " ";
          pdfY -= lineHeight;
        } else {
          line = testLine;
        }
      }

      if (line.trim()) {
        page.drawText(line.trim(), {
          x: pdfX,
          y: pdfY,
          size: 11,
          font,
          color: rgb(0, 0, 0),
        });
      }
    }

    const out = await doc.save(); // Uint8Array

    // Создаём ArrayBuffer нужной длины
    const ab = new ArrayBuffer(out.length);
    // Копируем содержимое
    const safeBuffer = new Uint8Array(ab);
    safeBuffer.set(out);

    // Теперь можно безопасно использовать
    const blob = new Blob([ab], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "annotated.pdf";
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1500);
  };

  useEffect(() => {
    const savedText = localStorage.getItem("textItems");
    if (savedText) setTextItems(JSON.parse(savedText));
  }, []);

  return (
    <div>
      <input ref={fileRef} type="file" accept="application/pdf" />
      <button onClick={loadPDF}>📂 Загрузить PDF</button>
      <canvas ref={canvasRef} onClick={handleCanvasClick}></canvas>
      <div>
        <button onClick={() => renderPage(Math.max(1, pageNum - 1))}>⬅</button>
        <button onClick={() => renderPage(Math.min(pageCount, pageNum + 1))}>
          ➡
        </button>
        <button onClick={() => setScale((s) => s + 0.2)}>🔍+</button>
        <button onClick={() => setScale((s) => Math.max(0.2, s - 0.2))}>
          🔎–
        </button>
        <button onClick={savePdf}>💾 Сохранить PDF</button>
      </div>

      <div>
        <textarea
          ref={textRef}
          rows={3}
          cols={30}
          placeholder="✏️ Введите текст…"
        />
      </div>

      <div>
        <p>
          Страница: {pageNum} / {pageCount}
        </p>
      </div>
    </div>
  );
};

export default PdfEditor;
