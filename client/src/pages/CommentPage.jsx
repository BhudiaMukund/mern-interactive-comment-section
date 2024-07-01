import customFetch from "../utils/customFetch";

export const loader = async () => {
  try {
    const { data } = await customFetch("/");
    console.log(data);
    return null;
  } catch (error) {
    return null;
  }
};

const CommentPage = () => {
  return <div>CommentPage</div>;
};

export default CommentPage;
