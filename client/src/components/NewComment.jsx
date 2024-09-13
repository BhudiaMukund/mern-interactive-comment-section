import styled from "styled-components";
import { useAppContext } from "../pages/AppLayout";
import { Form } from "react-router-dom";

const NewComment = () => {
  const { user } = useAppContext();
  return (
    <NewCommentWrapper>
      <Form method="post">
        <img
          src={user.profilePicture}
          alt={user.username}
          referrerPolicy="no-referrer"
        />
        <textarea name="content" rows={3} placeholder="Add a comment..." />
        <input type="hidden" name="isReply" value={false} />
        <button type="submit" className="btn btn-theme" name="intent" value="add">
          Send
        </button>
      </Form>
    </NewCommentWrapper>
  );
};

export default NewComment;

export const NewCommentWrapper = styled.div`
  background: var(--White);
  padding: 25px 20px;
  width: 100%;
  border-radius: 6px;
  margin: 20px 0;

  form {
    display: flex;
    flex-direction: row;
    align-items: start;
    gap: 10px;
    img {
      border-radius: 50%;
      width: 40px;
      height: 40px;
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
  }
`;
