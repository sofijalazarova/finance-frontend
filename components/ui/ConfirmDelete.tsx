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
    <div className="flex flex-col gap-4 p-5 my-4">
      <p className="text-center font-medium">
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div className="flex gap-4 items-center justify-center">
        <Button
          disabled={disabled}
          onClick={onCloseModal}
          className="w-1/3 md:p-6 font-inter border bg-almost-white rounded-xl border-silver-gray text-gray-700 hover:bg-gray-100 hover:border-gray-400 active:bg-gray-200 transition-all duration-300 ease-in-out"
        >
          Cancel
        </Button>
        <Button
          disabled={disabled}
          onClick={onConfirm}
          className="w-1/3 bg-red-800 text-white md:p-6 rounded-md  hover:bg-red-700 transition-all duration-300 ease-in-out cursor-pointer"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
