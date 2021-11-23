import { ClassNames } from "@emotion/react";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect, useContext } from "react";
import PostCard from "./postCard";
import PostContext from "./postContext";
import { Pagination } from "./posts.styles";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    marginBottom: "1rem",
  },
  gridItem: {
    [theme.breakpoints.down("")]: {
      // fontSize: "3rem",
      // width: "90%",
      // padding: ".5rem",
      // marginTop: "0",
      // marginLeft: "2rem",
      // marginBottom: "1rem",
    },
  },
}));
const PostList = ({ posts, dataLimit, pageLimit, title }) => {
  // const { posts } = useContext(PostContext);
  const classes = useStyles();

  const [pages, setPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setPages(Math.ceil(posts.length / dataLimit));
  }, [posts]);

  const goToNextPage = () => {
    setCurrentPage(() => currentPage + 1);
  };
  const goToPreviousPage = () => {
    setCurrentPage(() => currentPage - 1);
  };
  const changePage = (event) => {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  };
  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return posts.slice(startIndex, endIndex);
  };
  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };
  return (
    <Box marginBottom={5}>
      {/* <h1>{title}</h1> */}
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="left"
        spacing={1}
        className={classes.gridContainer}
      >
        {getPaginatedData().map((post, index) => (
          <Grid item key={post.id} align="center" className={classes.gridItem}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
      <Pagination>
        {/* previous button */}
        <button
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? "disabled" : ""}`}
        >
          prev
        </button>
        {/* show page numbers */}
        {getPaginationGroup().map((item, index) => (
          // console.log("item and currentpage", item, currentPage),
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${
              currentPage === item ? "active" : null
            } ${item > pages ? "deactivate" : null}`}
          >
            <span>{item}</span>
          </button>
        ))}
        <button
          onClick={goToNextPage}
          className={`next ${currentPage === pages ? "disabled" : ""}`}
        >
          next
        </button>
      </Pagination>
    </Box>
  );
};

export default PostList;
