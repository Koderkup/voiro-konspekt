const openPDFDatabase = async () => {
  if (typeof window !== "undefined") {
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
  } else {
    throw new Error("Window is not defined");
  }
};


  const savePDFToDB = async (key: string, bytes: Uint8Array): Promise<void> => {
    if (typeof window !== "undefined") {
    const db = await openPDFDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("files", "readwrite");
      const store = tx.objectStore("files");
      store.put(bytes, key);

      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } else {
    throw new Error("Window is not defined");
  }
  };

  
  const loadPDFFromDB = async (key: string): Promise<Uint8Array | null> => {
    if (typeof window !== "undefined") {
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
  } else {
    throw new Error("Window is not defined");
  }
  };

  const wrapText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) => {
     if (typeof window !== "undefined") {
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
  } else {
    throw new Error("Window is not defined");
  }
  };

export default {
  openPDFDatabase,
  savePDFToDB,
  loadPDFFromDB,
  wrapText,
};
