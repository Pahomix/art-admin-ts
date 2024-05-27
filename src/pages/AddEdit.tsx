import UserForm from "../components/form/UserForm.tsx";
import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Users} from "../interfaces/users.ts";
import {UsersService} from "../services/users.service.ts";




export default function Edit() {
  const {pathname} = useLocation()
  const isAddMode = pathname.includes("/add/")
  const { modelType, id } = useParams();
  const [initialValues, setInitialValues] = useState<
    Users | null>(null);
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
    </>
  )
}