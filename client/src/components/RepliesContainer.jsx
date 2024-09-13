import styled from "styled-components";
import { Comment } from ".";

const RepliesContainer = ({ replies }) => {
  return (
    <Wrapper>
      <div className="separator"></div>
      <div className="flex-container">
        {replies.map((reply) => {
          return <Comment comment={reply} key={reply._id} />;
        })}
      </div>
    </Wrapper>
  );
};

export default RepliesContainer;

const Wrapper = styled.div`
  /* padding-left: 50px; */
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  .separator {
    margin: 10px 30px;
    width: 8px;
    background: var(--Light-gray);
    /* border: 2px solid  var(--Light-gray); */
  }
  .flex-container {
    display: flex;
    flex-direction: column;
    padding: 10px 0;
    gap: 10px;
  }
`;
