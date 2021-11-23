import styled from "styled-components";

// export const CardContainer = styled.div`
//   display: flex;
//   max-width: 340px;
//   height: 150px;
//   background-color: white;
//   border-radius: 10px;
//   margin: 25px auto 25px auto;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
//   overflow: hidden;

//   #postImageOne {
//     height: 100%;
//   }
// `;

// export const PostButtonsContainer = styled.div`
//   /* position: absolute; */
//   color: orange;
// `;
// export const FormContainer = styled.div`
//   max-width: 320px;
//   background-color: white;
//   padding: 20px;
//   border-radius: 10px;
//   margin: 25px auto 25px auto;
//   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
// `;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .paginationItem {
    background: #fff;
    border: 2px solid #666;
    padding: 10px 15px;
    border-radius: 50%;
    height: 35px;
    width: 35px;
    position: relative;
    margin: 0 5px;
    cursor: pointer;
  }

  .paginationItem span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .prev,
  .next {
    background: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px;
    color: black;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
    margin: 0 10px;
    cursor: pointer;
  }

  .paginationItem.active {
    border: 1px solid #e85b25;
    color: #e85b25;
    pointer-events: none;
  }

  .paginationItem.deactivate {
    pointer-events: none;
    box-shadow: none;
    color: #999;
    border: #999;
  }

  .prev.disabled,
  .next.disabled {
    pointer-events: none;
    box-shadow: none;
    color: #999;
  }
`;
