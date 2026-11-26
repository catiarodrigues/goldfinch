import { useState } from "react";
import { Toggle } from "@catiarodrigues/goldfinch";

// Stands in for your API call. This one always fails.
function saveSetting(_enabled: boolean) {
  return new Promise<void>((_resolve, reject) =>
    setTimeout(() => reject(new Error("Network error")), 1000),
  );
}

export default function ToggleSaveError() {
  const [enabled, setEnabled] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>();

  async function handleChange(next: boolean) {
    setEnabled(next); // move straight away
    setSaving(true);
    setError(undefined);
    try {
      await saveSetting(next);
    } catch {
      setEnabled(!next); // the setting didn't change, so the switch goes back
      setError("Couldn't save. Try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Toggle
      label="Weekly summary"
      checked={enabled}
      onCheckedChange={handleChange}
      transitioning={saving}
      error={error}
    />
  );
}
