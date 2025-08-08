import "../../style/_button.css";
import { scrollToSection } from "../../utils/scroll";

export default function CustomButton({
  type,
  target,
  onClick,
  className,
  style,
  children
}) {
  const handleClick = () => {
    if (type === "scroll") {
      scrollToSection(target);
    } else if (type === "download") {
      const link = document.createElement("a");
      link.href = target;
      link.download = target.split("/").pop();
      link.click();
    } else if (type === "modal") {
      onClick && onClick();
    } else if (type === "link") {
      window.location.href = target;
    }
  };

  const buttonClass = `custom-button ${
    type === "scroll"
      ? "btn-scroll"
      : type === "download"
      ? "btn-download"
      : type === "modal"
      ? "btn-modal"
      : type === "link"
      ? "btn-link"
      : ""
  } ${className || ""}`;

  return (
    <button onClick={handleClick} className={buttonClass} style={style}>
      {children}
    </button>
  );
}