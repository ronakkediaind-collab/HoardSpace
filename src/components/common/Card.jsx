export default function Card({
  children,
  className = "",
  hover = false,
  ...props
}) {
  return (
    <div
      className={`
        bg-card border border-border rounded-xl overflow-hidden
        ${
          hover
            ? "hover:shadow-lg hover:border-primary/30 transition-all duration-300 cursor-pointer"
            : ""
        }
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ children, className = "" }) {
  return (
    <div className={`p-4 border-b border-border ${className}`}>{children}</div>
  );
};

Card.Body = function CardBody({ children, className = "" }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

Card.Footer = function CardFooter({ children, className = "" }) {
  return (
    <div className={`p-4 border-t border-border ${className}`}>{children}</div>
  );
};
