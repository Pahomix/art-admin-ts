import {useEffect, useState} from "react";
import {TableColumn} from "../interfaces/table.ts";
import Table from "../components/table/Table.tsx";
import {CoursesService} from "../services/courses.service.ts";
import {Course} from "../interfaces/course.ts";


export default function Courses () {

  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data: Course[] = await CoursesService.getCourses();
        setCourses(data);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await CoursesService.deleteCourse(id);
      const data: Course[] = await CoursesService.getCourses();
      setCourses(data);
    } catch (error) {
      setError(error as Error);
    }
  };

  const columns: TableColumn<Course>[] = [
    { key: "ID", label: "ID" },
    { key: "name", label: "Название курса" },
    { key: "background_image", label: "Изображение"},
    { key: "description", label: "Описание курса"},
    // { key: "DeletedAt", label: "Дата удаления"},
    // { key: "CreatedAt", label: "Дата создания"},
    // { key: "updatedAt", label: "Дата обновления"},

  ];

  return (
    <>
      {loading && "Loading..."}
      {error && "Error"}
      <Table onDelete={handleDelete} modelType={"courses"} data={courses} columns={columns} />
    </>
  )
}