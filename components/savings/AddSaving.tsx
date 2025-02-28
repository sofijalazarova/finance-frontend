import { Button } from "@/components/ui/button";
import Modal from "../../components/ui/Modal";
import CreateSavingForm from "./CreateSavingForm";

function AddSaving() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="saving-form">
          <Button>Add saving goal</Button>
        </Modal.Open>
        <Modal.Window name="saving-form">
          <CreateSavingForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddSaving;
