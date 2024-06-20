import axios from 'axios';

export const getDrugs = async (search: string) => {
  const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${search}`);

  return response.data;
};

export const getSpellingSuggestions = async (search: string) => {
  const response = await axios.get(
    `https://rxnav.nlm.nih.gov/REST/spellingsuggestions.json?name=${search}`
  );

  return response.data;
};

export const getNDCs = async (id: string) => {
  const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui/${id}/ndcs.json`);

  return response.data;
};
