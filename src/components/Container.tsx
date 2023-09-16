type Props = { children: React.ReactNode };

const Container = ({ children }: Props) => {
  return (
    <div className="self-center w-full h-full max-w-lg flex flex-col items-center">
      {children}
    </div>
  );
};

export default Container;
