import { Table } from '@/components/table';
import { api } from '@/lib/axios/config';
import { createFileRoute } from '@tanstack/react-router';
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
    cell: (info) => (info.getValue() ? 'Active' : 'Inactive'),
  }),
];

function UserManagement() {
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
        actions={<button type="button">Add</button>}
      />
    </div>
  );
}
