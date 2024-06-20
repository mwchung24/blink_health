import {useState, useEffect} from 'react';
import {useQuery} from '@tanstack/react-query';
import {SearchBar} from '../components/SearchBar';
import {getDrugs, getSpellingSuggestions} from '../data-provider/data-service';
import {TDrug} from '../utils/types';
import {Header} from '../components/Header';
import styles from './SearchPage.module.css';

export const SearchPage = () => {
  const [drugName, setDrugName] = useState<string>('');

  const fetchDrugsQuery = useQuery({
    queryKey: ['drug' + drugName],
    queryFn: () => getDrugs(drugName),
    enabled: !!drugName,
  });

  const fetchSuggestions = useQuery({
    queryKey: ['suggestions' + drugName],
    queryFn: () => getSpellingSuggestions(drugName),
    enabled: !!drugName,
  });

  useEffect(() => {
    if (
      !fetchDrugsQuery?.data?.drugGroup?.conceptGroup &&
      fetchSuggestions?.data?.suggestionGroup?.suggestionList.suggestion
    ) {
      setDrugName(fetchSuggestions?.data?.suggestionGroup?.suggestionList.suggestion[0]);
      fetchDrugsQuery.refetch();
    }
  }, [fetchSuggestions?.data?.suggestionGroup?.suggestionList.suggestion]);

  const handleOnChange = (drugName: string): void => {
    setDrugName(drugName);
    fetchDrugsQuery.refetch();
  };

  const drugs = fetchDrugsQuery?.data?.drugGroup?.conceptGroup
    ?.map((drugGroup: {tty: string; conceptProperties: TDrug[]}) => {
      return drugGroup?.conceptProperties;
    })
    ?.flat()
    ?.map((drug: TDrug) => {
      return drug?.name;
    })
    .filter((drug: string) => drug);

  return (
    <div className={styles.searchPage}>
      <Header title="Drug Search" />
      <div className={styles.searchBarWrapper}>
        <div className={styles.label}>Search For Drugs!</div>
        <SearchBar handleOnChange={handleOnChange} drugs={drugs} name={drugName} />
        {drugName &&
          !fetchDrugsQuery?.data?.drugGroup?.conceptGroup &&
          !fetchDrugsQuery.isLoading && (
            <div className={styles.searchError}>
              Your search term returned no results. Please try again
            </div>
          )}
      </div>
    </div>
  );
};
