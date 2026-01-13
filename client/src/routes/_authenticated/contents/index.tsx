import { Table } from '@/components/table';
import { columnHelper } from '@/components/table/utils';
import { api } from '@/lib/axios/config';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/_authenticated/contents/')({
  component: ContentList,
});

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
  }),
  columnHelper.accessor('title', {
    header: 'Title',
  }),
  columnHelper.accessor('description', {
    header: 'Description',
    cell: (info) =>
      typeof info.getValue() === 'string'
        ? String(info.getValue()).split(' ').slice(0, 5).join(' ') + '...'
        : info.getValue(),
  }),
  columnHelper.accessor('author', {
    header: 'Author',
  }),
  columnHelper.accessor('version', {
    header: 'Version',
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

function ContentList() {
  const navigate = useNavigate();
  const [contentList, setContentList] = useState([]);

  useEffect(() => {
    const getAllContentList = async () => {
      const contentList = await api.get('/content/list');

      setContentList(contentList.data?.data ?? []);
    };

    getAllContentList();
  }, []);
  return (
    <div id="contents">
      <h3 className="mb-8 text-3xl font-light">Contents</h3>
      <Table
        searchPlaceholder="Search Contents, Knowledge or Artifacts"
        actions={
          <button
            className="bg-gray-700 text-white"
            onClick={() => navigate({ to: '/contents/add' })}
          >
            Add
          </button>
        }
        data={contentList}
        columns={columns}
      />
    </div>
  );
}
