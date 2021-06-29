import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { useParams, useHistory, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { setPath } from "../../reducers/lastVisited";
import ShowRating from "../category/ShowRating";

const Search_results = ()=>{
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const {search} = useParams()

    const [results, setResults] = useState([]);
    const [errMessage, setErrMessage] = useState("");
    // const [isThereNextPage, setIsThereNextPage] = useState(false);

    // const previousPage = () => {
    //     if (page > 1) {
    //       setPage(page - 1);
    //     }
    //   };
    
    //   const nextPage = () => {
    //     if (businesses.length === 8) {
    //       setPage(page + 1);
    //     }
    //   };

    useEffect(async () => {
        dispatch(setPath(location.pathname))
        console.log('search', search)
       try {
        const searchResult = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}business/search/${search}`)
        console.log('results', searchResult)
        setResults(searchResult.data)
        
       } catch (error) {
       }
    }, [search])

    return (<>
    <div className="businesses">
        {results.map((elem, i) => {
          return (
            <Card
              key={i}
              style={{ width: `18rem` }}
              className="businessCard bg-dark text-white box"
              id="businessCard"
              onClick={(e) => {
                history.push(`/business/${elem.business_id}`);
              }}
            >
              <Card.Img variant="top" src={elem.main_img} />
              <Card.Body>
                <Card.Title>{elem.displayName}</Card.Title>
                <Card.Title>Price:{elem.booking_price}</Card.Title>
                <Card.Title>
                  {" "}
                  <ShowRating rate={elem.average_rating} />
                </Card.Title>
                <Card.Subtitle> </Card.Subtitle>
              </Card.Body>
            </Card>
          );
        })}
      </div>
      {/* <div className="paginationButtons">
       {page>1 ?  <a
          href="#"
          className="pagination"
          id="previous"
          onClick={() => previousPage()}
        >
          ❮
        </a>:""}
        {isThereNextPage ? (
          <a
            href="#"
            className="pagination"
            id="next"
            onClick={() => nextPage()}
          >
            ❯
          </a>
        ) : (
          ""
        )}
      </div> */}
      {errMessage}
    </>)
}

export default Search_results;