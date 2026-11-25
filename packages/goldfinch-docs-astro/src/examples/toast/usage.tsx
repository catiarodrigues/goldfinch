import {
  Button,
  Toasty,
  createGoldfinchToastManager,
} from "@catiarodrigues/goldfinch";

// A manager created outside React can show toasts from anywhere
// (event handlers, API clients); pass it to <Toasty>.
const toastManager = createGoldfinchToastManager();

export default function Example() {
  return (
    <Toasty toastManager={toastManager}>
      <Button onClick={() => toastManager.add({ title: "Hello!" })}>
        Show Toast
      </Button>
    </Toasty>
  );
}
