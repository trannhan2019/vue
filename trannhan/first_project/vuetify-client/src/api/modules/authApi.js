import publicAxios from "../client/public";

export const register = async (data) => {
  try {
    const res = await publicAxios.post("/auth/register", data);
    return { res };
  } catch (err) {
    return { err };
  }
};

export const login = async (data) => {
  try {
    const res = await publicAxios.post("/auth/login", data);
    return { res };
  } catch (err) {
    return { err };
  }
};
