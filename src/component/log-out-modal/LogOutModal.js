import { Link } from "react-router-dom";

function LogOutModal() {
  return (
    <div
      className="modal fade"
      id="logoutModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Log-out
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">Are you sure you want to log-out?</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              No
            </button>
            <Link to={"/"}>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Yes
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LogOutModal;
