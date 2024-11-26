import { FaTimes } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";

const AddCategoryForm = ({
  handleInputClose,
  handleSubmit,
  categoryInput,
  setCategoryInput,
  formLoading,
  editMode,
}) => {
  return (
    <section className="bg-[#00000014] fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white w-[55%] py-6 flex flex-col items-center justify-center rounded-md shadow-2xl drop-shadow-xl"
      >
        <FaTimes
          className="absolute top-[10%] right-[5%] text-lg text-red cursor-pointer"
          onClick={handleInputClose}
        />
        <input
          type="text"
          name="category"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          className="w-4/5 md:w-3/4 pb-1 text-center mb-3 border-b-[1px] border-b-gray-300 focus:border-orange-500 hover:border-orange-500 outline-none"
          placeholder="Enter new category name"
          required
        />
        <button
          className={`bg-orange-500 md:w-1/4 p-2 py-2 mx-auto hover:bg-orange-600 text-lime-50 rounded-xl ${
            formLoading ? "cursor-not-allowed" : ""
          }`}
          disabled={formLoading}
        >
          {formLoading ? (
            <ClipLoader color="#ffffff" size={14} />
          ) : editMode ? (
            "Edit Category"
          ) : (
            "Add Category"
          )}
        </button>
      </form>
    </section>
  );
};

export default AddCategoryForm;
