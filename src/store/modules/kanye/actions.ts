import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// NO! export const getKanyeQuote = createAction("kanye/getKanyeQuote");
// => 비동기니까 createAction 대신 createAsyncThunk 사용

export const getKanyeQuote = createAsyncThunk("kanye/kanyeQuote", async () => {
  const response = await axios.get("https://api.kanye.rest/");
  return response.data;
});
