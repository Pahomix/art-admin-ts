import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {Users} from "../../interfaces/users.ts";
import {UsersService} from "../../services/users.service.ts";
import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

interface FormFields {
  username: string;
  email: string;
  password: string;
  role: string;
  avatar: FileList | null;
}

const schema = yup.object({
  username: yup.string().required('Необходимо ввести имя пользователя'),
  email: yup.string().email('Неверный формат email').required('Необходимо ввести email'),
  password: yup.string().required('Необходимо ввести пароль'),
  role: yup.string().required('Необходимо выбрать роль'),
  avatar: yup.mixed().required('Необходимо выбрать файл'),
}).required();

interface UserFormProps {
  initialValues: Users;
  modelType: string;
}

export default function UserForm({ initialValues }: UserFormProps) {

  const {pathname} = useLocation()
  const isAddMode = pathname.includes("/add/")

  const { register, handleSubmit } = useForm<FormFields>({
    defaultValues: {
      ...initialValues,
      avatar: null,
    },
    resolver: yupResolver(schema) as any,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const onSubmit = async (data: FormFields) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('role', data.role);
    if (data.avatar && data.avatar.length > 0) {
      formData.append('avatar', data.avatar[0]);
    }

    if (isAddMode) {
      try {
        await UsersService.createUser(formData);
        navigate('/users');
      } catch (error) {
        console.error("Error creating user:", error);
      } finally {
        setLoading(false);
      }
      return;
    } else {
      try {
        await UsersService.updateUser(initialValues.ID, formData);
        navigate('/users');
      } catch (error) {
        console.error("Error updating user:", error);
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
                <label className="text-sm font-medium">Имя пользователя</label>
                <input {...register('username')} className="border-input bg-background ring-offset-background
                      placeholder:text-muted-foreground focus-visible:ring-ring
                      flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0
                      file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none
                      focus-visible:ring-2 focus-visible:ring-offset-2
                      disabled:cursor-not-allowed disabled:opacity-50" type="text" placeholder="Имя пользователя"/>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input {...register('email')} className="border-input bg-background ring-offset-background
                      placeholder:text-muted-foreground focus-visible:ring-ring
                      flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0
                      file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none
                      focus-visible:ring-2 focus-visible:ring-offset-2
                      disabled:cursor-not-allowed disabled:opacity-50" type="text" placeholder="Email"/>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Пароль</label>
                <input {...register('password')} className="border-input bg-background ring-offset-background
                      placeholder:text-muted-foreground focus-visible:ring-ring
                      flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0
                      file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none
                      focus-visible:ring-2 focus-visible:ring-offset-2
                      disabled:cursor-not-allowed disabled:opacity-50" type="password" placeholder="Пароль"/>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Роль</label>
                <input {...register('role')} className="border-input bg-background ring-offset-background
                      placeholder:text-muted-foreground focus-visible:ring-ring
                      flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0
                      file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none
                      focus-visible:ring-2 focus-visible:ring-offset-2
                      disabled:cursor-not-allowed disabled:opacity-50" type="text" placeholder="Роль"/>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Аватар</label>
                <input {...register('avatar')} className="border-input bg-background ring-offset-background
                      placeholder:text-muted-foreground focus-visible:ring-ring
                      flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0
                      file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none
                      focus-visible:ring-2 focus-visible:ring-offset-2
                      disabled:cursor-not-allowed disabled:opacity-50" type="file"/>
              </div>
            </div>
          </div>
          <button type="submit" disabled={loading} className="h-10 px-4 text-sm font-medium text-white bg-blue-600 rounded-md
          focus:outline-none focus-visible:ring-2  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            {loading ? 'Загрузка...' : 'Подтвердить'}
          </button>
        </form>
      </div>
    </div>
      );
      }
