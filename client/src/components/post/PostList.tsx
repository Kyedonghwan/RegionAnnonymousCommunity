import React from "react";
import { postListData } from "../../constants/postList";
import { sortArrByDate } from "../../utils/filter";
import PostItem from "./PostItem";

const PostList = () => {

  const postList = sortArrByDate(postListData);

  return <div className="postlist" role="tabpanel">
    <ul>
      {
        postList.map((item,index) => <PostItem postItem={item} key={index}/>)
      }
    </ul>
  </div>
}

export default PostList;