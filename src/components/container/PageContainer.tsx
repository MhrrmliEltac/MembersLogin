const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-[100%] flex justify-center items-center md:mt-10 mt-3">{children}</div>;
};

export default PageContainer;
