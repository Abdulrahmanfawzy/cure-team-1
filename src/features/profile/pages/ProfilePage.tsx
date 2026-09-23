import ProfileSidebar from "../components/ProfileSidebar";

function ProfilePage() {
  return (
    <div className="main_container">
      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-4">
          <ProfileSidebar />
        </div>

        {/* Content */}
        <div className="col-span-8">
          {/* Title */}
          <h1 className="text-app-secondary text-xl font-noto-serif-georgian">
            Personal information
          </h1>

          <div className="grid grid-cols-12">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
