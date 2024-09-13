import { useEffect } from "react";
import { Form } from "react-router-dom";
import styled from "styled-components";

const DeleteModal = ({ commentId, setIsDeleting, toDelete }) => {
  useEffect(() => {
    const handleClick = (event) => {
      const modalWrapper = document.querySelector(".modal-wrapper");
      if (event.target == modalWrapper) {
        setIsDeleting(false);
      }
    };
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <Wrapper className="modal-wrapper">
      <Container>
        <h1>Delete {toDelete === "comment" ? "Comment" : "User"}</h1>
        <p>
          {toDelete === "comment"
            ? "Are you sure you want to delete this comment? This will remove the comment and can't be undone."
            : "Are you sure you want to delete your account? All data of your account and comments associated with it will be deleted permanently"}
        </p>
        <div className="controls">
          <Form method="post">
            <button
              className="btn cancel-delete-btn"
              onClick={() => setIsDeleting(false)}
            >
              No, cancel
            </button>
            {toDelete === "comment" && (
              <input type="hidden" name="commentId" value={commentId} />
            )}

            <button
              className="btn confirm-delete-btn"
              type="submit"
              name="intent"
              value={toDelete === "comment" ? "delete-comment" : "delete-user"}
            >
              Yes, delete
            </button>
          </Form>
        </div>
      </Container>
    </Wrapper>
  );
};

export default DeleteModal;

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  min-height: 100vh;
  z-index: 9999;
  background: rgba(0, 0, 0, 0);
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  background: var(--White);
  width: 100%;
  max-width: 364px;
  padding: 20px;
  border-radius: 6px;
  h1 {
    font-size: 22px;
    font-weight: 500;
    color: var(--Dark-blue);
  }
  p {
    padding: 10px 5px;
    color: var(--Grayish-Blue);
    font-weight: 400;
  }
  .controls {
    padding: 10px;
    form {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 10px;
      .btn {
        text-transform: uppercase;
        color: var(--White);
        width: 100%;
        padding: 10px;
        border-radius: 4px;

        &.cancel-delete-btn {
          background: var(--Grayish-Blue);
        }
        &.confirm-delete-btn {
          background: var(--Soft-Red);
        }
      }
    }
  }
`;
