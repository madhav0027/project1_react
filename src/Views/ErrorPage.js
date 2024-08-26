import '../styles/errorpage.css'

const ErrorPage = () => {
    return(
        <div className="Errorpage">
            <h1 id="errorhead">Internal Server Error</h1>
            <h2 style={{color:'#ccc'}}>Unexpected Error <b></b></h2>
        </div>
    );
}

export default ErrorPage;