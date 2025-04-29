export default function PaymentInstruction({
  billNumber,
  amount,
}: {
  billNumber?: string;
  amount: string;
}) {
  return (
    <div className="text-sm mt-4">
      <p className="mb-4">Please pay within 14 days of receiving the invoice.</p>
      <p>{`Gelieve dit bedrag van €${amount} over te maken voor: 12/05/2025 op rekeningnummer:`}</p>
      <p>{`NL60 BUNQ 2150 0381 29 t.n.v. Three Cheers o.v.v. "Factuur ${billNumber}".`}</p>
    </div>
  );
}
