import axios from "axios";

export const fetchUsers = async () => {
  try {
    const response = await axios.get("../../public/data/users.json");
    return response.data;
  } catch (error) {
    console.error("Error fetching users data: ", error);
  }
};

export const fetchSubscriptions = async () => {
  try {
    const response = await axios.get("../../public/data/subscriptions.json");
    return response.data;
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
  }
};
