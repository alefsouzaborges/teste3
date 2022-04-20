import '../LoadingPages/styles.css';
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
        <div className={'content-true'}>
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