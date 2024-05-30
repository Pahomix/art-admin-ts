import {useEffect, useState} from "react";
import {TableColumn} from "../interfaces/table.ts";
import Table from "../components/table/Table.tsx";
import {Question, Test} from "../interfaces/test.ts";
import {CourseTestsService} from "../services/course.tests.service.ts";
import {TestQuestionsService} from "../services/test.questions.service.ts";


export default function TestQuestions () {

  const [questions, setQuestions ] = useState<Question[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

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
      await CourseTestsService.deleteCourseTest(id);
      const data: Test[] = await CourseTestsService.getCourseTests();
      setQuestions(data);
    } catch (error) {
      setError(error as Error);
    }
  };

  const columns: TableColumn<Question>[] = [
    { key: "ID", label: "ID" },
    { key: "content", label: "Заглавие вопроса" },
    { key: "test_id", label: "ID теста" },
    { key: "answer_id", label: "ID правильного ответа" },
    // { key: "DeletedAt", label: "Дата удаления"},
    // { key: "CreatedAt", label: "Дата создания"},
    // { key: "updatedAt", label: "Дата обновления"},

  ];

  return (
    <>
      {loading && "Loading..."}
      {error && "Error"}
      <Table onDelete={handleDelete} modelType={"questions"} data={questions} columns={columns} />
    </>
  )
}