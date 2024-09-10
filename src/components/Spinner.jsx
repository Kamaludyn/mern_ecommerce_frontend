import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "100px auto",
};

const Spinner = ({ loading }) => {
  return (
    <ClipLoader
      color="#088178"
      loading={loading}
      cssOverride={override}
      size={125}
    />
  );
};

export default Spinner;
