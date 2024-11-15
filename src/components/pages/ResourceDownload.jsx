import { Divider } from "antd";
import {
  BookOutlined,
  FilePdfOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const text = [
  "第01章 绪论",
  "第02章 项目初始",
  "第03章 生存期模型",
  "第04章 范围计划",
  "第06章 成本计划",
  "第07章 进度计划",
  "第08章 质量计划",
  "第09章 配置管理计划",
  "第10章 团队计划",
  "第11章 风险计划",
  "第12、13章",
  "第14章",
  "第15、16章",
];

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
          <div>
            <div className="relative">
              <FilePdfOutlined className="absolute top-5 left-0 text-blue-500 text-2xl" />
              <div className="ml-10">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  课件
                </h2>
                <div className="grid grid-cols-1 gap-3 mt-1">
                  {text.map((item, index) => (
                    <a
                      key={index}
                      href="https://pan.baidu.com/s/1vdpYCwRRUh9m48uVIYnmqQ?pwd=a3za"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
