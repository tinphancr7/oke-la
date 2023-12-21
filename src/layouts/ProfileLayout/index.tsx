import SidebarProfile from "@/components/sidebarProfile/SidebarProfile";
import React, { useState, useContext, useEffect } from "react";
import MainLayout from "../MainLayout";
import ProfileHeader from "@/components/profileHeader/ProfileHeader";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/AuthContext";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { logOutUser, user } = useContext(AuthContext);
  const [itemSelected, setItemSelected] = useState(0);
  const [itemHovered, setItemHovered] = useState(0);
  const [userProfile, setUserProfile] = useState<any>({});

  const getUserProfile = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogOut = () => {
    logOutUser();
    router.push("/");
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <MainLayout>
      <div className="xl:container md:mx-auto mx-4">
        <ProfileHeader />
        <div className="md:grid grid-cols-12 gap-10 ">
          <div className="col-span-3">
            <SidebarProfile
              setItemSelected={setItemSelected}
              itemSelected={itemSelected}
              setItemHovered={setItemHovered}
              itemHovered={itemHovered}
              onLogout={handleLogOut}
            />
          </div>
          {children}
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfileLayout;
