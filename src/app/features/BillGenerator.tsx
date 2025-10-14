'use client';

import { useState } from 'react';
import ClientAddress from '../components/ClientAddress';
import Items from '../components/Items';
import OurDetails from '../components/OurDetails';

export default function BillGenerator() {
  const [withOutTax, setWithOutTax] = useState(false);

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 print:shadow-none print:rounded-none text-gray-950">
      <label className="mb-2 flex items-center text-sm print:hidden">
        <input
          type="checkbox"
          checked={withOutTax}
          onChange={(e) => setWithOutTax(e.target.checked)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <span className="ml-2">Exclude Tax</span>
      </label>
      <div className="flex justify-between">
        <ClientAddress />
        <OurDetails withOutTax={withOutTax} />
      </div>
      <Items withOutTax={withOutTax} />
    </div>
  );
}
