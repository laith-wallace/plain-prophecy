export default function AdminLoading() {
  return (
    <div className="w-full h-full flex flex-col gap-6 animate-pulse">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-stone-800 rounded" />
        <div className="h-6 w-32 bg-stone-800 rounded" />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-28 bg-stone-900 border border-stone-800 rounded-xl" />
        ))}
      </div>
      
      <div className="h-64 bg-stone-900 border border-stone-800 rounded-xl w-full" />
    </div>
  );
}
