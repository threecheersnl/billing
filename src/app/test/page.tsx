'use client';

import { useState, useEffect } from 'react';

type ClientAddress = {
  clientName: string;
  streetName: string;
  houseNumber: string;
  postalCode: string;
  city: string;
};

type Item = {
  name: string;
  quantity: number;
  price: number;
  taxRate: number; // 21% tax rate
};

export default function BillGenerator() {
  const [billNumber, setBillNumber] = useState('');
  const [clientAddress, setClientAddress] = useState<ClientAddress>({
    clientName: '',
    streetName: '',
    houseNumber: '',
    postalCode: '',
    city: '',
  });
  const [items, setItems] = useState<Item[]>([{ name: '', quantity: 1, price: 0, taxRate: 21 }]);

  useEffect(() => {
    const now = new Date();
    const formatted =
      now.getFullYear().toString() +
      String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0') +
      String(now.getHours()).padStart(2, '0') +
      String(now.getMinutes()).padStart(2, '0') +
      String(now.getSeconds()).padStart(2, '0');
    setBillNumber(`BILL-${formatted}`);
  }, []);

  const handleAddressChange = (field: keyof ClientAddress, value: string) => {
    setClientAddress({ ...clientAddress, [field]: value });
  };

  const handleItemChange = (index: number, field: keyof Item, value: string) => {
    const newItems = [...items];
    if (field === 'quantity' || field === 'price' || field === 'taxRate') {
      newItems[index][field] = Number(value);
    } else {
      newItems[index][field] = value;
    }
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { name: '', quantity: 1, price: 0, taxRate: 21 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return items.reduce(
      (total, item) => total + item.quantity * item.price * (1 + item.taxRate / 100),
      0
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 print:bg-white text-gray-950">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 print:shadow-none print:rounded-none text-gray-950">
        {/* Client Address */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Client Address</h2>
          <div className="space-y-2">
            {/* Client Name */}
            <div>
              <input
                type="text"
                placeholder="Client Name"
                value={clientAddress.clientName}
                onChange={(e) => handleAddressChange('clientName', e.target.value)}
                className="block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 print:hidden text-gray-950"
              />
              <p className="hidden print:block">{clientAddress.clientName}</p>
            </div>

            {/* Street + House Number */}
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Street Name"
                  value={clientAddress.streetName}
                  onChange={(e) => handleAddressChange('streetName', e.target.value)}
                  className="block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 print:hidden text-gray-950"
                />
                <p className="hidden print:block">{clientAddress.streetName}</p>
              </div>

              <div className="w-32">
                <input
                  type="text"
                  placeholder="House Number"
                  value={clientAddress.houseNumber}
                  onChange={(e) => handleAddressChange('houseNumber', e.target.value)}
                  className="block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 print:hidden text-gray-950"
                />
                <p className="hidden print:block">{clientAddress.houseNumber}</p>
              </div>
            </div>

            {/* Postal Code + City */}
            <div className="flex gap-4">
              <div className="w-40">
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={clientAddress.postalCode}
                  onChange={(e) => handleAddressChange('postalCode', e.target.value)}
                  className="block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 print:hidden text-gray-950"
                />
                <p className="hidden print:block">{clientAddress.postalCode}</p>
              </div>

              <div className="flex-1">
                <input
                  type="text"
                  placeholder="City"
                  value={clientAddress.city}
                  onChange={(e) => handleAddressChange('city', e.target.value)}
                  className="block w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 print:hidden text-gray-950"
                />
                <p className="hidden print:block">{clientAddress.city}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bill Number */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Bill Number</h2>
          <div className="p-3 bg-gray-100 border border-gray-300 rounded-lg font-mono print:bg-transparent print:border-none print:p-0 print:font-sans">
            {billNumber}
          </div>
        </div>

        {/* Bill Items - Table */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Items</h2>

          <table className="w-full table-auto border-collapse mb-8">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 text-left">Quantity</th>
                <th className="p-2 text-left">Item</th>
                <th className="p-2 text-left">Price</th>
                <th className="p-2 text-left">Price Including Tax</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 print:hidden text-gray-950"
                    />
                    <p className="hidden print:block">{item.quantity}</p>
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 print:hidden text-gray-950"
                    />
                    <p className="hidden print:block">{item.name}</p>
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 print:hidden text-gray-950"
                    />
                    <p className="hidden print:block">{item.price}</p>
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={item.taxRate}
                      disabled
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 print:hidden text-gray-950"
                    />
                    <p className="hidden print:block">
                      ${(item.quantity * item.price * (1 + 21 / 100)).toFixed(2)}
                    </p>
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => removeItem(index)}
                      className="text-red-500 hover:underline print:hidden"
                    >
                      Remove
                    </button>
                  </td>{' '}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={addItem}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 print:hidden"
            >
              Add Item
            </button>
          </div>

          {/* Total */}
          <div className="text-xl font-bold">
            Total (Including Tax): ${calculateTotal().toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
