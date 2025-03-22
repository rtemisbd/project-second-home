import franchise from "../../assets/img/static/Franchise Partners_prmo.jpg";
import victim from "../../assets/img/static/victims.jpeg";
import branch from "../../assets/img/static/Coming Soon!_promo.jpg";

const Franchise = () => {
  return (
    <div className="grid grid-cols-2 gap-1 lg:gap-4 items-end w-full">
      <img
        src={victim}
        alt=""
        className="promo_img h-[60px] md:h-[100px] w-[200px] lg:w-[434px] object-contain md:object-fill rounded-lg"
      />
      <img
        src={branch}
        className="promo_img h-[60px] md:h-[100px] w-[200px] lg:w-[434px] object-contain md:object-fill rounded-lg"
      />
    </div>
  );
};

export default Franchise;
