import { Button, Form, Input, Select } from "antd";
import axios from "axios";
import React from "react";

export const QuestionForm = ({ isChange, currentQuestion }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    if (isChange === true) {
      try {
        await axios.post("/api/admin-uploadQuestion", values);

        await axios.get(
          `/api/admin-deleteQuestion?questionId=${currentQuestion._id}`,
        );

        alert("Question changed successfully!");
        form.resetFields();
      } catch (error) {
        console.error("Error changing question:", error);
        alert("Failed to changed question. Please try again.");
      }
    } else {
      try {
        const response = await axios.post("/api/admin-uploadQuestion", values);
        alert("Question uploaded successfully!");
        form.resetFields();
      } catch (error) {
        console.error("Error uploading question:", error);
        alert("Failed to upload question. Please try again.");
      }
    }
  };

  return (
    <>
      <Form
        form={form}
        name="uploadQuestion"
        onFinish={onFinish}
        initialValues={{
          remember: true,
        }}
        layout="vertical"
      >
        <Form.Item
          label="问题描述"
          name="question"
          rules={[
            {
              required: true,
              message: "Please input the question!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="正确答案"
          name="answer"
          rules={[
            {
              required: true,
              message: "Please select the correct answer!",
            },
          ]}
        >
          <Select>
            <Option value="A">A</Option>
            <Option value="B">B</Option>
            <Option value="C">C</Option>
            <Option value="D">D</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="知识点所在章节"
          name="chapter"
          rules={[
            {
              required: true,
              message: "Please input the chapter!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="选项A"
          name="optionA"
          rules={[
            {
              required: true,
              message: "Please input option A!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="选项B"
          name="optionB"
          rules={[
            {
              required: true,
              message: "Please input option B!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="选项C"
          name="optionC"
          rules={[
            {
              required: true,
              message: "Please input option C!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="选项D"
          name="optionD"
          rules={[
            {
              required: true,
              message: "Please input option D!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
