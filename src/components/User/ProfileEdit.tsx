import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../Store/rootReducer";
import TextInput from "../Common/InputContainers/TextInput";
import PasswordInput from "../Common/InputContainers/PasswordInput";
import PrimaryButton from "../Common/Buttons/PrimaryButton";
import SecondaryButton from "../Common/Buttons/SecondaryButton";
import Spinner from "../Common/Spinner/Spinner";
import defaultAvatar from "../../assets/Images/UserImages/defaultAvatar.png";
import { Helmet } from "react-helmet-async";
import { updateUserProfile, changePassword, getUserData } from "../../helpers/helperFunctions";
import { onlineManager } from "@tanstack/react-query";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const ProfileEdit = () => {
  const myDetails = useSelector((state: RootState) => state.auth.user);

  const [loadingUser, setLoadingUser] = useState(true);
  const [userData, setUserData] = useState<User | null>(null);

  // Profile form state
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // Password form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  // Loading states for profile & password update
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);

  // Fetch user data (from API if online, else fallback to Redux)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoadingUser(true);
        let fetchedUser: User | null = null;

        if (onlineManager.isOnline()) {
          fetchedUser = await getUserData();
        }

        if (fetchedUser) {
          setUserData(fetchedUser);
        } else if (myDetails) {
          setUserData(myDetails);
        }

        const nameParts = (fetchedUser?.name || myDetails?.name || "").split(" ");
        setFirstName(fetchedUser?.name || nameParts[0] || "");
        setLastName(fetchedUser?.name || nameParts.slice(1).join(" ") || "");
        setEmail(fetchedUser?.email || myDetails?.email || "");
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        toast.error("Failed to load user data.");
        if (myDetails) setUserData(myDetails);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, [myDetails]);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim()) return toast.error("First name required");
    if (!lastName.trim()) return toast.error("Last name required");
    if (!email.trim()) return toast.error("Email required");
    if (!validateEmail(email)) return toast.error("Invalid email");

    try {
      setUpdatingProfile(true);
      await updateUserProfile({ first_name: firstName, last_name: lastName, email });
      toast.success("Profile updated successfully!");
    } catch (error: unknown) {
      const apiError = error as ApiError;
      toast.error(apiError.response?.data?.message || "Profile update error");
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword.trim()) return toast.error("Current password required.");
    if (!newPassword.trim()) return toast.error("New password required.");
    if (newPassword !== confirmNewPassword) return toast.error("Password mismatch.");

    try {
      setUpdatingPassword(true);
      await changePassword({
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmNewPassword,
      });
      toast.success("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setShowPasswordForm(false);
    } catch (error: unknown) {
      const apiError = error as ApiError;
      toast.error(apiError.response?.data?.message || "Password update error.");
    } finally {
      setUpdatingPassword(false);
    }
  };

  if (loadingUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {userData && (
        <Helmet>
          <title>{`Profile - ${userData.name}`}</title>
          <meta
            name="description"
            content={`View the profile of ${userData.name}, a ${userData.role?.name || "user"} at our platform.`}
          />
          <meta property="og:title" content={`Profile - ${userData.name}`} />
          <meta
            property="og:description"
            content={`Explore ${userData.name}'s profile, including email and role.`}
          />
        </Helmet>
      )}

      <div className="flex flex-col gap-6 w-full">
        {/* Header Section */}
        <div className="relative rounded-xl overflow-hidden">
          <div className="absolute top-0 bottom-0 bg-[#1B632580] w-[60%] md:w-[40%] p-5">
            <div className="flex flex-col justify-self-start h-full">
              <div className="mb-auto"></div>
              <img
                src={userData?.avatar || defaultAvatar}
                alt="Profile Picture"
                className="object-cover w-20 h-20 rounded-full"
              />
              <div className="flex flex-col gap-2 text-white mt-3">
                <h3 className="text-xl font-bold">{userData?.name}</h3>
                <p className="text-sm font-medium">{userData?.email}</p>
                <p className="text-sm font-medium">{userData?.role?.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Forms */}
        <div className="max-w-2xl mx-auto w-full">
          {/* Personal Information Form */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Personal Information</h2>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput title="First Name" value={firstName} setValue={(value) => setFirstName(String(value))} placeholder="Enter your first name" />
                <TextInput title="Last Name" value={lastName} setValue={(value) => setLastName(String(value))} placeholder="Enter your last name" />
              </div>
              <TextInput title="Email" value={email} setValue={(value) => setEmail(String(value))} placeholder="Enter your email" type="email" />
              <div className="flex gap-3 pt-4">
                <PrimaryButton type="submit" disabled={updatingProfile}>
                  {updatingProfile ? <Spinner /> : "Save Changes"}
                </PrimaryButton>
              </div>
            </form>
          </div>

          {/* Change Password Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Change Password</h2>
              {!showPasswordForm && (
                <SecondaryButton
                  onClick={() => setShowPasswordForm(true)}
                  style="border-primary-700 text-primary-700 hover:bg-primary-50"
                >
                  Change Password
                </SecondaryButton>
              )}
            </div>
            {showPasswordForm && (
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <PasswordInput title="Current Password" value={currentPassword} setValue={setCurrentPassword} placeholder="Enter current password" error={false} />
                <PasswordInput title="New Password" value={newPassword} setValue={setNewPassword} placeholder="Enter new password" error={false} />
                <PasswordInput title="Confirm Password" value={confirmNewPassword} setValue={setConfirmNewPassword} placeholder="Confirm new password" error={false} />
                <div className="flex gap-3 pt-4">
                  <PrimaryButton type="submit" disabled={updatingPassword}>
                    {updatingPassword ? <Spinner /> : "Save Changes"}
                  </PrimaryButton>
                  <SecondaryButton
                    onClick={() => {
                      setShowPasswordForm(false);
                      setCurrentPassword("");
                      setNewPassword("");
                      setConfirmNewPassword("");
                    }}
                    type="button"
                  >
                    Cancel
                  </SecondaryButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;
