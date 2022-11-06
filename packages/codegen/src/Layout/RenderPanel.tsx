import SelectWidget from '../components/SelectWidget';

const RenderPanel = () => {
  return (
    <div className="flex flex-col flex-1 bg-brand-grey p-t-0">
      <div className="flex h-8 w-full bg-white b-brand-grey border-l-1 border-r-1 justify-end items-center p-x2">
        {/*  */}
      </div>
      <div className="flex flex-col h-[calc(100vh-5rem)] bg-white overflow-y-auto m-2 p-1 flex-col">
        {/*  */}
        <SelectWidget />
      </div>
    </div>
  );
};

export default RenderPanel;
