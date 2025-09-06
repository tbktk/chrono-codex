const Loading = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Loading Time Logs...</h1>
      <div className="space-y-4 animate-pulse">
        <div className="h-4 border rounded-md shadow-sm bg-gray-200 h-20"></div>
        <div className="h-4 border rounded-md shadow-sm bg-gray-200 h-20"></div>
        <div className="h-4 border rounded-md shadow-sm bg-gray-200 h-20"></div>
      </div>
    </div>
  );
};

export default Loading;