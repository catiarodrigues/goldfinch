import { useState } from "react";
import { Button, Modal } from "@catiarodrigues/goldfinch";

export default function ModalBasic() {
  const [open, setOpen] = useState(false);
  return (
    <Modal.Root open={open} onOpenChange={setOpen}>
      <Modal.Trigger>
        <Button>Open Modal</Button>
      </Modal.Trigger>
      <Modal size="sm">
        <Modal.Title>Hello</Modal.Title>
        <Modal.Description className="pb-4 text-sm text-goldfinch-default">
          This is a modal example.
        </Modal.Description>
        <Modal.Close>
          <Button>Close</Button>
        </Modal.Close>
      </Modal>
    </Modal.Root>
  );
}
