export const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''} ${children ? 'filled' : ''}`;

  const renderSquareContent = () => {
    if (children === "❌") {
      return <img src="/x.svg" alt="triangle" />;
    }
    if (children === "⭕") {
      return <img src="/o.svg" alt="circle" />;
    }
    return children;
  };

  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleClick} className={className}>
      {renderSquareContent()}
    </div>
  );
};
