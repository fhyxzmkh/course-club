import { Button, Form, Input, Card, Space } from "antd";

export const ChangeResource = (props) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // 自动添加协议前缀
    let url = values.ResourceUrl.toString();
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "http://" + url;
    }

    const newResource = {
      name: values.ResourceName.toString(),
      url: url,
    };

    props.setResource((prevResources) => [...prevResources, newResource]);

    alert("添加资源成功！");
    form.resetFields();
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100  mt-4">
        <div className="w-1/2 mx-auto">
          <Card bordered={false}>
            <Form name="uploadResource" onFinish={onFinish} form={form}>
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <Form.Item
                  className="mt-6"
                  label="资源名称"
                  name="ResourceName"
                  rules={[
                    {
                      required: true,
                      message: "请输入资源名称!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="资源链接"
                  name="ResourceUrl"
                  rules={[
                    {
                      required: true,
                      message: "请输入资源链接!",
                    },
                    {
                      type: "url",
                      message: "请输入有效的 URL!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" className="w-full">
                    提交
                  </Button>
                </Form.Item>
              </Space>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};
