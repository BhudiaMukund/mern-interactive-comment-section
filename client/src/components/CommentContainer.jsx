import styled from "styled-components";
import { Comment, RepliesContainer } from ".";

const CommentContainer = ({ comment }) => {
  return (
    <Wrapper>
      <Comment comment={comment} />
      {comment.replies.length >= 1 && (
        <RepliesContainer replies={comment.replies} />
      )}
    </Wrapper>
  );
};

export default CommentContainer;

const Wrapper = styled.div``;
