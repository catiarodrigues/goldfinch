import { useState } from "react";
import { Combobox } from "@catiarodrigues/goldfinch";

const countries = [
  { value: "pt", label: "Portugal" },
  { value: "es", label: "Spain" },
  { value: "fr", label: "France" },
  { value: "de", label: "Germany" },
  { value: "it", label: "Italy" },
  { value: "nl", label: "Netherlands" },
  { value: "be", label: "Belgium" },
  { value: "ie", label: "Ireland" },
];

export default function ComboboxBasic() {
  const [country, setCountry] = useState<string | null>("pt");
  return (
    <div className="flex w-72 flex-col gap-2">
      <Combobox
        label="Country"
        items={countries}
        value={country}
        onValueChange={setCountry}
        placeholder="Search countries…"
        emptyMessage="No countries found"
      />
      <p className="text-sm text-goldfinch-subtle">
        Value: {country ?? "none"}
      </p>
    </div>
  );
}
