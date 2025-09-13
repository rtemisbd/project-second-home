import LeaseProperty from "../models/LeaseProperty.js";

const createLeasePropertyIntoDB = async (payload) => {
  const result = await LeaseProperty.create(payload);
  return result;
};

const getAllLeasePropertyFromDB = async (queries) => {
  const page = parseInt(queries?.page) || 1;
  const size = parseInt(queries?.size) || 10;

  let query = {};

  const pipeline = [
    { $match: query },

    {
      $facet: {
        paginatedResults: [
          { $sort: { createdAt: -1 } },
          ...(page >= 1 && size >= 1
            ? [{ $skip: (page - 1) * size }, { $limit: size }]
            : []),
        ],
        totalCounts: [
          {
            $group: {
              _id: null,
              totalCount: { $sum: 1 },
            },
          },
        ],
      },
    },
    {
      $project: {
        paginatedResults: 1,
        totalCount: {
          $ifNull: [{ $arrayElemAt: ["$totalCounts.totalCount", 0] }, 0],
        },
      },
    },
  ];

  const leaseProperties = await LeaseProperty.aggregate(pipeline);

  const { paginatedResults, totalCount } = leaseProperties[0] || {
    paginatedResults: [],
    totalCount: 0,
  };

  return { totalCount, data: paginatedResults };
};

export const leasePropertyServices = {
  createLeasePropertyIntoDB,
  getAllLeasePropertyFromDB,
};
