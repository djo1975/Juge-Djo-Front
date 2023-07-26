import React from 'react';
import { useGetAllCommentsQuery } from '../redux/roomAPI';
import Comment from './Comment';

const CommentsList = ({ roomId }) => {
  const { data: comments, isLoading: isLoadingComments } = useGetAllCommentsQuery();

  if (isLoadingComments) return <p>Loading...</p>;

  if (!comments) return <p>Oops! Something went wrong...</p>;

  const filteredComments = comments.filter((comment) => comment.room_id === roomId);

  return (
    <div className="flex w-full flex-col min-h-[350px]  max-h-[350px] scrollbar  overflow-y-auto">
      <p className="self-center text-2xl font-bold text-sky-600">Comments</p>

      {filteredComments?.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </div>
  );
};

export default CommentsList;
