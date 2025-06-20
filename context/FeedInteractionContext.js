import React, { createContext, useContext, useState } from 'react';

const FeedInteractionContext = createContext();

export const useFeedInteraction = () => {
  const context = useContext(FeedInteractionContext);
  if (!context) {
    throw new Error('useFeedInteraction must be used within a FeedInteractionProvider');
  }
  return context;
};

export const FeedInteractionProvider = ({ children }) => {
  const [interactions, setInteractions] = useState({});

  const updateLike = (postId, isLiked, count) => {
    setInteractions(prev => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        liked: isLiked,
        likeCount: count
      }
    }));
  };

  const updateComments = (postId, comments) => {
    setInteractions(prev => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        comments: comments,
        commentCount: comments.length
      }
    }));
  };

  const addComment = (postId, comment) => {
    setInteractions(prev => {
      const currentComments = prev[postId]?.comments || [];
      const newComments = [...currentComments, comment];
      return {
        ...prev,
        [postId]: {
          ...prev[postId],
          comments: newComments,
          commentCount: newComments.length
        }
      };
    });
  };

  const getPostInteraction = (postId) => {
    return interactions[postId] || {
      liked: false,
      likeCount: 0,
      comments: [],
      commentCount: 0
    };
  };

  return (
    <FeedInteractionContext.Provider value={{
      updateLike,
      updateComments,
      addComment,
      getPostInteraction
    }}>
      {children}
    </FeedInteractionContext.Provider>
  );
};
