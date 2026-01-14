import { Table } from '@/components/table';
import { columnHelper } from '@/components/table/utils';
import { api } from '@/lib/axios/config';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/_authenticated/policy/')({
  component: PolicyList,
});

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
  }),
  columnHelper.accessor('title', {
    header: 'Title',
  }),
  columnHelper.accessor('summary', {
    header: 'Summary',
    cell: (info) =>
      typeof info.getValue() === 'string'
        ? String(info.getValue()).split(' ').slice(0, 5).join(' ') + '...'
        : info.getValue(),
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
  columnHelper.accessor('createdAt', {
    header: 'Created Date',
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  }),
];

function PolicyList() {
  const navigate = useNavigate();
  const [policyList, setPolicyList] = useState([]);

  useEffect(() => {
    const getAllpolicyList = async () => {
      const policyList = await api.get('/policy/list');

      setPolicyList(policyList.data?.data ?? []);
    };

    getAllpolicyList();
  }, []);

  return (
    <div id="policies">
      <h3 className="mb-8 text-3xl font-light">Policies</h3>
      <Table
        searchPlaceholder="Search Policies"
        actions={
          <button
            className="bg-gray-700 text-white"
            onClick={() => navigate({ to: '/policy/add' })}
          >
            Add
          </button>
        }
        data={policyList}
        columns={columns}
      />
    </div>
  );
}
