import React from "react";
import { QuestionForm } from "./QuestionForm.jsx";

export const UploadQuestion = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-1/2 mx-auto overflow-y-auto bg-white shadow-lg rounded-lg">
          <QuestionForm isChange={false} currentQuestionId={null} />
        </div>
      </div>
    </>
  );
};
