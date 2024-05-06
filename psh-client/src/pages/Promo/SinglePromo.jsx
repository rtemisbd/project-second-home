import { Link } from "react-router-dom";

const SinglePromo = ({ promo }) => {
  return (
    <div className="group relative">
      <Link to={`/promo/${promo._id}`} className="hover:text-black">
        <div className="relative w-full overflow-hidden rounded-lg group-hover:opacity-75">
          <img
            src={promo?.photos[0]}
            alt=""
            className="promo_img"
            style={{ width: "100%", height: "200px" }}
          />
        </div>
        <p className="mt-1 ">{promo?.promoName}</p>
      </Link>
    </div>
  );
};

export default SinglePromo;
