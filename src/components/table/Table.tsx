import { TableProps } from "../../interfaces/table.ts";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Table<T extends { ID: number }>({ modelType, data, columns, onDelete }: TableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleDelete = async (item: number) => {
    try {
      await onDelete(item);
    } catch (e) {
      throw e;
    }
  };

  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedData = filteredData.sort((a, b) => {
    if (!sortKey) return 0;

    const aValue = a[sortKey as keyof T];
    const bValue = b[sortKey as keyof T];

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }

    const aString = String(aValue).toLowerCase();
    const bString = String(bValue).toLowerCase();

    if (sortOrder === 'asc') {
      return aString.localeCompare(bString);
    } else {
      return bString.localeCompare(aString);
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sortedData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex-1 overflow-x-hidden overflow-y-auto">
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Поиск..."
          className="rounded-md px-3 py-2 w-50 bg-gray-700 outline-none text-white"
        />
        <Link to={`/add/${modelType}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Добавить</Link>
      </div>
      <div id="table-to-export" className="relative overflow-x-auto shadow-md">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((column, index) => (
              <th key={index} scope="col" className="px-6 py-3">
                <button
                  className="focus:outline-none"
                  onClick={() => {
                    if (sortKey === column.key) {
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    } else {
                      setSortKey(String(column.key));
                      setSortOrder('asc');
                    }
                  }}
                >
                  {column.label} {sortKey === column.key && <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>}
                </button>
              </th>
            ))}
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Изменить</span>
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Удалить</span>
            </th>
          </tr>
          </thead>
          <tbody>
          {currentItems.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-6 py-4">
                  {column.key === 'avatar' ? (
                    <img src={String(row[column.key])} alt="Avatar" className="h-12 w-12 rounded-full object-cover" />
                  ) : (
                    String(row[column.key])
                  )}
                </td>
              ))}
              <td className="px-6 py-4 text-right">
                <Link to={`/edit/${modelType}/${row.ID}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Изменить</Link>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => handleDelete(row.ID)} type="button">Удалить</button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      <div className="flex">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`bg-gray-300 px-3 py-1 mx-1 rounded focus:outline-none ${currentPage === number ? 'bg-gray-500 text-white' : 'hover:bg-gray-400'}`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}
