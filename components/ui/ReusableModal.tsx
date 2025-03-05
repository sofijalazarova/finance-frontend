import Modal from "./Modal";

interface ReusableModalProps {
  title: string;
  triggerText: string;
  buttonClass?: string;
  children: React.ReactNode;
}

export default function ReusableModal({
  title,
  triggerText,
  buttonClass,
  children,
}: ReusableModalProps) {
  return (
    <Modal>
      <Modal.Open opens={title}>
        <button className={buttonClass}>{triggerText}</button>
      </Modal.Open>
      <Modal.Window name={title}>{children}</Modal.Window>
    </Modal>
  );
}
