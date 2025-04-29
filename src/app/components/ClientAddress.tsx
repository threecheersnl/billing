'use client';

import { useEffect, useState } from 'react';

type ClientAddress = {
  clientName: string;
  streetName: string;
  houseNumber: string;
  postalCode: string;
  city: string;
};

const SESSION_KEY = 'CLIENT_ADDRESS';

export default function ClientAddress() {
  const [clientAddress, setClientAddress] = useState<ClientAddress>({
    clientName: '',
    streetName: '',
    houseNumber: '',
    postalCode: '',
    city: '',
  });

  useEffect(() => {
    try {
      const data = sessionStorage.getItem(SESSION_KEY);
      if (data) {
        setClientAddress(JSON.parse(data));
      }
    } catch {}
  }, []);

  const handleAddressChange = (field: keyof ClientAddress, value: string) => {
    const data = { ...clientAddress, [field]: value };
    setClientAddress(data);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
  };

  return (
    <div className="mb-4 self-end">
      <h2 className="text-sm font-bold mb-2 print:hidden">Client Address</h2>
      <div className="space-y-2 print:hidden">
        {/* Client Name */}
        <input
          type="text"
          placeholder="Client Name"
          value={clientAddress.clientName}
          onChange={(e) => handleAddressChange('clientName', e.target.value)}
          className="input"
        />

        {/* Street + House Number */}
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Street Name"
              value={clientAddress.streetName}
              onChange={(e) => handleAddressChange('streetName', e.target.value)}
              className="input"
            />
          </div>

          <div className="w-32">
            <input
              type="text"
              placeholder="House Number"
              value={clientAddress.houseNumber}
              onChange={(e) => handleAddressChange('houseNumber', e.target.value)}
              className="input"
            />
          </div>
        </div>

        {/* Postal Code + City */}
        <div className="flex gap-4">
          <div className="w-45">
            <input
              type="text"
              placeholder="Postal Code"
              value={clientAddress.postalCode}
              onChange={(e) => handleAddressChange('postalCode', e.target.value)}
              className="input"
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="City"
              value={clientAddress.city}
              onChange={(e) => handleAddressChange('city', e.target.value)}
              className="input"
            />
          </div>
        </div>
      </div>

      <div className="hidden print:block">
        <p className="font-semibold">{clientAddress.clientName}</p>
        <p>{`${clientAddress.streetName} ${clientAddress.houseNumber}`}</p>
        <p>{`${clientAddress.postalCode} ${clientAddress.city}`}</p>
      </div>
    </div>
  );
}
