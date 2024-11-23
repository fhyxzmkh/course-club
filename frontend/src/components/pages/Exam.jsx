import { useState, useEffect } from "react";
import { Form, Radio, Button, Card, Space } from "antd";
import axios from "axios";

export const Exam = () => {
  const [questions, setQuestions] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    const getQuestions = async () => {
      const response = await axios.get("/api/questions");
      setQuestions(response.data);
    };

    setIsSubmit(false);
    getQuestions();
  }, []);

  const handleFinish = (values) => {
    setUserAnswers(values);

    let scoreValue = 0;
    questions.forEach((q, idx) => {
      if (values[`question_${idx}`] === q.answer) {
        scoreValue += 5;
      }
    });

    setScore(scoreValue);
    setIsSubmit(true);

    alert("您本次测试得分为：" + scoreValue);
  };

  useEffect(() => {
    console.log("Score updated:", score);
  }, [score]);

  const getQuestion = (q, option) => {
    if (option === "A") return String(q.optionA);
    else if (option === "B") return String(q.optionB);
    else if (option === "C") return String(q.optionC);
    else return String(q.optionD);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex justify-center">
      <div className="bg-white p-4 rounded w-full max-w-screen-lg shadow-md h-full">
        <Card
          style={{ minHeight: "780px", maxHeight: "780px", overflowY: "auto" }}
        >
          {isSubmit ? (
            <div>
              {questions.map((q, idx) => (
                <div key={idx}>
                  <p>{String(idx + 1 + "、" + q.question)}</p>
                  <p>
                    您的答案:
                    <br />
                    {getQuestion(q, userAnswers[`question_${idx}`])}
                  </p>
                  <p>
                    正确答案: <br />
                    {getQuestion(q, q.answer)}
                  </p>
                </div>
              ))}
              <p className="font-bold text-4xl">
                <br />
                您本次测试得分为：{score}
              </p>
            </div>
          ) : (
            <Form onFinish={handleFinish} layout="vertical">
              {questions.map((q, idx) => (
                <Space.Compact block key={idx}>
                  <Form.Item
                    label={String(idx + 1 + "、" + q.question)}
                    name={`question_${idx}`}
                    rules={[
                      {
                        required: true,
                        message: "Please finish all questions!",
                      },
                    ]}
                  >
                    <Radio.Group>
                      <Space direction="vertical">
                        <Radio value={"A"}>{q.optionA}</Radio>
                        <Radio value={"B"}>{q.optionB}</Radio>
                        <Radio value={"C"}>{q.optionC}</Radio>
                        <Radio value={"D"}>{q.optionD}</Radio>
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                </Space.Compact>
              ))}
              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          )}
        </Card>
      </div>
    </div>
  );
};
