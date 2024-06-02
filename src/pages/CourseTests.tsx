import {useEffect, useState} from "react";
import {TableColumn} from "../interfaces/table.ts";
import Table from "../components/table/Table.tsx";
import {Test} from "../interfaces/test.ts";
import {CourseTestsService} from "../services/course.tests.service.ts";
import {CourseModulesService} from "../services/course.modules.ts";


export default function CourseTests () {

  const [tests, setTests] = useState<Test[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        const [tests, modules] = await Promise.all([
          CourseTestsService.getCourseTests(),
          CourseModulesService.getCourseModules()
        ]);
        const data = tests.map((test) => ({
          ...test,
          module_id: modules.find((module) => module.ID === test.module_id)?.title
        }));

        const transformedData = data.map((test) => ({
          ...test,
          questions: test.questions?.map((question) => ({
            content: question.content,
            test_id: question.test_id,
            answer: question.answer
          }))
        }));

        setTests(transformedData);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        console.error(error);
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await CourseTestsService.deleteCourseTest(id);
      const data: Test[] = await CourseTestsService.getCourseTests();
      setTests(data);
    } catch (error) {
      setError(error as Error);
    }
  };

  const columns: TableColumn<Test>[] = [
    { key: "ID", label: "ID" },
    { key: "title", label: "Заголовок" },
    { key: "questions",  label: "Вопросы"},
    { key: "module_id", label: "Модуль" },
    // { key: "DeletedAt", label: "Дата удаления"},
    // { key: "CreatedAt", label: "Дата создания"},
    // { key: "updatedAt", label: "Дата обновления"},

  ];

  return (
    <>
      {loading && "Loading..."}
      {error && "Error"}
      <Table onDelete={handleDelete} modelType={"tests"} data={tests} columns={columns} />
    </>
  )
}