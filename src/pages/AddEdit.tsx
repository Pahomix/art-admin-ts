import UserForm from "../components/form/UserForm.tsx";
import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Users} from "../interfaces/users.ts";
import {Course} from "../interfaces/course.ts";
import {UsersService} from "../services/users.service.ts";
import {CoursesService} from "../services/courses.service.ts";
import CourseForm from "../components/form/CourseForm.tsx";
import {CourseModule} from "../interfaces/courseModule.ts";
import {CourseModulesService} from "../services/course.modules.ts";
import CourseModuleForm from "../components/form/CourseModuleForm.tsx";
import {CourseModuleMaterials} from "../interfaces/courseModuleMaterials.ts";
import {ModuleMaterialsService} from "../services/module.materials.service.ts";
import ModuleMaterialForm from "../components/form/ModuleMaterialForm.tsx";


export default function Edit() {
  const {pathname} = useLocation()
  const isAddMode = pathname.includes("/add/")
  const { modelType, id } = useParams();
  const [initialValues, setInitialValues] = useState<
    Users | Course | CourseModule | CourseModuleMaterials | null>(null);
  const parsedId = Number(id);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitialValues = async () => {
      if (!isAddMode) {
        try {
          switch (modelType) {
            case 'users':
              const user = await UsersService.getUserById(parsedId);
              setInitialValues(user);
              break;
            case 'courses':
              const course = await CoursesService.getCourseById(parsedId);
              setInitialValues(course);
              break;
            case 'course_modules':
              const courseModule = await CourseModulesService.getCourseModuleById(parsedId);
              setInitialValues(courseModule);
              break;
            case 'materials':
              const courseModuleMaterial = await ModuleMaterialsService.getMaterial(parsedId);
              setInitialValues(courseModuleMaterial);
              break;
            default:
              break;
          }
        } catch (error) {
          console.error('Error fetching initial values:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchInitialValues();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {modelType === 'users' ? (
        <UserForm initialValues={initialValues as Users} modelType={modelType} />
      ) : null}
      {modelType === 'courses' ? (
        <CourseForm initialValues={initialValues as Course} modelType={modelType} />
      ) : null}
      {modelType === 'course_modules' ? (
        <CourseModuleForm initialValues={initialValues as CourseModule} modelType={modelType} />
      ) : null}
      {modelType === 'materials' ? (
        <ModuleMaterialForm initialValues={initialValues as CourseModuleMaterials} modelType={modelType} />
      ) : null}
    </>
  )
}