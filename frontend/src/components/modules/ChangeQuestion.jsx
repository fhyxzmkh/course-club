import { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Collapse, List, Select } from "antd";
import { QuestionForm } from "./QuestionForm.jsx";

const { Option } = Select;

export const ChangeQuestion = () => {
  const [questions, setQuestions] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(null);

  useEffect(() => {
    const getQuestions = async () => {
      const response = await axios.get("/api/admin-getQuestions");
      setQuestions(response.data);
    };
    getQuestions();
  }, []);

  const handleDelete = async (questionId) => {
    try {
      await axios.get(`/api/admin-deleteQuestion?questionId=${questionId}`);
      const updatedQuestions = questions.filter(
        (question) => question._id !== questionId,
      );
      setQuestions(updatedQuestions);
      alert("Question deleted successfully!");
    } catch (error) {
      console.error("Error deleting question:", error);
      alert("Failed to delete question. Please try again.");
    }
  };

  const handleEdit = (question) => {
    setCurrentQuestion(question);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="w-2/3 mx-auto overflow-y-auto bg-white">
        <List
          header={<p className="font-bold text-center">题目列表</p>}
          bordered
          dataSource={questions}
          renderItem={(q, idx) => (
            <List.Item className="flex justify-between items-center">
              <div className="w-full mr-2">
                <Collapse
                  size="small"
                  items={[
                    {
                      key: idx,
                      label: q.question,
                      children: (
                        <div>
                          <p>Answer: {q.answer}</p>
                          <p>Chapter: {q.chapter}</p>
                          <p>{q.optionA}</p>
                          <p>{q.optionB}</p>
                          <p>{q.optionC}</p>
                          <p>{q.optionD}</p>
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  color="primary"
                  variant="outlined"
                  className="ml-auto"
                  onClick={() => handleEdit(q)}
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  variant="outlined"
                  className="ml-auto"
                  onClick={() => handleDelete(q._id)}
                >
                  Delete
                </Button>
              </div>
            </List.Item>
          )}
        />
      </div>

      <Modal
        title="Edit Question"
        open={isModalOpen}
        destroyOnClose={true}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <QuestionForm isChange={true} currentQuestion={currentQuestion} />
      </Modal>
    </>
  );
};
