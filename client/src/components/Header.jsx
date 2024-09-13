import styled from "styled-components";
import { useAppContext } from "../pages/AppLayout";
import { useEffect, useState } from "react";
import DeleteModal from "./DeleteModal";

const Header = () => {
  const { user, logout } = useAppContext();
  const [openMenu, setOpenMenu] = useState(false);
  const [isDeletingUser, setIsDeletingUser] = useState(false);

  useEffect(() => {
    const dropdownIcon = document.querySelector(".dropdown-icon");
    const dropdownOptions = document.querySelector(".profile-dropdown");

    if (openMenu) {
      dropdownIcon.style.transform = "rotate(180deg)";
      dropdownOptions.style.display = "flex";
      setTimeout(() => {
        dropdownOptions.style.maxHeight = "100vh";
      }, 0);
    } else {
      dropdownIcon.style.transform = "rotate(0deg)";
      dropdownOptions.style.maxHeight = "0px";
      setTimeout(() => {
        dropdownOptions.style.display = "none";
      }, 100);
    }
  }, [openMenu]);

  return (
    <Wrapper openMenu={openMenu}>
      <h1>Interactive Comment Section</h1>
      <button
        className="btn dropdown-btn"
        onClick={() => {
          setOpenMenu(!openMenu);
        }}
      >
        <div className="profile-container">
          <div className="profile">
            <img src={user.profilePicture} alt={user.username} />
            <span>{user.username}</span>
          </div>

          <img
            src="/images/icons/icon-dropdown.svg"
            className="dropdown-icon"
            alt="dropdown"
          />
        </div>
      </button>
      <div className="profile-dropdown">
        <button className="btn logout-btn" onClick={() => logout()}>
          Logout
        </button>
        <button
          className="btn delete-user-btn"
          onClick={() => setIsDeletingUser(true)}
        >
          Delete Account
        </button>
      </div>
      {isDeletingUser && (
        <DeleteModal toDelete="user" setIsDeleting={setIsDeletingUser} />
      )}
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0px;
  padding: 10px 20px;
  width: 100%;
  background: var(--White);
  box-shadow: 0 0 20px 0 rgba(0,0,0,0.1);
  h1 {
    font-size: 24px;
    color: var(--Grayish-Blue);
    font-weight: 600;
  }
  .dropdown-btn {
    background: #fff;
    padding: 5px 10px;
    border-radius: 4px;
    transition: outline 50ms ease-in-out;
    outline: ${(props) =>
      props.openMenu ? "3px dotted var(--Moderate-blue)" : "2px solid var(--Light-gray)"};
    &:hover {
      outline: 2px solid var(--Grayish-Blue);
    }

    .profile-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 8px;
      .dropdown-icon {
        transition: all 200ms ease-in-out;
      }
      .profile {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;

        @media only screen and (max-width: 375px) {
          span {
            display: none;
          }
        }

        img {
          border-radius: 50%;
          width: 36px;
          height: 36px;
        }
      }
    }
  }
  .profile-dropdown {
    display: none;
    overflow: hidden;
    position: absolute;
    background: var(--White);
    border-radius: 6px;
    top: 100%;
    right: 20px;
    z-index: 999;
    transition: all 100ms ease-in-out;
    padding: 10px 15px;
    flex-direction: column;
    gap: 10px;
    box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.15);

    .btn {
      background: var(--Grayish-Blue);
      color: var(--White);
      width: 100%;
      justify-content: flex-start;
      border-radius: 4px;
      padding: 10px;
      &.delete-user-btn {
        background: var(--Soft-Red);
        color: var(--White);
      }
    }
  }
`;
