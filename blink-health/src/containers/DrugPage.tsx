import {useQuery} from '@tanstack/react-query';
import {getDrugs} from '../data-provider/data-service';
import {useParams, useLocation} from 'react-router-dom';
import {TDrug} from '../utils/types';

export const DrugPage = () => {
  let {drugName} = useParams();
  const location = useLocation();

  console.log('drugName', drugName);
  console.log('location', location.state);

  const fetchDrugsQuery = useQuery({
    queryKey: ['drug' + drugName],
    queryFn: () => getDrugs(drugName || ''),
    enabled: !!drugName,
  });

  const drug = fetchDrugsQuery?.data?.drugGroup?.conceptGroup
    ?.map((drugGroup: {tty: string; conceptProperties: TDrug[]}) => {
      return drugGroup?.conceptProperties;
    })
    ?.flat()
    .filter((drug: TDrug) => {
      return drug.name === location.state.name;
    })[0];

  console.log('drug', drug);

  return <div>Drug Page</div>;
};
