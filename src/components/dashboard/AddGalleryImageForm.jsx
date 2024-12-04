import React from "react";
import { FaTimes } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";

const AddGalleryImageForm = ({
  handleSubmit,
  setGalleryForm,
  handleGalleryChange,
  handleImageChange,
  editMode,
  setEditMode,
  loading,
}) => {
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-[#00000054] flex justify-center items-center w-screen h-screen z-50">
      <form
        className="relative bg-white flex flex-col gap-3 w-2/4 p-6 rounded-md"
        onSubmit={handleSubmit}
      >
        <FaTimes
          className="absolute top-[7%] right-[4%] text-lg text-red cursor-pointer"
          onClick={() => (setGalleryForm(false), setEditMode(false))}
        />
        <label htmlFor="gallery_images" className="font-semibold">
          {editMode ? "Update Product Image" : "Add Gallery Images"}
        </label>
        <input
          className="border-b-2 border-gray-300 cursor-pointer hover:border-teal-700"
          type="file"
          name="gallery_images"
          multiple
          accept="image/*"
          onChange={editMode ? handleImageChange : handleGalleryChange}
        />
        <button
          className={`self-end md:self-start min-w-36 bg-teal-600 hover:bg-teal-700 text-lime-50 rounded-md py-1.5 px-3 ${
            loading && "cursor-not-allowed"
          } `}
          disabled={loading}
        >
          {loading ? (
            <ClipLoader color="#ffffff" size={18} className="m-[-3px]" />
          ) : editMode ? (
            "Update Product Image"
          ) : (
            "Add Image(s)"
          )}
        </button>
      </form>
    </section>
  );
};

export default AddGalleryImageForm;
