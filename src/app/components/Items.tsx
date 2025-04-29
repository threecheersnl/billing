'use client';

import { useEffect, useMemo, useState } from 'react';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import PaymentInstruction from './PaymentInstruction';
import BillNumber from './BillNumber';

const DEFAULT_TAX = 21;

type Item = {
  name: string;
  quantity: number;
  price: number;
};

const SESSION_KEY = 'ITEMS';

export default function Items() {
  const [billNumber, setBillNumber] = useState<string>();
  const [items, setItems] = useState<Item[]>([{ name: '', quantity: 1, price: 0 }]);

  const totalWithoutTax = useMemo(
    () => items.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2),
    [items]
  );

  const totalWithTax = useMemo(
    () =>
      items
        .reduce((total, item) => total + item.quantity * item.price * (1 + DEFAULT_TAX / 100), 0)
        .toFixed(2),
    [items]
  );

  useEffect(() => {
    try {
      const data = sessionStorage.getItem(SESSION_KEY);
      if (data) {
        setItems(JSON.parse(data));
      }
    } catch {}
  }, []);

  const handleItemChange = (index: number, field: keyof Item, value: string) => {
    const newItems = [...items];
    if (field === 'quantity' || field === 'price') {
      newItems[index][field] = (value ? Number(value) : value) as unknown as number;
    } else {
      newItems[index][field] = value;
    }
    setItems(newItems);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(newItems));
  };

  const addItem = () => {
    setItems([...items, { name: '', quantity: 1, price: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const printPrice = (value: string | number) => {
    if (typeof value === 'number') {
      return value.toFixed(2);
    }

    return value;
  };

  return (
    <>
      <BillNumber billNumber={billNumber} setBillNumber={setBillNumber} />
      <div>
        <table className="w-full table-auto border-collapse mb-8 text-sm">
          <thead className="border-b border-gray-300 text-xs">
            <tr>
              <th className="p-2 text-left align-baseline">Aantal</th>
              <th className="p-2 text-left align-baseline">Beschrijving</th>
              <th className="p-2 text-right align-baseline">Bedrag</th>
              <th className="p-2 print:hidden"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="p-2 align-baseline">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    className="input"
                  />
                  <p className="hidden print:block">{item.quantity}</p>
                </td>
                <td className="p-2 align-baseline">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                    className="input"
                  />
                  <span className="hidden print:block">{item.name}</span>
                </td>
                <td className="p-2 text-right align-baseline">
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                    className="input text-right"
                  />
                  <span className="hidden print:block">€{printPrice(item.price)}</span>
                </td>
                <td className="p-2 print:hidden">
                  <button
                    title="Delete this row"
                    onClick={() => removeItem(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <CiCircleMinus size={28} />
                  </button>

                  {index + 1 === items.length && (
                    <button
                      title="Add new row"
                      onClick={addItem}
                      className="text-green-500 hover:text-green-700"
                    >
                      <CiCirclePlus size={28} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="text-sm font-semibold">
            <tr>
              <td className="p-2 text-right" colSpan={2}>
                Totaalbedrag excl. btw
              </td>
              <td className="p-2 text-right">€{totalWithoutTax}</td>
            </tr>
            <tr>
              <td className="p-2 text-right" colSpan={2}>
                Totaalbedrag incl. 21% btw
              </td>
              <td className="p-2 text-right">€{totalWithTax}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <PaymentInstruction billNumber={billNumber} amount={totalWithTax} />
    </>
  );
}
