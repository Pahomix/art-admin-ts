import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {CourseModule} from "../../interfaces/courseModule.ts";
import {CourseModulesService} from "../../services/course.modules.ts";
import {Course} from "../../interfaces/course.ts";
import {CoursesService} from "../../services/courses.service.ts";

interface FormFields {
  course_id: number;
  title: string;
  description: string;
}

const schema = yup.object({
  title: yup.string().required('Необходимо ввести название модуля'),
  description: yup.string().required('Необходимо ввести описание модуля'),
  course_id: yup.number().required('Необходимо выбрать курс'),
}).required();

interface CourseModuleFormProps {
  initialValues: CourseModule;
  modelType: string;
}

export default function CourseModuleForm({ initialValues }: CourseModuleFormProps) {
  const { pathname } = useLocation();
  const isAddMode = pathname.includes("/add/");

  const { register, handleSubmit, formState: { errors } } = useForm<FormFields>({
    defaultValues: {
      ...initialValues,
    },
    resolver: yupResolver(schema) as any,
  });

  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data: Course[] = await CoursesService.getCourses();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const onSubmit = async (data: FormFields) => {
    setLoading(true);
    try {
      if (isAddMode) {
        await CourseModulesService.createCourseModule(data);
      } else {
        await CourseModulesService.updateCourseModule(initialValues.ID, data);
      }
      navigate('/course_modules');
    } catch (error) {
      console.error("Error submitting course module:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center flex-1">
      <div className="flex flex-col items-center justify-center gap-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-10 space-y-3">
            <div className="space-y-1">
              <div className="space-y-2">
                <input
                  {...register('title')}
                  className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Название"
                />
                {errors.title && <p className="text-red-600">{errors.title.message}</p>}
              </div>
              <div className="space-y-2">
                <input
                  {...register('description')}
                  className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Описание модуля"
                />
                {errors.description && <p className="text-red-600">{errors.description.message}</p>}
              </div>
              <div className="space-y-2">
                <select
                  {...register('course_id')}
                  className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Выберите курс</option>
                  {courses.map((course) => (
                    <option key={course.ID} value={course.ID}>
                      {course.name}
                    </option>
                  ))}
                </select>
                {errors.course_id && <p className="text-red-600">{errors.course_id.message}</p>}
              </div>
            </div>
          </div>
          <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            {loading ? 'Загрузка...' : 'Подтвердить'}
          </button>
        </form>
      </div>
    </div>
  );
}
