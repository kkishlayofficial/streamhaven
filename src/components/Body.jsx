import React from "react";
import Browse from "./Browse";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Search from "./Search/Search";
import MoviePage from "./MoviePage/MoviePage";
import TvPage from "./TvPage/TvPage";
import Error from "./Error/Error";
import Login from "./Login/Login";
import MyList from "./MyList/MyList";

const Body = () => { 

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <Error />,
    },
    {
      path: "/browse",
      element: <Browse />,
      errorElement: <Error />,
    },
    {
      path: '/search',
      element: <Search />,
      errorElement: <Error />,
    },
    {
      path: '/movies',
      element: <MoviePage />,
      errorElement: <Error />,
    },
    {
      path: '/tv',
      element: <TvPage />,
      errorElement: <Error />,
    },
    {
      path: '/my-list',
      element: <MyList />,
      errorElement: <Error />,
    }
  ]);
  return (
    <div style={{
      background: '#000'
    }}>
      <RouterProvider router={appRouter}>
        <Login />
        <Browse />
      </RouterProvider>
    </div>
  );
};

export default Body;
