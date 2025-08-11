import axios from "axios";
import api from "./axios";

export const getFAQList = async (page, size, category, keyword = "") => {
  const res = await api.get(`/faq`, {
    params: { page, size, category, keyword },
  });
  return res.data;
};
