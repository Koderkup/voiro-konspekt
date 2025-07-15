"use client";
import React, { useRef, useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { Button, Flex, Input } from "@chakra-ui/react";
import pdfUtils from "../../utils/pdfUtils";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.6.172/pdf.worker.min.js";

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
  const initialRenderDone = useRef(false);

  const {
    openPDFDatabase,
    savePDFToDB,
    loadPDFFromDB,
    wrapText,
    renderPage,
    loadPDF,
    handleCanvasClick,
    savePdf,
  } = pdfUtils;

const renderPageWithParams = (n: number) =>
  renderPage(
    n,
    pdfDoc,
    canvasRef,
    textItems,
    scale,
    setPageNum,
    wrapText,
    isRendering
  );

  const loadPDFHandler = () => {
    if (!fileRef.current) return;
    loadPDF(
      fileRef.current,
      savePDFToDB,
      setPdfDoc,
      setPageCount,
      renderPageWithParams
    );
  };

  const canvasClickHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
    handleCanvasClick(
      e,
      canvasRef,
      textRef, 
      pageNum,
      textItems,
      setTextItems,
      () => renderPageWithParams(pageNum)
    );
  };

  const savePdfHandler = () => {
    savePdf(canvasRef, loadPDFFromDB, textItems);
  };

    useEffect(() => {
      const loadInitialData = async () => {
        const pdfBytes = await loadPDFFromDB("pdfRaw");
        if (!pdfBytes) return;

        const doc = await pdfjsLib.getDocument({ data: pdfBytes }).promise;
        setPdfDoc(doc);
        setPageCount(doc.numPages);

        const savedText = localStorage.getItem("textItems");
        if (savedText) {
          const parsed = JSON.parse(savedText);
          setTextItems(parsed);
        }

        const savedPageNum = localStorage.getItem("lastPageNum");
        if (savedPageNum) {
          setPageNum(parseInt(savedPageNum));
        }
      };

      loadInitialData();
    }, []);

  useEffect(() => {
    if (
      pdfDoc &&
      canvasRef.current &&
      !initialRenderDone.current &&
      textItems.length >= 0
    ) {
      initialRenderDone.current = true;
      renderPageWithParams(pageNum);
    }
  }, [pdfDoc, textItems]);

  return (
    <Flex
      direction="column"
      align="center"
      width="100%"
      height="100%"
      p={4}
      gap={4}
    >
      {/* Верхняя панель */}
      <Flex justify="space-between" width="100%" wrap="wrap" gap={2}>
        <Input
          ref={fileRef}
          type="file"
          accept="application/pdf"
          width="auto"
        />
        <Button colorScheme="cyan" onClick={loadPDFHandler}>
          📂 Показать PDF
        </Button>
        <Button colorScheme="cyan" onClick={savePdfHandler}>
          💾 Сохранить PDF
        </Button>
      </Flex>

      {/* Canvas */}
      <Flex flex="1" width="100%" justify="center" align="center">
        <canvas
          ref={canvasRef}
          onClick={canvasClickHandler}
          style={{
            border: "1px solid #ccc",
            maxWidth: "100%",
            height: "auto",
            cursor: "crosshair",
          }}
        />
      </Flex>

      {/* Нижняя панель */}
      <Flex justify="center" wrap="wrap" gap={2}>
        <Button
          variant="outline"
          onClick={() => {
            const newPage = Math.max(1, pageNum - 1);
            setPageNum(newPage);
            localStorage.setItem("lastPageNum", String(newPage));
          }}
        >
          ⬅
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            const newPage = Math.min(pageCount, pageNum + 1);
            setPageNum(newPage);
            localStorage.setItem("lastPageNum", String(newPage));
          }}
        >
          ➡
        </Button>
        <Button
          variant="outline"
          onClick={() => setScale((s) => Math.min(s + 0.2, 3))}
        >
          🔍+
        </Button>
        <Button
          variant="outline"
          onClick={() => setScale((s) => Math.max(s - 0.2, 0.4))}
        >
          🔎–
        </Button>
      </Flex>

      {/* Поле ввода текста */}
      <Flex direction="column" align="center" gap={2}>
        <textarea
          ref={textRef}
          rows={3}
          cols={40}
          placeholder="✏️ Введите текст…"
          style={{
            resize: "none",
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <p>
          Страница: {pageNum} / {pageCount}
        </p>
      </Flex>
    </Flex>
  );

};

export default PdfEditor;