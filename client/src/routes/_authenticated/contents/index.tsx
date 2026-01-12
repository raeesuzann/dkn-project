import { Table } from '@/components/table';
import { columnHelper } from '@/components/table/utils';
import { api } from '@/lib/axios/config';
import { createFileRoute } from '@tanstack/react-router';
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
    cell: (info) => (info.getValue() ? '✅' : '❌'),
  }),
  columnHelper.accessor('createdAt', {
    header: 'Created Date',
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  }),
];

function ContentList() {
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
        actions={<button>Add</button>}
        data={contentList}
        columns={columns}
      />
    </div>
  );
}
