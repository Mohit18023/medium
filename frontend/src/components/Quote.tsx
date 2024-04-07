const Quote = () => {
  return (
    <div className="bg-slate-200 h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="max-w-md ">
          <div className="text-3xl text-centre font-bold">
            "The customer service I received was exceptional. The support team
            went above and below to address my concerns."
          </div>
          <div className="max-w-md mt-4  text-xl font-semibold">
            - John Doe
          </div>
          <div className="max-w-md  text-sm font-light">
            CEO | Acme corp
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
