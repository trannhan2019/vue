import privateClient from "../client/private";

export const get = async () => {
  try {
    const res = await privateClient.get("/user");
    return { res };
  } catch (err) {
    return { err };
  }
};
