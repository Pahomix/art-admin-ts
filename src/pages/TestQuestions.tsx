import {useEffect, useState} from "react";
import {TableColumn} from "../interfaces/table.ts";
import Table from "../components/table/Table.tsx";
import {Question} from "../interfaces/test.ts";
import {TestQuestionsService} from "../services/test.questions.service.ts";

export default function TestQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const data: Question[] = await TestQuestionsService.getTestQuestions();
        setQuestions(data);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await TestQuestionsService.deleteTestQuestion(id);
      const updatedQuestions: Question[] = questions.filter(question => question.ID !== id);
      setQuestions(updatedQuestions);
    } catch (error) {
      setError(error as Error);
    }
  };

  const columns: TableColumn<Question>[] = [
    { key: "ID", label: "ID" },
    { key: "content", label: "Вопрос" },
    { key: "test_id", label: "Тест" },
    { key: "answer", label: "Правильный ответ" },
    // { key: "DeletedAt", label: "Дата удаления"},
    // { key: "CreatedAt", label: "Дата создания"},
    // { key: "updatedAt", label: "Дата обновления"},
  ];

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <Table onDelete={handleDelete} modelType={"questions"} data={questions} columns={columns} />
    </>
  );
}
