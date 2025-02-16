import { Button } from "@/components/ui/button";

interface ConfirmDeleteProps {
  resourceName: string;
  onConfirm: () => void;
  onCloseModal?: () => void;
  disabled: boolean;
}

function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
}: ConfirmDeleteProps) {
  return (
    <div className="flex flex-col gap-2">
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button disabled={disabled} onClick={onCloseModal}>
          Cancel
        </Button>
        <Button disabled={disabled} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
