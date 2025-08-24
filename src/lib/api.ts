import axios from "axios";

const api = axios.create({
	// baseURL: "https://misterteedata.onrender.com",
	baseURL: "https://kingdata.onrender.com",
	// Your backend URL
});

export default api;
