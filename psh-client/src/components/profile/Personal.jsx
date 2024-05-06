import useUser from "../../hooks/userUser";
import "./Personal.css";

function Personal() {
  const [singleUser] = useUser();

  return (
    <div className="md:p-0 sm:p-2 account-details">
      {/* <div className="md:hidden sm:block">
        <MenuList />
      </div> */}
      <h2 className="text-3xl font-bold border-b pb-3">Personal Details</h2>
      <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-4 xs:grid-cols-4">
        <div className="mt-6 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2 font-medium border-b pb-3 col-span-1">
          <span>User ID</span>
        </div>
        <div className="mt-6 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2 border-b pb-3 ">
          <span>{singleUser?._id}</span>
        </div>
        <div className="col-span-1 border-b pb-3 sm:hidden xs:hiddin xl:block lg:block md:block"></div>
        <div className="mt-6 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2 font-medium border-b pb-3">
          <span>Name</span>
        </div>
        <div className="mt-6 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2  border-b pb-3 ">
          <span>{singleUser?.firstName}</span>
        </div>
        <div className="col-span-1 border-b pb-3 sm:hidden xs:hiddin xl:block lg:block md:block"></div>
        <div className="mt-6 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2 font-medium border-b pb-3 ">
          <span>User Name</span>
        </div>
        <div className="mt-6 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2 border-b pb-3 ">
          <span>{singleUser?.userName ? singleUser?.userName : "Empty"}</span>
        </div>
        <div className="col-span-1 border-b pb-3 sm:hidden xs:hiddin xl:block lg:block md:block"></div>
        <div className="mt-6 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2 font-medium border-b pb-3 ">
          <span>Email Address</span>
        </div>
        <div className="mt-6 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2 border-b pb-3 ">
          <span>{singleUser?.email}</span>
        </div>
        <div className="col-span-1 border-b pb-3 sm:hidden xs:hiddin xl:block lg:block md:block"></div>
        <div className="mt-6 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2 font-medium border-b pb-3 ">
          <span>Phone</span>
        </div>
        <div className="mt-6 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2  border-b pb-3 ">
          <span>{singleUser?.phone ? singleUser?.phone : "Empty"}</span>
        </div>
        <div className="col-span-1 border-b pb-3 sm:hidden xs:hiddin xl:block lg:block md:block"></div>
        <div className="mt-6 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2 font-medium border-b pb-3 ">
          <span>Date of Birth</span>
        </div>
        <div className="mt-6 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2  border-b pb-3 ">
          <span>
            {" "}
            {singleUser?.dateOfBirth ? singleUser?.dateOfBirth : "Empty"}
          </span>
        </div>
        <div className="col-span-1 border-b pb-3 sm:hidden xs:hiddin xl:block lg:block md:block"></div>
        <div className="mt-6 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2 font-medium border-b pb-3 ">
          <span>National ID Number</span>
        </div>
        <div className="mt-6 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2  border-b pb-3 col-span-1">
          <span>
            {singleUser?.nationalId ? singleUser?.nationalId : "Empty"}
          </span>
        </div>
        <div className="col-span-1 border-b pb-3 sm:hidden xs:hiddin xl:block lg:block md:block"></div>
        <div className="mt-6 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2 font-medium border-b pb-3 ">
          <span>Nationality</span>
        </div>
        <div className="mt-6 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2  border-b pb-3 ">
          <span>
            {" "}
            {singleUser?.nationality ? singleUser?.nationality : "Empty"}
          </span>
        </div>
        <div className="col-span-1 border-b pb-3 sm:hidden xs:hiddin xl:block lg:block md:block"></div>
        <div className="mt-6 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2 font-medium border-b pb-3 ">
          <span>Gender</span>
        </div>
        <div className="mt-6 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2  border-b pb-3 ">
          <span>{singleUser?.gender ? singleUser?.gender : "Empty"}</span>
        </div>
        <div className="col-span-1 border-b pb-3 sm:hidden xs:hiddin xl:block lg:block md:block"></div>
        <div className="mt-6 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2 font-medium border-b pb-3 ">
          <span>Present Address</span>
        </div>
        <div className="mt-6 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2  border-b pb-3 ">
          <span>
            {singleUser?.presentAddress?.address
              ? singleUser?.presentAddress?.address
              : "Empty"}
          </span>
        </div>
        <div className="col-span-1 border-b pb-3 sm:hidden xs:hiddin xl:block lg:block md:block"></div>
        <div className="mt-6 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2 font-medium border-b pb-3">
          <span>Permanent Address</span>
        </div>
        <div className="mt-6 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2  border-b pb-3 ">
          <span>
            {singleUser?.permanentAddress?.address
              ? singleUser?.permanentAddress?.address
              : "Empty"}
          </span>
        </div>
        <div className="col-span-1 border-b pb-3 sm:hidden xs:hiddin xl:block lg:block md:block"></div>
        <div className="mt-6 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2 font-medium border-b pb-3 ">
          <span>Employment Status</span>
        </div>
        <div className="mt-6 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2  border-b pb-3 ">
          <span>
            {" "}
            {singleUser?.employmentStatus?.workAs
              ? singleUser?.employmentStatus?.workAs
              : "Empty"}
          </span>
        </div>
        <div className="col-span-1 border-b pb-3 sm:hidden xs:hiddin xl:block lg:block md:block"></div>
        <div className="mt-6 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2 font-medium border-b pb-3 ">
          <span>Monthly Income</span>
        </div>
        <div className="mt-6 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2  border-b pb-3 ">
          <span>
            {" "}
            {singleUser?.employmentStatus?.monthlyIncome
              ? singleUser?.employmentStatus?.monthlyIncome
              : "Empty"}
          </span>
        </div>
        <div className="col-span-1 border-b pb-3 sm:hidden xs:hiddin xl:block lg:block md:block"></div>
        <div className="mt-6 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2 font-medium border-b pb-3 ">
          <span>Emergency Contact Name</span>
        </div>
        <div className="mt-6 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2  border-b pb-3 ">
          <span>
            {" "}
            {singleUser?.emergencyContact?.contactName
              ? singleUser?.emergencyContact?.contactName
              : "Empty"}
          </span>
        </div>
        <div className="col-span-1 border-b pb-3 sm:hidden xs:hiddin xl:block lg:block md:block"></div>
        <div className="mt-6 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2 font-medium border-b pb-3 ">
          <span>Emergency Contact Relationship</span>
        </div>
        <div className="mt-6 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2 border-b pb-3 ">
          <span>
            {" "}
            {singleUser?.emergencyContact?.relation
              ? singleUser?.emergencyContact?.relation
              : "Empty"}
          </span>
        </div>
        <div className="col-span-1 border-b pb-3 sm:hidden xs:hiddin xl:block lg:block md:block"></div>
        <div className="mt-6 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2 font-medium border-b pb-3 ">
          <span>Emergency Contact Number</span>
        </div>
        <div className="mt-6 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2 border-b pb-3 ">
          <span>
            {" "}
            {singleUser?.emergencyContact?.phoneNumber
              ? singleUser?.emergencyContact?.phoneNumber
              : "Empty"}
          </span>
        </div>
      </div>
    </div>
  );
}
export default Personal;
