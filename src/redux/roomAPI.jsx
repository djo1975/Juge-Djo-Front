import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const roomApi = createApi({
  reducerPath: 'roomApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',

    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().persistedReducer;
      if (token) {
        headers.set('Authorization', `${token}`);
      }
      return headers;
    },
  }),
  keepUnusedDataFor: 60 * 60 * 60,
  tagTypes: ['Room', 'Reservation', 'Comment'],
  endpoints: (builder) => ({
    getAllRooms: builder.query({
      query: () => '/rooms',
      providesTags: (result) => (result
        ? [...result.map(({ id }) => ({ type: 'Room', id })), { type: 'Room', id: 'LIST' }]
        : [{ type: 'Room', id: 'LIST' }]),
    }),

    createNewRoom: builder.mutation({
      query: (body) => ({
        url: '/rooms',
        method: 'POST',
        body,
      }),

      invalidatesTags: [{ type: 'Room', id: 'LIST' }],
    }),

    deleteRoom: builder.mutation({
      query: (id) => ({
        url: `/rooms/${id}`,
        method: 'DELETE',
      }),

      invalidatesTags: (result, error, id) => [{ type: 'Room', id }],
    }),

    getAllReservations: builder.query({
      query: () => '/reservations',
      providesTags: (result) => (result
        ? [...result.map(({ id }) => ({ type: 'Reservation', id })), { type: 'Reservation', id: 'LIST' }]
        : [{ type: 'Reservation', id: 'LIST' }]),

    }),

    createReservation: builder.mutation({
      query: (body) => ({
        url: '/reservations',
        method: 'POST',
        body,
      }),

      invalidatesTags: [{ type: 'Reservation', id: 'LIST' }],

    }),

    getAllComments: builder.query({
      query: () => '/comments',
      providesTags: (result) => (result
        ? [...result.map(({ id }) => ({ type: 'Comment', id })), { type: 'Comment', id: 'LIST' }]
        : [{ type: 'Comment', id: 'LIST' }]),

      transformResponse: (response) => {
        // change order of comments
        const comments = response.reverse();
        return comments;
      },

    }),

    createComment: builder.mutation({
      query: (body) => ({
        url: '/comments',
        method: 'POST',
        body,
      }),

      invalidatesTags: [{ type: 'Comment', id: 'LIST' }],
    }),

  }),

});

export const {
  useGetAllRoomsQuery, useCreateReservationMutation, useGetAllReservationsQuery, useCreateNewRoomMutation, useDeleteRoomMutation, useGetAllCommentsQuery, useCreateCommentMutation,
} = roomApi;
