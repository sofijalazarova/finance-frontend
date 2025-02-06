import { Button } from "@/components/ui/button";
import Modal from "./Modal";
import CreateCategoryForm from "./CreateCategoryForm";

function AddCabin() {
    return (
      <div>
        <Modal>
          <Modal.Open opens="cabin-form">
            {/* <Button>Add new category</Button> */}
            <button className="py-1 px-3 text-white bg-dark-teal-green hover:bg-emerald-green rounded-xl shadow-md transition-all">
            +
          </button>
          </Modal.Open>
          <Modal.Window name="cabin-form">
            <CreateCategoryForm />
          </Modal.Window>
        </Modal>
      </div>
    );
  }

  export default AddCabin;