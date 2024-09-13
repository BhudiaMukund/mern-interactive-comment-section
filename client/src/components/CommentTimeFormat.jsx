import styled from "styled-components";

const CommentTimeFormat = ({ createdAt }) => {
  const calculateFormattedTime = () => {
    const commentTime = new Date(createdAt);
    const now = new Date();

    const difference = now.getTime() - commentTime.getTime();
    const secondsDifference = Math.floor(difference / 1000);
    const minuteDifference = Math.floor(secondsDifference / 60);
    const hourDifference = Math.floor(minuteDifference / 60);
    const dayDifference = Math.floor(hourDifference / 24);
    const weekDifference = Math.floor(dayDifference / 7);
    const monthDifference = Math.floor(weekDifference / 4);
    const yearDifference = Math.floor(monthDifference / 12);

    if (yearDifference >= 1) {
      return `${yearDifference} year${yearDifference > 1 ? "s" : ""} ago`;
    } else if (monthDifference >= 1) {
      return `${monthDifference} month${monthDifference > 1 ? "s" : ""} ago`;
    } else if (weekDifference >= 1) {
      return `${weekDifference} week${weekDifference > 1 ? "s" : ""} ago`;
    } else if (dayDifference >= 1) {
      return `${dayDifference} day${dayDifference > 1 ? "s" : ""} ago`;
    } else if (hourDifference >= 1) {
      return `${hourDifference} hour${hourDifference > 1 ? "s" : ""} ago`;
    } else if (minuteDifference >= 1) {
      return `${minuteDifference} minute${minuteDifference > 1 ? "s" : ""} ago`;
    } else if (secondsDifference >= 1) {
      return `${secondsDifference} second${
        secondsDifference > 1 ? "s" : ""
      } ago`;
    } else {
      return "0s ago";
    }
  };

  return <Wrapper>{calculateFormattedTime()}</Wrapper>;
};

export default CommentTimeFormat;

const Wrapper = styled.span`
  flex: 1;
  color: var(--Grayish-Blue);
`;
