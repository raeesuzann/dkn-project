import { Table } from '@/components/table';
import { api } from '@/lib/axios/config';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import { columnHelper } from '@/components/table/utils';

export const Route = createFileRoute('/_authenticated/user-management/')({
  component: UserManagement,
});

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
  }),
  columnHelper.accessor('username', {
    header: 'Name',
  }),
  columnHelper.accessor('email', {
    header: 'Email',
  }),
  columnHelper.accessor('isActive', {
    header: 'Status',
    cell: (info) =>
      info.getValue() ? (
        <div className="text-xs py-0.5 px-3 bg-green-900 text-center rounded-2xl w-fit">
          Active
        </div>
      ) : (
        <div className="text-xs py-0.5 px-3 bg-red-900 text-center rounded-2xl w-fit">
          InActive
        </div>
      ),
  }),
];

function UserManagement() {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const getUserList = async () => {
      const result = await api.get('/user/list');

      setUserList(result.data.data);
    };

    getUserList();
  }, []);

  return (
    <div id="user-management">
      <h3 className="mb-8 text-3xl font-light">User Management</h3>
      <Table
        searchPlaceholder="Search Users"
        data={userList}
        columns={columns}
        actions={
          <button
            className="bg-gray-700 text-white"
            onClick={() => navigate({ to: '/user-management/add' })}
          >
            Add
          </button>
        }
      />
    </div>
  );
}
