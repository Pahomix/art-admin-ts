import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {Option, Question, Test} from "../../interfaces/test.ts";
import {CourseTestsService} from "../../services/course.tests.service.ts";
import {TestQuestionsService} from "../../services/test.questions.service.ts";
import {TestOptionsService} from "../../services/test.options.service.ts";

interface FormFields {
  test_id: number;
  content: string;
  options: Option[];
  answer: string;
}

const schema = yup.object({
  test_id: yup.number().required("Необходимо выбрать тест"),
  content: yup.string().required("Необходимо ввести вопрос"),
  answer: yup.string().required("Необходимо выбрать правильный ответ"),
}).required();

interface TestFormProps {
  initialValues: Question;
}

export default function QuestionForm({ initialValues }: TestFormProps) {
  const { pathname } = useLocation();
  const isAddMode = pathname.includes("/add/");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormFields>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      options: [
        { option: "" },
        { option: "" },
        { option: "" },
        { option: "" },
      ],
    },
  });
  const watchedOptions = watch("options")

  const [tests, setTests] = useState<Test[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTestsAndOptions = async () => {
      try {
        const [testsData, optionsData] = await Promise.all([
          CourseTestsService.getCourseTests(),
          !isAddMode
            ? TestOptionsService.getOptionsByQuestionId(initialValues?.ID || 0)
            : [],
        ]);

        setTests(testsData);
        if (!isAddMode) {
          reset({
            test_id: initialValues?.test_id || 0,
            content: initialValues?.content || "",
            options: optionsData,
            answer: initialValues?.answer || "",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTestsAndOptions();
  }, [initialValues, isAddMode, reset]);

  const onSubmit = async (data: FormFields) => {
    try {
      const questionData = {
        ...initialValues,
        ...data,
      };

      if (isAddMode) {
        await TestQuestionsService.createTestQuestion(questionData);
      } else {
        await TestQuestionsService.updateTestQuestion(
          initialValues.ID,
          questionData
        );
      }
      navigate("/questions");
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
              <label className="text-sm font-medium">Модуль</label>
              <select
                {...register("test_id")}
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Выберите модуль</option>
                {tests.map((test) => (
                  <option key={test.ID} value={test.ID}>
                    {test.title}
                  </option>
                ))}
              </select>
              {errors.test_id && (
                <p className="text-red-600">{errors.test_id.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Вопрос</label>
              <input
                {...register("content")}
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Вопрос"
              />
              {errors.content && (
                <p className="text-red-600">{errors.content.message}</p>
              )}
            </div>
            {watchedOptions.map((option, index) => (
              <div key={index} className="space-y-2">
                <label className="text-sm font-medium">{`Вариант ответа ${index + 1}`}</label>
                <input
                  {...register(`options[${index}].option`)}
                  className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder={`Вариант ответа ${index + 1}`}
                  onChange={(e) => {
                    setValue(`options[${index}].option`, e.target.value, {
                      shouldDirty: true,
                    });
                    watch(`options[${index}].option`);
                  }}
                />
              </div>
            ))}
            <div className="space-y-2 mt-4">
              <label className="text-sm font-medium">Правильный ответ</label>
              <select
                {...register("answer")}
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Выберите правильный вариант ответа</option>
                {watchedOptions.map((option, index) => (
                  <option key={index} value={option.option}>
                    {option.option}
                  </option>
                ))}
              </select>
              {errors.answer && (
                <p className="text-red-600">{errors.answer.message}</p>
              )}
            </div>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Подтвердить</button>
        </form>
      </div>
    </div>
  );
}

