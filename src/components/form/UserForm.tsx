import { useForm } from "react-hook-form";
// import {object, ObjectSchema, Schema} from "yup";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {Users} from "../../interfaces/users.ts";
import {UsersService} from "../../services/users.service.ts";

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

export default function UserForm({ initialValues }: UserFormProps ) {
  const { register, handleSubmit } = useForm<FormFields>({
    defaultValues: {
      ...initialValues,
      avatar: null,
    },
    resolver: yupResolver(schema) as any,
  });
  const onSubmit = (data: FormFields) => {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('role', data.role);
    if (data.avatar && data.avatar.length > 0) {
      formData.append('avatar', data.avatar[0]);
    }

    UsersService.createUser(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('username')} type="text" placeholder="Имя пользователя" />
      <input {...register('email')} type="text" placeholder="Email" />
      <input {...register('password')} type="password" placeholder="Пароль" />
      <input {...register('role')} type="text" placeholder="Роль" />
      <input {...register('avatar')} type="file" />
      <button type="submit">Подтвердить</button>
    </form>
  );
}
