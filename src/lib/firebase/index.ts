import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import config from "./config";
import { getStorage } from "firebase/storage";

const app = initializeApp(config);
const storage = getStorage(app, "gs://e-shop-900cf.appspot.com");

export { storage };
