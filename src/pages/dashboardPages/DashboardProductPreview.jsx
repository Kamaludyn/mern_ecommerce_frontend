import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import api from "../../services/api";
import Spinner from "../../components/Spinner";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";
import AddGalleryImageForm from "../../components/dashboard/AddGalleryImageForm";
import { FaAngleLeft } from "react-icons/fa";

const DashboardProductPreview = () => {
  // Extracts state passed via navigation and the product ID from the URL.
  const { state } = useLocation();
  const { id } = useParams();

  // Gets the authorization token from the AuthContext.
  const { token } = useContext(AuthContext);

  const navigate = useNavigate();

  // Initializes state variables for product data, gallery images, and UI state.
  const [product, setProduct] = useState(state?.product || []);
  const [galleryImages, setGalleryImages] = useState(
    state?.product?.gallery || []
  );
  const [productImage, setProductImage] = useState();
  const [galleryForm, setGalleryForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setloading] = useState(false);

  let hasGalleryImages = state?.product?.gallery.length > 0;

  // Handles changes in the gallery image input.
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setGalleryImages((prevGalleryImages) => [...prevGalleryImages, ...files]);
  };

  // Handles changes in the product image input.
  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  // Handles form submission for uploading images.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);

    try {
      if (editMode) {
        // Handles updating the main product image.
        const image = new FormData();
        image.append("product_image", productImage);

        const EditImageRes = await api.put(`/products/image/${id}`, image, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success(EditImageRes.data.message);
      } else {
        // Handles uploading gallery images.
        // Create an array of promises for each image upload
        const uploadPromises = galleryImages.map((image) => {
          const galleryFormData = new FormData();
          galleryFormData.append("gallery_image", image);

          // Return the promise for each API request
          return api.put(`/products/gallery/${id}`, galleryFormData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        });

        // Execute all gallery image uploads in parallel.
        const responses = await Promise.all(uploadPromises);
        toast.success("All images uploaded successfully!");
      }
    } catch (error) {
      if (error.message === "Network Error") {
        //Handles Network-related errors
        toast.error("Please check your network connection");
      } else {
        // Catch All (e.g., request setup issues)
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setGalleryForm(false); // Close the form
      setloading(false);
    }
  };

  // Toggles edit mode for updating the product image.
  const UpdateProductImage = async () => {
    setGalleryForm(true);
    setEditMode(true);
  };
  return (
    <section className="flex flex-col items-start min-h-screen">
      <header>
        <button
          className="px-6 py-1 my-4 rounded-lg shadow-md border border-gray-300"
          onClick={() => navigate("/dashboard/products")}
        >
          <FaAngleLeft className="inline mb-0.5" /> Back
        </button>
        <h1 className="text-h1">Product Preview</h1>
      </header>
      {product ? (
        <div className="bg-white border border-gray-300 shadow-uShape rounded-lg p-6 mt-5 min-w-4/5 md:w-10/12">
          <h1 className="text-lg md:text-2xl font-semibold md:font-bold mb-4 text-gray-800">
            Product Name: <span className="text-teal-700">{product.name}</span>
          </h1>
          <div className="flex flex-col md:justify-between md:flex-row gap-2 sm:text-lg">
            <div id="imageSection" className="flex flex-col gap-1.5 md:w-2/3">
              <div className="flex flex-col md:flex-row gap-1.5">
                <img
                  src={product?.image.secure_url || null}
                  alt={product?.name}
                  className={`w-full ${
                    !galleryImages && "md:w-full"
                  }md:w-1/2 h-full object-center rounded-lg`}
                />
                {hasGalleryImages && (
                  <div className="grid grid-cols-2 gap-1 w-full h-full md:w-3/5">
                    {galleryImages.map((image, index) => (
                      <img
                        key={index}
                        src={image.secure_url || null}
                        alt={product?.name}
                        className="w-full h-full max-h-80 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="flex md:text-base gap-1.5 w-full justify-self">
                <button
                  className="min-w-16 w-full md:w-[84%] bg-orange-500 hover:bg-orange-700 text-lime-50 rounded-md p-2 px-3"
                  onClick={UpdateProductImage}
                >
                  Update Product Image
                </button>
                <button
                  className="min-w-16 w-full md:w-1/2 bg-teal-500 hover:bg-teal-700 text-lime-50 rounded-md p-2 px-3"
                  onClick={() => setGalleryForm(true)}
                >
                  Add Gallery Images
                </button>
              </div>
            </div>
            <div
              id="detailsSection"
              className="flex flex-col gap-1.5 w-full md:w-2/6"
            >
              <p className="text-gray-700">
                <span className="font-bold text-gray-600">Category:</span>{" "}
                {product?.category?.name}
              </p>
              <p className="text-gray-700">
                <span className="font-bold text-gray-600">Price:</span> $
                {product?.price}
              </p>
              <p className="text-gray-700">
                <span className="font-bold text-gray-600">Stock:</span>{" "}
                {product?.countInStock} items
              </p>
              <p className="text-gray-700">
                <span className="font-bold text-gray-600">Description:</span>{" "}
                {product?.description}
              </p>
              <p className="text-gray-700">
                <span className="font-bold text-gray-600">IsFeatured:</span>{" "}
                {product?.isFeatured ? "IsFeatured" : "No"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <Spinner />
        </div>
      )}
      {galleryForm && (
        <AddGalleryImageForm
          handleSubmit={handleSubmit}
          setGalleryForm={setGalleryForm}
          handleGalleryChange={handleGalleryChange}
          handleImageChange={handleImageChange}
          loading={loading}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      )}
    </section>
  );
};

export default DashboardProductPreview;
