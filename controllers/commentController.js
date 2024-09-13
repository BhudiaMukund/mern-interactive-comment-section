import { StatusCodes } from "http-status-codes";
import Comment from "../models/CommentModel.js";
import User from "../models/UserModel.js";
import { BadRequestError } from "../errors/customErrors.js";

export const getAllComments = async (req, res) => {
  const user = req.user;

  const comments = await Comment.find({}).sort({"createdAt": 1}).populate({
    path: "author",
    select: "-createdAt -updatedAt -__v -googleId", // Remove fields not required
  });

  const formattedComments = comments.map((comment) => {
    const userHasUpVoted = comment.upVoteBy.some((voterId) =>
      voterId.equals(user.userId)
    );
    const userHasDownVoted = comment.downVoteBy.some((voterId) =>
      voterId.equals(user.userId)
    );

    const formattedComment = {
      ...comment.toObject(), // Get all comment details
      userHasUpVoted,
      userHasDownVoted,
      score: comment.upVoteBy.length - comment.downVoteBy.length,
      replies: [],
    };

    delete formattedComment.upVoteBy;
    delete formattedComment.downVoteBy;

    return formattedComment;
  });

  const parentComments = formattedComments.filter((comment) => {
    return !comment.isReply;
  });

  const childrenComments = formattedComments.filter((comment) => {
    return comment.isReply;
  });

  childrenComments.forEach((comment) => {
    parentComments.forEach((parentComment) => {
      if (comment.replyTo.toString() === parentComment._id.toString()) {
        delete comment.replies;
        parentComment.replies.push(comment);
      }
    });
  });

  parentComments.forEach((parentComment) => {
    childrenComments.forEach((childComment) => {
      parentComment.replies.forEach((reply) => {
        if (childComment.replyTo.toString() === reply._id.toString()) {
          delete childComment.replies;
          parentComment.replies.push(childComment);
        }
      });
    });
  });

  const modifyCommentReplies = async () => {
    for (let i = 0; i < parentComments.length; i++) {
      const parentComment = parentComments[i];

      if (parentComment.replies.length > 0) {
        for (let j = 0; j < parentComment.replies.length; j++) {
          const reply = parentComment.replies[j];
          const replyTargetComment = await Comment.findById(reply.replyTo);
          const replyTargetAuthor = await User.findById(
            replyTargetComment.author
          );
          reply.replyTo = replyTargetAuthor.username;
        }
      }
    }
  };

  await modifyCommentReplies();

  res.status(StatusCodes.OK).json({ comments: parentComments });
};

export const addNewComment = async (req, res) => {
  const { content, isReply, replyTo } = req.body;
  const newComment = {
    author: req.user.userId,
    content: content,
    isReply: isReply,
    replyTo: replyTo,
  };
  await Comment.create(newComment);

  res.status(StatusCodes.OK).json({ msg: "Comment added!" });
};

export const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  await Comment.findByIdAndDelete(commentId);

  res.status(StatusCodes.OK).json({ msg: "Comment deleted successfully" });
};

export const updateComment = async (req, res) => {
  const { commentId, content } = req.body;

  const comment = await Comment.findByIdAndUpdate(commentId, {
    content: content,
  });

  console.log(content);

  res.status(StatusCodes.OK).json({msg: "Comment updated successfully!"})
};

export const voteComment = async (req, res) => {
  const { commentId, intent } = req.body;

  const { userId } = req.user;
  const user = await User.findById(userId);
  const comment = await Comment.findById(commentId);

  const userHasUpvoted = comment.upVoteBy.some((voterId) =>
    voterId.equals(user._id)
  );
  const userHasDownVoted = comment.downVoteBy.some((voterId) =>
    voterId.equals(user._id)
  );

  if (intent === "upVote" && !userHasDownVoted) {
    if (userHasUpvoted) {
      comment.upVoteBy = comment.upVoteBy.filter(
        (voterId) => voterId.toString() !== userId
      );
    } else {
      comment.upVoteBy.push(userId);
    }
  } else if (intent === "downVote" && !userHasUpvoted) {
    if (userHasDownVoted) {
      comment.downVoteBy = comment.downVoteBy.filter(
        (voterId) => voterId.toString() !== userId
      );
    } else {
      comment.downVoteBy.push(userId);
    }
  } else {
    throw new BadRequestError("Bad Request");
  }

  await comment.save();

  res.status(StatusCodes.OK).json({ msg: `${intent} successfull` });
};
