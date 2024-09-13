import { Form } from "react-router-dom";
import styled from "styled-components";
import { useAppContext } from "../pages/AppLayout";
import { NewCommentWrapper } from "./NewComment";

const ReplyInputForm = ({ setIsReplying, isReplyingTo }) => {
  const { user } = useAppContext();

  return (
    <Wrapper>
      <Form method="post">
        <img src={user.profilePicture} alt="" />
        <textarea
          name="content"
          rows={3}
          id=""
          placeholder="Add a reply..."
          autoFocus
        ></textarea>
        <input type="hidden" name="isReply" value={true} />
        <input type="hidden" name="replyTo" value={isReplyingTo} />
        <button name="intent" value="add" type="submit" className="btn btn-theme">
          Reply
        </button>
      </Form>
    </Wrapper>
  );
};

export default ReplyInputForm;

const Wrapper = styled(NewCommentWrapper)`
  margin-top: 8px;
`;
