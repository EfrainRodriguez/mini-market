import { MdRemove, MdAdd } from "react-icons/md";

import "./styles.css";

interface AddRemoveButtonProps {
  onAdd?: () => void;
  onRemove?: () => void;
}

const AddRemoveButton = ({
  onAdd = () => null,
  onRemove = () => null,
}: AddRemoveButtonProps) => {
  return (
    <div className="add-remove-button-wrapper">
      <button className="remove-button" onClick={onRemove}>
        <MdRemove />
      </button>
      <button className="add-button" onClick={onAdd}>
        <MdAdd />
      </button>
    </div>
  );
};

export default AddRemoveButton;
