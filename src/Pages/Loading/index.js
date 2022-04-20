import '../Loading/styles.css';
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

function load ({addClasse}){
    let classNameLoad = '';
    let classNameLoad2 = '';
    if(addClasse === true){
         classNameLoad = 'loading-true'
         classNameLoad2 = 'content-true'
    }else{
         classNameLoad = 'loading-false'
         classNameLoad2 = 'content-false'
    }

    return(
        <div className={'content-true'}>
            {/* <span className={classNameLoad}>Carregando...</span> */}
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