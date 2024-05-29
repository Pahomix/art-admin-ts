import {Link, useNavigate} from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();

  return (
    <>
      <aside id="default-sidebar"
             className=" top-0 left-0 z-40 w-auto h-screen"
             aria-label="Sidebar">
        <div className="h-full flex-1 px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link to="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="flex-1 ms-3 whitespace-nowrap">ADMIN PANEL</span>
              </Link>
            </li>
            <li>
              <Link to="/users" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="flex-1 ms-3 whitespace-nowrap">Пользователи</span>
              </Link>
            </li>
            <li>
              <Link to="/courses" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="flex-1 ms-3 whitespace-nowrap">Курсы</span>
              </Link>
            </li>
            <li>
              <Link to="/course_modules" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="flex-1 ms-3 whitespace-nowrap">Модули курсов</span>
              </Link>
            </li>
            <li>
              <Link to="/materials" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="flex-1 ms-3 whitespace-nowrap">Материалы модулей</span>
              </Link>
            </li>
            <li>
              <a href="#"
                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="flex-1 ms-3 whitespace-nowrap">Тесты модулей</span>
              </a>
            </li>
            <li>
              <Link to="/orders" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="flex-1 ms-3 whitespace-nowrap">Отзывы</span>
              </Link>
            </li>
            {/*<li>*/}
            {/*  <Link to="/promotions" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">*/}
            {/*    <span className="flex-1 ms-3 whitespace-nowrap">Акции</span>*/}
            {/*  </Link>*/}
            {/*</li>*/}
            {/*<li>*/}
            {/*  <Link to="/brands" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">*/}
            {/*    <span className="flex-1 ms-3 whitespace-nowrap">Бренды</span>*/}
            {/*  </Link>*/}
            {/*</li>*/}
            <li>
              <button onClick={() => {
                localStorage.clear();
                navigate('/login')
              }} type="button"  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="flex-1 ms-3 whitespace-nowrap">Выход</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  )
}