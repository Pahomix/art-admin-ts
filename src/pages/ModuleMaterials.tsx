import {useEffect, useState} from "react";
import {TableColumn} from "../interfaces/table.ts";
import Table from "../components/table/Table.tsx";
import {CoursesService} from "../services/courses.service.ts";
import {CourseModuleMaterials} from "../interfaces/courseModuleMaterials.ts";
import {ModuleMaterialsService} from "../services/module.materials.service.ts";

export default function ModuleMaterials() {
  const [moduleMaterials, setModuleMaterials] = useState<CourseModuleMaterials[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [moduleMaterialsData, coursesData] = await Promise.all([
          ModuleMaterialsService.getMaterials(),
          CoursesService.getCourses(),
        ]);

        const courseMap = new Map(coursesData.map(course => [course.ID, course.name]));

        const updatedCourseModulesData = moduleMaterialsData.map(courseModule => ({
          ...courseModule,
          course_id: courseMap.get(courseModule.course_id) || "Unknown Course",
        }));

        setModuleMaterials(updatedCourseModulesData);
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
      await ModuleMaterialsService.deleteMaterial(id);
      const materialsData = await ModuleMaterialsService.getMaterials();

      // Re-fetch the courses and update the course map
      const coursesData = await CoursesService.getCourses();
      const courseMap = new Map(coursesData.map(course => [course.ID, course.name]));

      // Replace course_id with course name in courseModulesData
      const updatedCourseModulesData = materialsData.map(courseModule => ({
        ...courseModule,
        course_id: courseMap.get(courseModule.course_id) || "Unknown Course",
      }));

      setCourseModules(updatedCourseModulesData);
    } catch (error) {
      setError(error as Error);
    }
  };

  const columns: TableColumn<CourseModuleMaterials>[] = [
    { key: "ID", label: "ID" },
    { key: "title", label: "Заголовок" },
    { key: "content", label: "Контент" },
    { key: "content_url", label: "Фото" },
    { key: "course_id", label: "Курс" },
    // { key: "DeletedAt", label: "Дата удаления"},
    // { key: "CreatedAt", label: "Дата создания"},
    // { key: "UpdatedAt", label: "Дата обновления"},
  ];

  return (
    <>
      {loading && "Loading..."}
      {error && "Error"}
      <Table onDelete={handleDelete} modelType={"materials"} data={moduleMaterials} columns={columns} />
    </>
  );
}
