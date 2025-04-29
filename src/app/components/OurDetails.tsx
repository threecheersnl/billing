import Image from 'next/image';
import logo from '../logo.png';

export default function OurDetails() {
  return (
    <div className="mb-4 text-sm text-right">
      <Image src={logo} width={100} height={100} alt="logo" className="mb-4 ml-auto" />
      <h1 className="font-semibold mb-2 text-md">Three Cheers</h1>
      <p>Btw-nummer: NL867667643B01</p>
      <p>KVK-nummer: 96574364</p>
      <p>IBAN: NL60 BUNQ 2150 0381 29</p>
      <p>BIC: BUNQNL2A</p>
    </div>
  );
}
