import addImg from "./add_contact_icon.png";

function AddContactBtn() {
  return (
    <button
      type="button"
      className="btn btn-primary rounded-circle"
      id="chat-addbtn"
      data-bs-toggle="modal"
      data-bs-target="#addContactModal"
    >
      <img src={addImg} alt="add" className="chat-img" />
    </button>
  );
}
export default AddContactBtn;
