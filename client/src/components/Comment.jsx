import styled from "styled-components";
import { useState } from "react";
import { Form } from "react-router-dom";
import { CommentTimeFormat, DeleteModal, ReplyInputForm } from ".";
import { useAppContext } from "../pages/AppLayout";

const Comment = ({ comment }) => {
  const { user } = useAppContext();
  const [isReplying, setIsReplying] = useState(false);
  const [isReplyingTo, setIsReplyingTo] = useState(comment._id);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <Wrapper>
      <Container>
        <section className="vote-controls">
          <Form method="post">
            <button
              className={`btn ${comment.userHasUpVoted ? "active" : ""}`}
              disabled={comment.userHasDownVoted}
              type="submit"
              name="intent"
              value="upVote"
            >
              +
            </button>
            <span>{comment.score}</span>
            <input type="hidden" name="commentId" value={comment._id} />
            <button
              type="submit"
              className={`btn ${comment.userHasDownVoted ? "active" : ""}`}
              disabled={comment.userHasUpVoted}
              name="intent"
              value="downVote"
            >
              -
            </button>
          </Form>
        </section>
        <section className="content">
          <div className="comment-header">
            <div className="profile-container">
              <img
                src={comment.author.profilePicture}
                alt={comment.author.username}
              />
              <span className="username">{comment.author.username}</span>
              {user._id === comment.author._id && (
                <span className="user-highlight">you</span>
              )}
            </div>
            <CommentTimeFormat createdAt={comment.createdAt} />
            <div className="comment-controls">
              {user._id === comment.author._id ? (
                <>
                  <button
                    className="btn delete-btn"
                    onClick={() => setIsDeleting(true)}
                  >
                    <img
                      src="/images/icons/icon-delete.svg"
                      alt="delete comment"
                    />
                    <span>Delete</span>
                  </button>
                  <button
                    className="btn edit-btn"
                    onClick={() => setIsEditing(true)}
                  >
                    <img src="/images/icons/icon-edit.svg" alt="edit comment" />
                    <span>Edit</span>
                  </button>
                </>
              ) : (
                <button
                  className="btn reply-btn"
                  onClick={() => setIsReplying(!isReplying)}
                >
                  <img
                    src="/images/icons/icon-reply.svg"
                    alt="reply to comment"
                  />
                  <span>Reply</span>
                </button>
              )}
            </div>
          </div>

          <div className="comment-content">
            {!isEditing ? (
              <p>
                {comment.isReply && (
                  <span className="reply-to">@{comment.replyTo} </span>
                )}
                {comment.content}
              </p>
            ) : (
              <Form method="post">
                <textarea
                  name="content"
                  rows={3}
                  autoFocus
                  placeholder="Add a comment..."
                  defaultValue={comment.content}
                />
                <input type="hidden" name="commentId" value={comment._id} />
                <input type="hidden" name="intent" value="update" />
                <div className="form-controls">
                  <button type="submit" className="btn update-btn btn-theme">
                    Update
                  </button>
                </div>
              </Form>
            )}
          </div>
        </section>
      </Container>
      {isReplying && (
        <ReplyInputForm
          setIsReplying={setIsReplying}
          isReplyingTo={isReplyingTo}
        />
      )}
      {isDeleting && (
        <DeleteModal
          commentId={comment._id}
          setIsDeleting={setIsDeleting}
          toDelete="comment"
        />
      )}
    </Wrapper>
  );
};

export default Comment;

const Wrapper = styled.div``;

const Container = styled.article`
  background: var(--White);
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 20px;
  width: 100%;
  .vote-controls {
    padding: 0 10px;
    padding-left: 0;
    form {
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: var(--Very-light-gray);
      height: max-content;
      padding: 6px 10px;
      border-radius: 8px;
      span {
        color: var(--Moderate-blue);
        font-weight: 500;
      }
      .btn {
        background: none;
        font-weight: 600;
        font-size: 18px;
        color: var(--Light-grayish-blue);
        &:disabled {
          cursor: not-allowed;
        }
        &:hover,
        &.active {
          opacity: 1;
          color: var(--Moderate-blue);
        }
      }
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    .comment-content {
      .reply-to {
        color: var(--Moderate-blue);
        font-weight: 500;
      }
    }
    textarea {
      width: 100%;
      resize: none;
      outline: none;
      font-family: inherit;
      border: 1.5px solid var(--Light-gray);
      border-radius: 6px;
      padding: 10px;
      font-size: 16px;
      color: var(--Grayish-Blue);
      &::placeholder {
        color: var(--Grayish-Blue);
      }
      &:focus {
        border-color: var(--Moderate-blue);
      }
    }
    .comment-header {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;
      .profile-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
        .username {
          font-weight: 500;
          color: var(--Dark-blue);
        }
        .user-highlight {
          font-size: 14px;
          color: var(--White);
          background: var(--Moderate-blue);
          padding: 3px 5px;
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 2px;
        }
        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
        }
      }
      .comment-controls {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: right;
        gap: 16px;
        .btn {
          background: none;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 5px;
          font-weight: 500;
          font-size: 15px;
          &.reply-btn,
          &.edit-btn {
            color: var(--Moderate-blue);
          }
          &.delete-btn {
            color: var(--Soft-Red);
          }
        }
      }
    }
  }
`;
