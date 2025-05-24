import User from "../models/User.js"


const getAllUsersFromDB =  async(payload) => {
    const { phone, usedPromo, role } = payload;
        const page = parseInt(payload?.page, 10) || 1;
        const size = parseInt(payload?.size, 10) || 10;
    
        const matchStage = {};
        if (phone && phone.trim() !== "")
          matchStage.phone = { $regex: `^${phone}` };
        // Add filter for usedPromo length > 1 if usedPromo is true
        if (usedPromo) {
          matchStage.$expr = {
            $gt: [{ $size: { $ifNull: ["$usedPromo", []] } }, 1],
          };
        }
        if (role && role !== "") matchStage.role = role;
    
        const pipeline = [
          { $match: matchStage },
          {
            $facet: {
              totalCount: [{ $count: "count" }],
              paginatedResults: [
                { $sort: { createdAt: -1 } },
                { $skip: (page - 1) * size },
                { $limit: size },
                {
                  $lookup: {
                    from: "branches",
                    localField: "branch",
                    foreignField: "_id",
                    as: "branch",
                  },
                },
                // { $project: { password: 0 } },
              ],
            },
          },
        ];
    
        const results = await User.aggregate(pipeline);
    
        // Extract total count and paginated results
        const totalCount = results[0]?.totalCount[0]?.count || 0;
        const users = results[0]?.paginatedResults || [];

        return {totalCount, currentPage: page, pageSize: size, users};
    
}

const getUserById = async (id)=>{
    const result = await User.findOne({_id :id});
    return result
}




export const userServices = {
    getAllUsersFromDB,
    getUserById
}