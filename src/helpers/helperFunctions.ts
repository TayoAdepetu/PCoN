import { onlineManager } from "@tanstack/react-query";
import { getData, putData, sendData } from "./apiCalls";
import { apis } from "../utils/apis";
import { getUser, saveUser } from "../services/IndexDB/userQueries";

export const getUserData = async (): Promise<User | null> => {
    try {
      if (onlineManager.isOnline()) {
        // Fetch from API if online
        const response = await getData(apis.userData);
  
        if (response?.data) {
          await saveUser(response.data); // Save to IndexedDB
          return response.data;
        } else {
          console.warn("User data API returned no data.");
          return null;
        }
      } else {
        // If offline, load from IndexedDB
        console.log("Offline: loading user data from cache.");
        const cachedUser = await getUser();
        if (cachedUser) return cachedUser;
  
        console.error("No cached user data available while offline.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);  
      return null;
    }
  };
  
  export const updateUserProfile = async (profileData: {
    first_name: string;
    last_name: string;
    email: string;
  }): Promise<unknown> => {
    try {
      if (!onlineManager.isOnline()) {
        console.warn("Cannot update profile while offline.");
        throw new Error("You are offline. Profile update cannot be completed.");
      }
  
      const response = await sendData(apis.updateProfile, profileData);
      return response;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };
  
  export const changePassword = async (passwordData: {
    current_password: string;
    new_password: string;
    confirm_password: string;
  }): Promise<unknown> => {
    try {
      if (!onlineManager.isOnline()) {
        console.warn("Cannot change password while offline.");
        throw new Error("You are offline. Password change cannot be completed.");
      }
  
      // Transform field names for the API
      const apiData = {
        current_password: passwordData.current_password,
        password: passwordData.new_password,
        password_confirmation: passwordData.confirm_password,
      };
  
      const response = await putData(apis.changePassword, apiData);
      return response;
    } catch (error) {
      console.error("Error changing password:", error);
      throw error;
    }
  };
  