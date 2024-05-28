import UserForm from "../components/form/UserForm.tsx";
import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Users} from "../interfaces/users.ts";
import {Course} from "../interfaces/course.ts";
import {UsersService} from "../services/users.service.ts";
import {CoursesService} from "../services/courses.service.ts";
import CourseForm from "../components/form/CourseForm.tsx";




export default function Edit() {
  const {pathname} = useLocation()
  const isAddMode = pathname.includes("/add/")
  const { modelType, id } = useParams();
  const [initialValues, setInitialValues] = useState<
    Users | Course | null>(null);
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
    </>
  )
}