import { Table } from '@/components/table';
import { columnHelper } from '@/components/table/utils';
import { api } from '@/lib/axios/config';
import { createFileRoute } from '@tanstack/react-router';
import { View } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const Route = createFileRoute('/_authenticated/awaiting-documents/')({
  component: AwaitingDocuments,
});

function AwaitingDocuments() {
  const [checkAwaitingDocumentList, setCheckAwaitingDocumentList] = useState(
    []
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const passGDPRCheck = async (content: any) => {
    console.log({ content });

    try {
      await api.put(`/content/${content.id}`, {
        isGDPRChecked: true,
      });

      toast.success('GDPR Check passed for content ' + content.id);
    } catch {
      toast.error('GDPR Check not updated!!');
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const passNLPCheck = async (content: any) => {
    console.log({ content });

    try {
      await api.put(`/content/${content.id}`, {
        isNLPCheckPassed: true,
      });

      toast.success('GDPR Check passed for content ' + content.id);
    } catch {
      toast.error('GDPR Check not updated!!');
    }
  };

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
    columnHelper.display({
      id: 'actions',
      header: () => <div className="text-center">Actions</div>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cell: ({ row }: { row: any }) => (
        <div className="flex items-center justify-end">
          <div className="flex gap-2 w-[270px]">
            <button>
              <View size={18} />
            </button>
            {!row.original?.isGDPRChecked && (
              <button
                className="bg-green-700"
                onClick={() => passGDPRCheck(row.original)}
              >
                Pass GDPR
              </button>
            )}
            {!row.original?.isNLPCheckPassed && (
              <button
                className="bg-green-700"
                onClick={() => passNLPCheck(row.original)}
              >
                Pass NLP
              </button>
            )}
          </div>
        </div>
      ),
    }),
  ];

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
