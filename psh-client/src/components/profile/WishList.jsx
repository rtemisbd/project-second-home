import { Typography, Card } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/UserProvider";
import axios from "axios";
import { serverBaseUrl } from "../../serverApi/baseUrl";

export default function WishList() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userPhone = user?.phone;
        const { data } = await axios.get(
          `${serverBaseUrl}/wishlist/user/${userPhone}`
        );

        setData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="md:p-0 sm:p-2">
      {/* <div className="md:hidden sm:block">
        <MenuList />
      </div> */}
      <h2 className="mb-5 text-[32px] py-2 font-bold">Wish-list</h2>
      {data?.length > 0 ? (
        <Card className="h-full w-full lg:overflow-hidden md:overflow-x-scroll sm:overflow-x-scroll mt-4">
          <table className="w-full min-w-max table-auto text-left border">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2 ">
                  <Typography className="font-normal leading-none opacity-70">
                    Property Picture
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2">
                  <Typography className="font-normal leading-none opacity-70">
                    Name
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2">
                  <Typography className="font-normal leading-none opacity-70">
                    Branch
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2">
                  <Typography className="font-normal leading-none opacity-70">
                    Category
                  </Typography>
                </th>

                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2">
                  <Typography className="font-normal leading-none opacity-70">
                    Details
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, i) => {
                const formattedDate = new Date(
                  item?.createdAt
                ).toLocaleString();

                return (
                  <tr className="even:bg-blue-gray-50/50  border " key={i}>
                    <td className="p-2 border">
                      <img
                        src={item?.property?.photos[0]}
                        alt=""
                        style={{ width: 120 }}
                      />
                    </td>
                    <td className="p-2 border">
                      <Typography className="font-normal ">
                        {item?.property?.name}
                      </Typography>
                    </td>
                    <td className="p-2 border">
                      <Typography className="font-normal">
                        {item?.property?.branch?.name}
                      </Typography>
                    </td>

                    <td className="p-2 border">
                      <Typography className="font-normal">
                        {item?.roomType}
                      </Typography>
                    </td>

                    <td className="p-2 border">
                      <Link
                        to={`/${item?.property?.category}/${item?.property?.name}/${item?.property?._id}`}
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      ) : (
        <p className="text-red-500 text-center text-xl">Whislist Not Found</p>
      )}
    </div>
  );
}
