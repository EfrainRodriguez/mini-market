import "./styles.css";

interface ChipProps {
  label: string | number;
  className?: string;
}

const Chip = ({ label, className = "", ...rest }: ChipProps) => {
  return <div className={`chip ${className}`} {...rest}>{label}</div>;
};

export default Chip;
