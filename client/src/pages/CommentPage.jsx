import styled from "styled-components";
import { CommentContainer, Header, NewComment } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { redirect, useLoaderData } from "react-router-dom";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/comments");
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    if (data.intent === "add") {
      await customFetch.post("/comments/add", data);
    } else if (data.intent === "delete-comment") {
      await customFetch.delete(`/comments/delete/${data.commentId}`);
    } else if (data.intent === "delete-user") {
      await customFetch.delete("/users/delete-current-user");
      toast.success("User deleted succesfully!");
    } else if (data.intent === "upVote" || data.intent === "downVote") {
      await customFetch.post("/comments/vote", data);
    } else if (data.intent === "update") {
      await customFetch.patch("/comments/update", data)
    }
    return redirect("/");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const CommentPage = () => {
  const { comments } = useLoaderData();
  console.log(comments);
  return (
    <Wrapper>
      <Header />
      <CommentsWrapper>
        {comments.map((comment) => {
          return <CommentContainer comment={comment} key={comment._id} />;
        })}
        <NewComment />
      </CommentsWrapper>
    </Wrapper>
  );
};

export default CommentPage;

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CommentsWrapper = styled.div`
  margin-top: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  gap: 10px;
`;
