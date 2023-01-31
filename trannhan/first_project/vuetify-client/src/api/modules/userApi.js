import privateAxios from "../client/private";

export const get = async () => {
  try {
    const res = await privateAxios.get("/user");
    return { res };
  } catch (err) {
    return { err };
  }
};
