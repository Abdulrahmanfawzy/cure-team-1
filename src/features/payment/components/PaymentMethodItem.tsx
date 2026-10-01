import { Check } from "lucide-react";

import type { PaymentMethod } from "../types/payment.types";

interface PaymentMethodItemProps {
  method: PaymentMethod;
  selected: boolean;
  onSelect: () => void;
}

export default function PaymentMethodItem({
  method,
  selected,
  onSelect,
}: PaymentMethodItemProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-center justify-between rounded-xl px-4 py-4 transition ${
        selected ? "bg-green-50" : "bg-white hover:bg-gray-50"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-6 w-6 items-center justify-center rounded-full border ${
            selected
              ? "border-green-500 bg-green-500 text-white"
              : "border-gray-400"
          }`}
        >
          {selected && <Check size={15} />}
        </div>

        <span className="text-sm text-gray-500">{method.brand}</span>

        <span className="text-sm text-gray-500">•••• {method.last4}</span>
      </div>

      <span className="font-bold uppercase text-blue-700">{method.brand}</span>
    </button>
  );
}
