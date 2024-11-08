import { Divider } from "antd";
import {
  BookOutlined,
  FilePdfOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

export const ResourceDownload = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <BookOutlined className="text-blue-500 text-2xl" />
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">教材</h2>
              <a
                href="https://pan.baidu.com/s/1Vnv6KPZg7GlMNFjbsvZh1w?pwd=jcqs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Download
              </a>
            </div>
          </div>
          <Divider />
          <div className="flex items-center space-x-4">
            <FileTextOutlined className="text-blue-500 text-2xl" />
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">试卷</h2>
              <a
                href="https://pan.baidu.com/s/1vdpYCwRRUh9m48uVIYnmqQ?pwd=a3za"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Download
              </a>
            </div>
          </div>
          <Divider />
          <div className="flex items-center space-x-4">
            <FilePdfOutlined className="text-blue-500 text-2xl" />
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">课件</h2>
              <div className="grid grid-cols-8 gap-4 mt-2">
                {[...Array(16)].map((_, index) => (
                  <a
                    key={index}
                    href="https://pan.baidu.com/s/1vdpYCwRRUh9m48uVIYnmqQ?pwd=a3za"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    第{index + 1}章
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
