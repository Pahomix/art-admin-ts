import {useEffect, useState} from "react";
import {TableColumn} from "../interfaces/table.ts";
import Table from "../components/table/Table.tsx";
import {CourseModule} from "../interfaces/courseModule.ts";
import {CourseModulesService} from "../services/course.modules.ts";
import {CoursesService} from "../services/courses.service.ts";

export default function CourseModules() {
  const [courseModules, setCourseModules] = useState<CourseModule[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [courseModulesData, coursesData] = await Promise.all([
          CourseModulesService.getCourseModules(),
          CoursesService.getCourses(),
        ]);

        const courseMap = new Map(coursesData.map(course => [course.ID, course.name]));

        const updatedCourseModulesData = courseModulesData.map(courseModule => ({
          ...courseModule,
          course_id: courseMap.get(courseModule.course_id) || "Unknown Course",
        }));

        setCourseModules(updatedCourseModulesData);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await CourseModulesService.deleteCourseModule(id);
      const courseModulesData = await CourseModulesService.getCourseModules();

      // Re-fetch the courses and update the course map
      const coursesData = await CoursesService.getCourses();
      const courseMap = new Map(coursesData.map(course => [course.ID, course.name]));

      // Replace course_id with course name in courseModulesData
      const updatedCourseModulesData = courseModulesData.map(courseModule => ({
        ...courseModule,
        course_id: courseMap.get(courseModule.course_id) || "Unknown Course",
      }));

      setCourseModules(updatedCourseModulesData);
    } catch (error) {
      setError(error as Error);
    }
  };

  const columns: TableColumn<CourseModule>[] = [
    { key: "ID", label: "ID" },
    { key: "title", label: "Название курса" },
    { key: "description", label: "Описание курса" },
    { key: "course_id", label: "Курс" },
    // { key: "DeletedAt", label: "Дата удаления"},
    // { key: "CreatedAt", label: "Дата создания"},
    // { key: "UpdatedAt", label: "Дата обновления"},
  ];

  return (
    <>
      {loading && "Loading..."}
      {error && "Error"}
      <Table onDelete={handleDelete} modelType={"course_modules"} data={courseModules} columns={columns} />
    </>
  );
}
