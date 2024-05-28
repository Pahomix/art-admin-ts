import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {CoursesService} from "../../services/courses.service.ts";
import {Course} from "../../interfaces/course.ts";

interface FormFields {
  name: string;
  description: string;
  background_image: FileList | null;
}

const schema = yup.object({
  name: yup.string().required('Необходимо ввести имя пользователя'),
  description: yup.string().required('Необходимо ввести пароль'),
  background_image: yup.mixed().required('Необходимо выбрать файл'),
}).required();

interface CourseFormProps {
  initialValues: Course;
  modelType: string;
}

export default function CourseForm({ initialValues }: CourseFormProps) {

  const {pathname} = useLocation()
  const isAddMode = pathname.includes("/add/")

  const { register, handleSubmit } = useForm<FormFields>({
    defaultValues: {
      ...initialValues,
      background_image: null,
    },
    resolver: yupResolver(schema) as any,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const onSubmit = async (data: FormFields) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    if (data.background_image && data.background_image.length > 0) {
      formData.append('background_image', data.background_image[0]);
    }

    if (isAddMode) {
      try {
        await CoursesService.createCourse(formData);
        navigate('/courses');
      } catch (error) {
        console.error("Error creating course:", error);
      } finally {
        setLoading(false);
      }
      return;
    } else {
      try {
        await CoursesService.updateCourse(initialValues.ID, formData);
        navigate('/courses');
      } catch (error) {
        console.error("Error updating course:", error);
      } finally {
        setLoading(false);
      }
    }

  };

  return (
    <div className="flex h-screen flex-col items-center justify-center flex-1">
      <div className="flex flex-col items-center justify-center gap-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-10 space-y-3">
            <div className="space-y-1">
              <div className="space-y-2">
                <input {...register('name')} className="border-input bg-background ring-offset-background
                      placeholder:text-muted-foreground focus-visible:ring-ring
                      flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0
                      file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none
                      focus-visible:ring-2 focus-visible:ring-offset-2
                      disabled:cursor-not-allowed disabled:opacity-50" type="text" placeholder="Название"/>
              </div>
              <div className="space-y-2">
                <input {...register('description')} className="border-input bg-background ring-offset-background
                      placeholder:text-muted-foreground focus-visible:ring-ring
                      flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0
                      file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none
                      focus-visible:ring-2 focus-visible:ring-offset-2
                      disabled:cursor-not-allowed disabled:opacity-50" type="text" placeholder="Описание курса"/>
              </div>
              <div className="space-y-2">
                <input {...register('background_image')} className="border-input bg-background ring-offset-background
                      placeholder:text-muted-foreground focus-visible:ring-ring
                      flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0
                      file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none
                      focus-visible:ring-2 focus-visible:ring-offset-2
                      disabled:cursor-not-allowed disabled:opacity-50" type="file"/>
              </div>
            </div>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Загрузка...' : 'Подтвердить'}
          </button>
        </form>
      </div>
    </div>
  );
}
