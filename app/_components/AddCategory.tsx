import { Button } from "@/components/ui/button";
import Modal from "./Modal";
import CreateCategoryForm from "./CreateCategoryForm";

function AddCategory() {
    return (
      <div>
        <Modal>
          <Modal.Open opens="category-form">
            <button className="py-1 px-3 text-white bg-dark-teal-green hover:bg-emerald-green rounded-xl shadow-md transition-all">
            +
          </button>
          </Modal.Open>
          <Modal.Window name="category-form">
            <CreateCategoryForm />
          </Modal.Window>
        </Modal>
      </div>
    );
  }

  export default AddCategory;