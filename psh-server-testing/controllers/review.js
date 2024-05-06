import Property from "../models/Property.js";
import ReviewModel from "../models/Review.js";

export const createReview = async (req, res, next) => {
  try {
    const { userName, comment, propertyId, rating, category } = req.body;
    const review = await Property.findById(propertyId);
    if (!review) {
      return res.status(404).json({ error: "property not found" });
    }
    const product = new ReviewModel({
      userName,
      comment,
      property: review._id,
      rating,
      category,
    });
    await product.save();
    review.review.push(product._id);
    await review.save();

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

export const getReview = async (req, res, next) => {
  try {
    const review = await ReviewModel.find({});
    res.status(200).json(review);
  } catch (err) {
    next(err);
  }
};
export const getMyBooking = async (req, res, next) => {
  try {
    const email = req.query.email;
    const review = await ReviewModel.find({ email: email });
    res.status(200).json(review);
  } catch (err) {
    next(err);
  }
};

export const replyToReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body, userName } = req.body;
    const review = await ReviewModel.findById(id);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    review.replies.push({ body, replyUser: userName });
    review.userName = userName || review.userName;
    review.comment = req.body.comment || review.comment;

    await review.save();

    res.json(review);
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const reviewId = req.params.id;
    const review = await ReviewModel.findById(reviewId);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    const property = await Property.findById(review.property);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }
    property.review.pull(reviewId);
    await property.save();
    await ReviewModel.findByIdAndDelete(reviewId);

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    next(err);
  }
};
export const updateReview = async (req, res, next) => {
  try {
    const issueId = req.params.id;
    const { userName, comment, status, propertyId, category, rating } =
      req.body;
    const issue = await ReviewModel.findById(issueId);
    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }
    if (userName) {
      issue.userName = userName;
    }
    if (comment) {
      issue.comment = comment;
    }
    if (status) {
      issue.status = status;
    }
    if (propertyId) {
      const newBranch = await Property.findById(propertyId);
      if (!newBranch) {
        return res.status(404).json({ error: "New property not found" });
      }
      const oldBranch = await Property.findById(issue.property);
      if (!oldBranch) {
        return res.status(404).json({ error: "Old property not found" });
      }
      oldBranch.issue.pull(issueId);
      await oldBranch.save();
      issue.property = newBranch._id;
      newBranch.review.push(issueId);
      await newBranch.save();
    }
    await issue.save();

    res.status(200).json(issue);
  } catch (err) {
    next(err);
  }
};
