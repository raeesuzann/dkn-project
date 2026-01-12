import { Table } from '@/components/table';
import { columnHelper } from '@/components/table/utils';
import { api } from '@/lib/axios/config';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/_authenticated/awaiting-documents/')({
  component: AwaitingDocuments,
});

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
  }),
  columnHelper.accessor('title', {
    header: 'Title',
  }),
  columnHelper.accessor('author', {
    header: 'Author',
  }),
  columnHelper.accessor('isActive', {
    header: 'Status',
    cell: (info) => (info.getValue() ? '✅' : '❌'),
  }),
  columnHelper.accessor('isGDPRChecked', {
    header: 'GDPR Check',
    cell: (info) => (info.getValue() ? '✅' : '❌'),
  }),
  columnHelper.accessor('isNLPCheckPassed', {
    header: 'NLP Check',
    cell: (info) => (info.getValue() ? '✅' : '❌'),
  }),
  columnHelper.accessor('createdAt', {
    header: 'Created Date',
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  }),
];

function AwaitingDocuments() {
  const [checkAwaitingDocumentList, setCheckAwaitingDocumentList] = useState(
    []
  );

  useEffect(() => {
    const getAllCheckAwaitingContentList = async () => {
      const contentList = await api.get('/content/await-list');

      setCheckAwaitingDocumentList(contentList.data?.data ?? []);
    };

    getAllCheckAwaitingContentList();
  }, []);

  return (
    <div id="awaiting-documents">
      <h3 className="mb-8 text-3xl font-light">Approval Awaiting Documents</h3>
      <Table
        searchPlaceholder="Search new or Updated Contents, Knowledge or Artifacts"
        data={checkAwaitingDocumentList}
        columns={columns}
      />
    </div>
  );
}
