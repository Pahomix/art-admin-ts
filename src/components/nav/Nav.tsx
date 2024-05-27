import {Link} from "react-router-dom";

export default function Nav() {

  return (
    <>
      <aside id="default-sidebar"
             className=" top-0 left-0 z-40 w-64 h-screen"
             aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
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
              <Link to="/sneakers" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="flex-1 ms-3 whitespace-nowrap">Кроссовки</span>
              </Link>
            </li>
            <li>
              <Link to="/reviews" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="flex-1 ms-3 whitespace-nowrap">Отзывы</span>
              </Link>
            </li>
            <li>
              <Link to="/categories" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="flex-1 ms-3 whitespace-nowrap">Категории</span>
              </Link>
            </li>
            <li>
              <a href="#"
                 className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="flex-1 ms-3 whitespace-nowrap">История заказов</span>
              </a>
            </li>
            <li>
              <Link to="/orders" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="flex-1 ms-3 whitespace-nowrap">Заказы</span>
              </Link>
            </li>
            <li>
              <Link to="/promotions" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="flex-1 ms-3 whitespace-nowrap">Акции</span>
              </Link>
            </li>
            <li>
              <Link to="/brands" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="flex-1 ms-3 whitespace-nowrap">Бренды</span>
              </Link>
            </li>
            <li>
              <button onClick={() => {
                localStorage.clear();
                window.location.href = '/';
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