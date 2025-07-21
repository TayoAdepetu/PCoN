import defaultAvatar from "../../assets/Images/UserImages/defaultAvatar.png";
import { RootState } from "../../Store/rootReducer";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const myDetails = useSelector((state: RootState) => state.auth.user); // Check if user is authenticated

  console.log(myDetails);

  return (
    <>
      {myDetails && (
        <Helmet>
          <title>{`Profile - ${myDetails.name}`}</title>
          <meta
            name="description"
            content={`View the profile of ${myDetails.name}, a ${myDetails.role?.name || "user"} at our platform.`}
          />
          <meta property="og:title" content={`Profile - ${myDetails.name}`} />
          <meta
            property="og:description"
            content={`Explore ${myDetails.name}'s profile, including email and role.`}
          />
        </Helmet>
      )}

      <div className="flex flex-col gap-5 w-full">
        <div className="relative rounded-xl overflow-hidden">
          <div className="absolute top-0 bottom-0 bg-[#1B632580] w-[60%] md:w-[40%] p-5">
            <div className="flex flex-col justify-self-start h-full">
              <div className="mb-auto"></div>
              <img
                src={myDetails?.avatar || defaultAvatar}
                alt="Profile Picture"
                className="object-cover w-24 h-24 rounded-full"
              />
              <div className="flex flex-col gap-2 text-white mt-3">
                <h3 className="text-2xl font-bold">{`${myDetails?.name}`}</h3>
                <p className="text-sm font-medium">{myDetails?.email}</p>
                <p className="text-sm font-medium">{myDetails?.role?.name}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center mt-4"></div>
      </div>
    </>
  );
};

export default Profile;
