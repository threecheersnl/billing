import BillGenerator from './features/BillGenerator';
import Save from './components/Save';

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 print:bg-white text-gray-950">
      <BillGenerator />
      <Save />
    </div>
  );
}
