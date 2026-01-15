import { addData, getData } from "../firebase/firestore";

const COLLECTION_NAME = "work_logs";

export const addWork = async (workData) => {
    return await addData(COLLECTION_NAME, workData);
};

export const fetchAllWorks = async () => {
    return await getData(COLLECTION_NAME);
};
