import { Table } from '@/components/table';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/user-management/')({
  component: UserManagement,
});

function UserManagement() {
  return (
    <div id="user-management">
      <h3 className="mb-8 text-3xl font-semibold">User Management</h3>
      <Table searchPlaceholder='Search Users' data={[]} columns={[]} actions={<button type='button'>Add</button>}/>
    </div>
  );
}
