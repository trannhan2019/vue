import privateClient from "../client/private";
import publicClient from "../client/public";

export const register = async (data) => {
  try {
    const res = await publicClient.post("/auth/register", data);
    return { res };
  } catch (err) {
    return { err };
  }
};

export const login = async (data) => {
  try {
    const res = await publicClient.post("/auth/login", data);
    return { res };
  } catch (err) {
    return { err };
  }
};
