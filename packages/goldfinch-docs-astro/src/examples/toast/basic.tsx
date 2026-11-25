import { useCallback } from "react";
import {
  Button,
  Toasty,
  useGoldfinchToastManager,
} from "@catiarodrigues/goldfinch";

function ShowToastButton() {
  const toast = useGoldfinchToastManager();
  const addToast = useCallback(() => {
    toast.add({
      title: "Hello!",
      description: "This is a toast notification.",
    });
  }, [toast]);
  return <Button onClick={addToast}>Show Toast</Button>;
}

// Toasts render inside <Toasty>; the hook must be used below it.
export default function ToastBasic() {
  return (
    <Toasty>
      <ShowToastButton />
    </Toasty>
  );
}
