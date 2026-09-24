import PersonalInformationForm from "../components/PersonalInformationForm";

function PersonalInformation() {
  return (
    <>
      <div>
        <h1 className="text-app-secondary text-xl font-noto-serif-georgian">
          Personal information
        </h1>
      </div>
      <div className="mt-9">
        <PersonalInformationForm />
      </div>
    </>
  );
}

export default PersonalInformation;
