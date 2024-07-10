import { useNavigate } from "react-router-dom";
import styles from "./Button.module.css";

interface ButtonProps {
  text: string;
  color: string;
  navigateTo?: string;
  apiRequest?: () => Promise<void>;
}
export default function Button({
  text,
  color,
  navigateTo,
  apiRequest,
}: ButtonProps) {
  const navigate = useNavigate();

  const handleClick = async () => {
    if (apiRequest) {
      await apiRequest();
    }
    if (navigateTo) {
      navigate(navigateTo);
    }
  };

  return (
    <button
      className={styles.button}
      style={{ backgroundColor: color }}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}
