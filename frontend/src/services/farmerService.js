import { getData, getDocumentById } from "../firebase/firestore";

const COLLECTION_NAME = "farmers";

export const getAllFarmers = async () => {
    return await getData(COLLECTION_NAME);
};

export const getFarmerDetails = async (id) => {
    return await getDocumentById(COLLECTION_NAME, id);
};

export const searchFarmers = async (queryTerm) => {
    const farmers = await getAllFarmers();
    if (!queryTerm) return farmers;

    const lowerQuery = queryTerm.toLowerCase();
    return farmers.filter(farmer =>
        farmer.name?.toLowerCase().includes(lowerQuery) ||
        farmer.id?.includes(queryTerm)
    );
};
