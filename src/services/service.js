import axios from "axios";

export const fetchUsers = async () => {
  try {
    const response = await axios.get("../data/users.json");
    return response;
  } catch (error) {
    console.error("Error fetching users data: ", error);
  }
};

export const fetchSubscriptions = async () => {
  try {
    const response = await axios.get("../data/subscriptions.json");
    return response;
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
  }
};
