import { useDispatch } from "react-redux";
import SearchBoxWithNav from "./SearchBoxWithNav";
import { placeSearchBoxShow } from "../../redux/reducers/smProfileMenuSlice";

const SearchBoxSm = ({highestPrice}) => {
  const reduxDispatch = useDispatch();

  return (
    <div className="searchBoxSm mt-0">
      <div
        className="searchButton flex justify-between items-center "
        onClick={() => reduxDispatch(placeSearchBoxShow(true))}
      >
        <h5 className="text-black text-[1rem] ps-3">
          {" "}
          Find Your Accommodation
        </h5>

        <div className="pr-3">
          {" "}
          <i className="fa fa-search mt-2" />
        </div>
      </div>
      <SearchBoxWithNav highestPrice={highestPrice} />
    </div>
  );
};

export default SearchBoxSm;
