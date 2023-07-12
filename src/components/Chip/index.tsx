import "./styles.css";

interface ChipProps {
  label: string | number;
  className?: string;
}

const Chip = ({ label, className = "" }: ChipProps) => {
  return <div className={`chip ${className}`}>{label}</div>;
};

export default Chip;
