import { Button } from "@/components/ui/button";
import Modal from "./Modal";
import CreateAccountForm from "./CreateAccountForm";

function AddAccount() {
    return (
      <div>
        <Modal>
          <Modal.Open opens="account-form">
            <Button>Add account</Button>
          </Modal.Open>
          <Modal.Window name="account-form">
            <CreateAccountForm />
          </Modal.Window>
        </Modal>
      </div>
    );
  }

  export default AddAccount;