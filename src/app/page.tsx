import ClientAddress from './components/ClientAddress';
import Items from './components/Items';
import OurDetails from './components/OurDetails';
import Save from './components/Save';

export default function BillGenerator() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 print:bg-white text-gray-950">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 print:shadow-none print:rounded-none text-gray-950">
        <div className="flex justify-between">
          <ClientAddress />
          <OurDetails />
        </div>
        <Items />
        <Save />
      </div>
    </div>
  );
}
