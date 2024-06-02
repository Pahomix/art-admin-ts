import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {CourseModule} from "../../interfaces/courseModule.ts";
import {CourseModulesService} from "../../services/course.modules.ts";
import {Test} from "../../interfaces/test.ts";
import {CourseTestsService} from "../../services/course.tests.service.ts";

interface FormFields {
  title: string;
  module_id: number;
}

const schema = yup.object({
  title: yup.string().required('Необходимо ввести заголовок теста'),
  module_id: yup.number().required('Необходимо выбрать модуль'),
}).required();

interface TestFormProps {
  initialValues: Test;
  modelType: string;
}

export default function TestForm({ initialValues }: TestFormProps) {
  const { pathname } = useLocation();
  const isAddMode = pathname.includes("/add/");

  const { register, handleSubmit, formState: { errors } } = useForm<FormFields>({
    defaultValues: {
      ...initialValues,
    },
    resolver: yupResolver(schema) as any,
  });

  const [modules, setModules] = useState<CourseModule[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const data: CourseModule[] = await CourseModulesService.getCourseModules();
        setModules(data);
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };

    fetchModules();
  }, []);

  const onSubmit = async (data: FormFields) => {
    const testData = {
      ...initialValues,
      ...data
    };

    try {
      if (isAddMode) {
        await CourseTestsService.createCourseTest(testData);
      } else {
        await CourseTestsService.updateCourseTest(initialValues.ID, testData);
      }
      navigate('/tests');
    } catch (error) {
      console.error("Error submitting test:", error);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center flex-1">
      <div className="flex flex-col items-center justify-center gap-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-10 space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Заголовок теста</label>
              <input
                {...register('title')}
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Заголовок теста"
              />
              {errors.title && <p className="text-red-600">{errors.title.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Модуль</label>
              <select
                {...register('module_id')}
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Выберите модуль</option>
                {modules.map((module) => (
                  <option key={module.ID} value={module.ID}>
                    {module.title}
                  </option>
                ))}
              </select>
              {errors.module_id && <p className="text-red-600">{errors.module_id.message}</p>}
            </div>
          </div>
          <button type="submit" className="h-10 px-4 text-sm font-medium text-white bg-blue-600 rounded-md
          focus:outline-none focus-visible:ring-2  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            {isAddMode ? 'Создать' : 'Сохранить'}
          </button>
        </form>
      </div>
    </div>
  );
}
