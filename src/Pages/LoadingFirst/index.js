import '../LoadingLists/styles.css';
import Lottie from 'react-lottie';
import LoadingANim from '../LoadingFirst/load';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingANim,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

function load (){
    return(
        <div className={''}>
          <Lottie 
            options={defaultOptions}
            height={40}
            width={40}
            isClickToPauseDisabled={true}
          />
        </div>
    )
}

export default load;