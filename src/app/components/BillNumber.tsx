'use client';

import { useCallback, useEffect } from 'react';
import { RiRefreshLine } from 'react-icons/ri';

const SESSION_KEY = 'BILL_NUMBER';

export default function BillNumber({
  billNumber,
  setBillNumber,
}: {
  billNumber?: string;
  setBillNumber: (value: string) => void;
}) {
  const generateNewBill = useCallback(() => {
    const now = new Date();
    const formatted =
      now.getFullYear().toString() +
      String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0') +
      String(now.getHours()).padStart(2, '0') +
      String(now.getMinutes()).padStart(2, '0') +
      String(now.getSeconds()).padStart(2, '0');
    setBillNumber(formatted);
    sessionStorage.setItem(SESSION_KEY, formatted);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      const data = sessionStorage.getItem(SESSION_KEY);
      if (data) {
        setBillNumber(data);
      } else {
        generateNewBill();
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generateNewBill]);

  return (
    <div className="mb-4">
      <h2 className="text-sm font-bold mb-2 flex gap-2 items-center">
        {`Factuur: ${billNumber}`}

        <button
          title="Generate new bill number"
          className="text-green-500 hover:text-green-700 print:hidden"
          onClick={generateNewBill}
        >
          <RiRefreshLine size={24} />
        </button>
      </h2>
    </div>
  );
}
