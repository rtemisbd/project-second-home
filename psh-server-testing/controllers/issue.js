import Branch from "../models/Branch.js";

import IssueModel from "../models/Issue.js";
import nodemailer from "nodemailer";

export const createIssue = async (req, res, next) => {
  try {
    const {
      name,
      desc,
      branchId,
      type,
      category,
      subCategory,
      email,
      userName,
      userNumber,
    } = req.body;

    // Find the branch by ID
    const branch = await Branch.findById(branchId);
    if (!branch) {
      return res.status(404).json({ error: "Branch not found" });
    }

    // Create the product and assign it to the category, branch, and facilities
    const issue = new IssueModel({
      name,
      desc,
      email,
      type,
      category,
      subCategory,
      userName,
      userNumber,
      branch: branch._id,
    });
    await issue.save();

    // Add the product to the branch's products array
    branch.issue.push(issue._id);
    await branch.save();
    // Order Mail to customer and Manager
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "alaminbamna08@gmail.com",
        pass: "qesfajhmrfhkfnbo",
      },
    });

    const mailOptions = {
      from: "alaminbamna08@gmail.com",
      to: `mohammad.alaminh08@gmail.com,${email}`,
      subject: "Problem",
      html: `
      <p>Sorry! for this issue, We will try to solve your problem as soon as possible.</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(201).json(issue);
  } catch (err) {
    next(err);
  }
};

export const getIssue = async (req, res, next) => {
  try {
    const issue = await IssueModel.find({}).populate("branch");
    res.status(200).json(issue);
  } catch (err) {
    next(err);
  }
};
export const deleteIssue = async (req, res, next) => {
  try {
    const issueId = req.params.id;

    // Find the property by ID
    const property = await IssueModel.findById(issueId);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }
    // Find the associated branch
    const branch = await Branch.findById(property.branch);
    if (!branch) {
      return res.status(404).json({ error: "Branch not found" });
    }

    // Remove the property from the branch's property array
    branch.issue.pull(issueId);
    await branch.save();

    // Delete the property
    await IssueModel.findByIdAndDelete(issueId);

    res.status(200).json(property);
  } catch (err) {
    next(err);
  }
};

export const updateIssue = async (req, res, next) => {
  try {
    const issueId = req.params.id;
    const { name, desc, status, branchId } = req.body;

    // Find the issue by ID
    const issue = await IssueModel.findById(issueId);
    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }

    // Update the issue fields if provided
    if (name) {
      issue.name = name;
    }
    if (desc) {
      issue.desc = desc;
    }
    if (status) {
      issue.status = status;
    }

    // Update the associated branch if provided
    if (branchId) {
      // Find the new branch by ID
      const newBranch = await Branch.findById(branchId);
      if (!newBranch) {
        return res.status(404).json({ error: "New branch not found" });
      }

      // Remove the issue from the old branch's issues array
      const oldBranch = await Branch.findById(issue.branch);
      if (!oldBranch) {
        return res.status(404).json({ error: "Old branch not found" });
      }
      oldBranch.issue.pull(issueId);
      await oldBranch.save();

      // Assign the issue to the new branch
      issue.branch = newBranch._id;

      // Add the issue to the new branch's issues array
      newBranch.issue.push(issueId);
      await newBranch.save();
    }

    // Save the updated issue
    await issue.save();

    res.status(200).json(issue);
  } catch (err) {
    next(err);
  }
};
