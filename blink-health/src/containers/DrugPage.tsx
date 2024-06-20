import {useQuery} from '@tanstack/react-query';
import {getDrugs, getNDCs} from '../data-provider/data-service';
import {useParams, useLocation} from 'react-router-dom';
import {TDrug} from '../utils/types';
import {Header} from '../components/Header';
import {DrugInfo} from '../components/DrugInfo';
import {AssociatedNDCs} from '../components/AssociatedNDCs';

export const DrugPage = () => {
  let {drugName} = useParams();
  const location = useLocation();

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
      return drug?.name === location.state.name;
    })[0];

  const fetchNDCs = useQuery({
    queryKey: ['ndcs' + drug?.rxcui],
    queryFn: () => getNDCs(drug?.rxcui),
    enabled: !!drug?.rxcui,
  });

  return (
    <div>
      <Header title="Drug Details" />
      <DrugInfo drug={drug} />
      <AssociatedNDCs ndcs={fetchNDCs?.data?.ndcGroup?.ndcList?.ndc} />
    </div>
  );
};
