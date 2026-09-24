import PasswordManagementForm from "../components/PasswordManagementForm";

function PasswordManagement() {
  return (
    <>
      <div>
        <h1 className="text-app-secondary text-xl font-noto-serif-georgian">
          Password management
        </h1>
      </div>
      <div className="mt-9">
        <PasswordManagementForm />
      </div>
    </>
  );
}

export default PasswordManagement;
