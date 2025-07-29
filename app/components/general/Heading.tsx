

interface HeadingProps {
  center?: boolean;
  text: string;
  className?: string;
  onClick? : () => void
}

const Heading: React.FC<HeadingProps> = ({ center, text , className, onClick}) => {
  return (
    <div
      className={`text-slate-500 my-3 md:my-9 px-3 md:px-10 md:text-xl ${
        center ? "text-center" : "text-start"
      } ${className || ''}`} 
    >
      {text}
    </div>
  );
};

export default Heading;
