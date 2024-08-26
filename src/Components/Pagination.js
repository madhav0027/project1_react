import react from 'react'

const paginate = ({totalpost,postperpage,paginate}) => {
    const pagenumber = [];  

    for(let i=1;i<= Math.ceil(totalpost/postperpage); i++){
        pagenumber.push(i)
    }

    return (
        <div className='pagination-container'>
            <ul className='pagination'>
                {pagenumber.map((number) => (
                     <a key={number} style={{borderRadius:'6px',height:'27px', width:'20px', marginBottom:'50px',fontFamily:('Roboto','sans-serif'),fontSize:'18px'}} onClick={() => {paginate(number)}} className="page-number">
                        {number}
                    </a>
            ))}
            </ul>
        </div>
    );
}

export default paginate;