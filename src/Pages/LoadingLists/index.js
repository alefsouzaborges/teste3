import '../LoadingLists/styles.css';
import Lottie from 'react-lottie';
import LoadingANim from '../Loading/loading';


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
            height={150}
            width={150}
            isClickToPauseDisabled={true}
          />
        </div>
    )
}

export default load;