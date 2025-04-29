'use client';

export default function Save() {
  const onClick = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };
  return (
    <div className="text-center print:hidden mt-12">
      <button
        onClick={onClick}
        className="rounded-full bg-green-500 px-5 py-2 text-sm leading-5 font-semibold text-white hover:bg-green-700"
      >
        Print
      </button>
    </div>
  );
}
