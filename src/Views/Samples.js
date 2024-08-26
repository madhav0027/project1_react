import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import '../styles/sample.css'
import Searchbar from '../Components/searchbar';

function samples() {
    return(
        <div className="fluid-container" >
               <div className='container-fluid' id='sample-container'>
                    <div className='dash-heading'>
                        Free Loops and Samples !
                    </div>
                </div>
            <Searchbar/>
            <br/>
            
        </div>
    );
};

export default samples;