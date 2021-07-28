import Loader from 'react-loader-spinner';
import { ContainerLoader } from './Loader.styles';
const Spinner = () => {
  return (
    <ContainerLoader>
      <Loader
        type="Puff"
        color="#3f51b5"
        width="250"
        height="250"
        timeout={3000} //3 secs
      />
    </ContainerLoader>
  );
};

export default Spinner;
