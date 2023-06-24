import { Link } from "react-router-dom";
import { useGetHomePageBookQuery } from "../../../services/clientSiteApi";
import HomeSlider from "./common/HomeSlider";
const Home = () => {
  const bookRes = useGetHomePageBookQuery();
  const book = bookRes?.data?.data


  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col"></div>
          <div className="col"></div>
        </div>
        <div>
          <div>
            <div className="mb-3">
              <h3>New Product</h3>
            </div>

            <HomeSlider book={book?.new_product} isLoading={bookRes?.isLoading} />
          </div>

          <div className="mt-5 ">
            <div className="mb-3">
              <h3>Most Read</h3>
            </div>
            <HomeSlider book={book?.most_read} isLoading={bookRes?.isLoading} />
          </div>
          <div className="col mt-5 text-center">
            <Link to="/allbook" className=" btn btn-primary btn-sm btn-library">View All Books</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
