import { Modal, Button } from "@catiarodrigues/goldfinch";
import { useState } from "react";

export default function Example() {
  const [open, setOpen] = useState(false);
  return (
    <Modal.Root open={open} onOpenChange={setOpen}>
      <Modal.Trigger>
        <Button>Open Modal</Button>
      </Modal.Trigger>
      <Modal>
        <Modal.Title>Hello</Modal.Title>
        <Modal.Description>Modal content here.</Modal.Description>
        <Modal.Close>
          <Button>Close</Button>
        </Modal.Close>
      </Modal>
    </Modal.Root>
  );
}
