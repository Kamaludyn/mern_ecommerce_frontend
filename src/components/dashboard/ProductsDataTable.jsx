import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProductsDataTable = ({
  products,
  globalFilter,
  handleDelete,
  handleEdit,
}) => {
  // Template for rendering product images
  const imageBodyTemplate = (rowData) => (
    <img
      src={rowData.image.secure_url}
      alt={rowData.name}
      style={{ width: "50px", height: "50px", objectFit: "cover" }}
      onError={(e) => {
        e.target.src = "default-image-url.png";
      }}
    />
  );

  // Template for rendering action icons (Edit and Delete)
  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-3">
      <FaEdit
        className="text-lime-400 cursor-pointer"
        onClick={() => handleEdit(rowData)}
      />
      <FaTrash
        className="text-rose-600 cursor-pointer"
        onClick={() => handleDelete(rowData)}
      />
    </div>
  );
  return (
    <DataTable
      value={products}
      paginator
      rows={10}
      rowsPerPageOptions={[5, 10, 25, 50]}
      tableStyle={{
        minWidth: "100%",
        border: "1px solid #d1d5db",
      }}
      globalFilter={globalFilter}
      className="mb-10 "
      rowHover
    >
      <Column header="Image" body={imageBodyTemplate} />
      <Column
        field="name"
        header="Name"
        filter
        filterPlaceholder="Search by name"
        filterMatchMode="contains"
        sortable
      />
      <Column
        field="category.name"
        header="Category"
        filter
        filterPlaceholder="Search by category"
        filterMatchMode="contains"
        sortable
      />
      <Column field="price" header="Price" sortable />
      <Column field="countInStock" header="Count In Stock" sortable />
      <Column header="Actions" body={actionBodyTemplate} />
    </DataTable>
  );
};

export default ProductsDataTable;
