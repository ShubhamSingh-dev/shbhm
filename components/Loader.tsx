// components/Loader.tsx
export default function Loader() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-[9999] transition-opacity duration-700">
      <div className="flex flex-col items-center">
        <span className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></span>
        <p className="mt-4 font-medium">Loading...</p>
      </div>
    </div>
  );
}
