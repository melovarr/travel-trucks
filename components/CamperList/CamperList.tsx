import { Camper } from 'components/lib/api';
import CamperItem from '../CamperItem/CamperItem';

type CamperListProps = {
  campers: Camper[];
};

const CamperList: React.FC<CamperListProps> = ({ campers }) => {
  if (!Array.isArray(campers) || campers.length === 0) {
    return <p>No campers found.</p>;
  }

  return (
    <ul>
      {campers.map(camper => (
        <CamperItem key={camper.id} camper={camper} />
      ))}
    </ul>
  );
};

export default CamperList;
