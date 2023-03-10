import React from 'react'


import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';




export default function ArticleList({ label,articles }) {
    const navigate=useNavigate();
    const handleArticleClick = (articleName) => {
        navigate(`/article/${articleName}`);
    };
    const style={
        margin:'auto auto',display: 'flex',flexDirection:'row',justifyContent: 'center',alignItems: 'center'
    }
    return (
        <>
        <div style={style}>
           
            <Card.Title style={{margin:'1rem 1rem'}}>{label}</Card.Title>
            <Card.Title>total articles : {articles.length}</Card.Title>
            </div>
            <div style={{marginBottom:'5rem'}}>
            {
                articles.map((article) => (
                    <Card key={article.id} className="my-2 mx-auto" style={{ maxWidth: "30rem" , margin:'0px'}}>
                        <Card.Body>
                            <Card.Title className="text-primary" onClick={() => handleArticleClick(article.name)} style={{ cursor: 'pointer' }}>
                                {article.name}
                            </Card.Title>
                            <div>
                            <h6 style={{float:'left',clear:'none',margin:'0px 10px'}}>
                                 Views : {article.views}
                            </h6>
   
                            <h6>
                                Likes : {article.likes}
                                </h6>
                                </div>
                            <Card.Text className="text-secondary">
                                {article.summary}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))
            }


        </div>
        </>
    )
}

// import React from 'react'

// import { Card } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';


// export default function ArticleList({ label,articles }) {
//     const navigate=useNavigate();

//     const handleArticleClick = (articleName) => {
//         navigate(`/article/${articleName}`);
//     };
//     return (
//         <div>
            
//             <Card.Title>{label}</Card.Title>
//             {
//                 articles.map((article) => (
//                     <Card key={article.id} className="my-5 mx-auto" style={{ maxWidth: "30rem" }}>
//                         <Card.Body>
//                             <Card.Title className="text-primary" onClick={() => handleArticleClick(article.name)} style={{ cursor: 'pointer' }}>
//                                 {article.name}
//                             </Card.Title>
//                             <Card.Text className="text-secondary">
//                                 {article.summary}
//                             </Card.Text>
//                         </Card.Body>
//                     </Card>
//                 ))
//             }

//         </div>
//     )
// }
