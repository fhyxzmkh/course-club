import { Divider } from "antd";
import { Page, pdfjs, Document } from "react-pdf";
import { useState } from "react";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.mjs',
//   import.meta.url,
// ).toString();

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).href;

export const OnlineLearning = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function onDocumentLoadError(error) {
    console.error("PDF加载错误:", error);
  }

  const goToPrevPage = () => setPageNumber(pageNumber - 1);
  const goToNextPage = () => setPageNumber(pageNumber + 1);

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-screen-lg mx-auto">
        <div className="mb-8">
          <iframe
            src="//player.bilibili.com/player.html?isOutside=true&aid=113488051569631&bvid=BV1r4mZY4Erq&cid=26779124953&p=1"
            className="w-full md:h-96 h-auto"
            scrolling="no"
            border="0"
            frameBorder="no"
            allowFullScreen="true"
          ></iframe>
        </div>
        <Divider />
        <div className="flex justify-center">
          <Document
            file="/hostize/files/IYrT4cGTby/download/file.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={"加载中..."}
            className="h-screen overflow-y-auto"
          >
            <Page pageNumber={pageNumber} width={900} />
          </Document>
        </div>
        <div className="flex justify-between">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
          >
            上一页
          </button>
          <p>
            第 {pageNumber} 页 / 共 {numPages} 页
          </p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
          >
            下一页
          </button>
        </div>
      </div>
    </div>
  );
};
