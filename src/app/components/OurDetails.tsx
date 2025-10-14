// import Image from 'next/image';
import logo from '../logo.png';
import { WithoutTaxProps } from '../types';

export default function OurDetails({ withOutTax }: WithoutTaxProps) {
  return (
    <div className="mb-4 text-sm text-right">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logo.src} height={100} width={100} alt="logo" className="mb-4 ml-auto" />
      <h1 className="font-semibold mb-2 text-md">Three Cheers</h1>
      {!withOutTax && <p>Btw-nummer: NL867667643B01</p>}
      <p>KVK-nummer: 96574364</p>
      <p>IBAN: NL60 BUNQ 2150 0381 29</p>
      <p>BIC: BUNQNL2A</p>
    </div>
  );
}
