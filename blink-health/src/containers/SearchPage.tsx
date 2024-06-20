import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {SearchBar} from '../components/SearchBar';
import {getDrugs} from '../data-provider/data-service';
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

  const handleOnChange = (drugName: string): void => {
    setDrugName(drugName);
    fetchDrugsQuery.refetch();
  };

  const drugs = fetchDrugsQuery?.data?.drugGroup?.conceptGroup
    ?.map((drugGroup: {tty: string; conceptProperties: TDrug[]}) => {
      return drugGroup?.conceptProperties;
    })
    ?.flat()
    .map((drug: TDrug) => {
      return drug?.name;
    });

  console.log('drugs', drugs);

  return (
    <div className={styles.searchPage}>
      <Header title="Drug Search" />
      <div className={styles.searchBarWrapper}>
        <div className={styles.label}>Search For Drugs!</div>
        <SearchBar handleOnChange={handleOnChange} drugs={drugs} />
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
