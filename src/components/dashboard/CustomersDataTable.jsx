import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const CustomersDataTable = ({ customers, openForm, handleDelete }) => {
  // Template for rendering action icons (Edit and Delete)
  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-3">
      <FaEdit
        className="text-lime-400 cursor-pointer"
        onClick={() => openForm(rowData)}
      />
      <FaTrash
        className="text-rose-600 cursor-pointer"
        onClick={() => handleDelete(rowData)}
      />
    </div>
  );
  return (
    <DataTable
      value={customers}
      paginator
      rows={10}
      rowsPerPageOptions={[5, 10, 25, 50]}
      tableStyle={{
        minWidth: "100%",
        border: "1px solid #d1d5db",
      }}
      className="mb-10 "
      rowHover
    >
      <Column
        header="Full Name"
        body={(rowData) => `${rowData.surname} ${rowData.othername}`}
        filter
        filterPlaceholder="Search by name"
        filterMatchMode="contains"
        sortable
      />
      <Column
        field="phone"
        header="Phone"
        filter
        filterPlaceholder="Search by phone"
        filterMatchMode="contains"
        sortable
      />
      <Column
        field="email"
        header="Email"
        filter
        filterPlaceholder="Search by email"
        filterMatchMode="contains"
        sortable
      />
      <Column header="Actions" body={actionBodyTemplate} />
    </DataTable>
  );
};

export default CustomersDataTable;
