import {useEffect, useState} from "react";
import {TableColumn} from "../interfaces/table.ts";
import Table from "../components/table/Table.tsx";
import type {Users} from "../interfaces/users.ts";
import {UsersService} from "../services/users.service.ts";


export default function Users () {

  const [users, setUsers] = useState<Users[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data: Users[] = await UsersService.getUsers();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await UsersService.deleteUser(id);
      const data: Users[] = await UsersService.getUsers();
      setUsers(data);
    } catch (error) {
      setError(error as Error);
    }
  };

  const columns: TableColumn<Users>[] = [
    { key: "ID", label: "ID" },
    { key: "username", label: "Имя пользователя" },
    { key: "avatar", label: "Аватар"},
    { key: "email", label: "Email" },
    { key: "password", label: "Пароль"},
    { key: "role", label: "Роль"},
    { key: "progress", label: "Прогресс"},
    // { key: "courses", label: "Курсы"},
    // { key: "DeletedAt", label: "Дата удаления"},
    // { key: "CreatedAt", label: "Дата создания"},
    // { key: "UpdatedAt", label: "Дата обновления"},

  ];

  return (
    <>
      {loading && "Loading..."}
      {error && "Error"}
      <Table onDelete={handleDelete} modelType={"users"} data={users} columns={columns} />
    </>
  )
}