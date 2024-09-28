import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import SearchBar from "./SearchBar/SearchBar";
import { removeMovieFromList, setGenre } from "../utils/allMovieSlice";
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import StreamHaven from "../images/StreamHaven.webp";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState(false);

  const toggleDrawer = () => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(!state);
  };

  const searchData = useSelector((state) => state.search);
  const movieListPage = useSelector((state) => state.allMovies);

  const handleLogoClick = () => {
    if (user) navigate("/browse");
    else navigate("/");
  };

  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        if (searchData?.keywords.length < 1) {
          if (!movieListPage.genre && movieListPage?.movieList?.length < 1) {
            navigate("/browse");
          }
        }
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    //Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  const user = useSelector((state) => state.user);
  const handleClick = () => {
    signOut(auth)
      .then(() => {})
      .catch(() => {
        navigate("/error");
      });
  };

  const handleMovieClick = () => {
    if (location.pathname !== "/movies") {
      dispatch(setGenre("all"));

      navigate("/movies");
      dispatch(removeMovieFromList());
    }
  };

  const handleTvClick = () => {
    if (location.pathname !== "/tv") {
      dispatch(setGenre("all"));

      navigate("/tv");
      dispatch(removeMovieFromList());
    }
  };

  const handleMyListClick = () => {
    if (location.pathname !== "my-list") {
      dispatch(setGenre("all"));
      navigate("/my-list");
    }
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List sx={{ background: "#000000ee", color: "white", display: "flex" }}>
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton sx={{ display: "flex", alignItems: "end" }}>
            <img
              alt={user?.displayName}
              src={user?.photoURL}
              height={30}
              width={30}
            />
            <p className='pl-2 text-white'>{user?.displayName}</p>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider sx={{ background: "#fff" }} />
      <List sx={{ background: "#000000ee", color: "white" }}>
        {["movies", "tv"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={text === "tv" ? handleTvClick : handleMovieClick}
            >
              <ListItemText primary={text === "tv" ? "TV SHOWS" : "MOVIES"} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItemButton onClick={handleMyListClick}>
          <ListItemText primary={"MY LIST"} />
        </ListItemButton>
      </List>
      <Divider sx={{ background: "#fff" }} />
      <List sx={{ background: "#000000ee", color: "white", display: "flex" }}>
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton>
            <button
              className='text-md text-center text-white'
              onClick={handleClick}
            >
              SIGN OUT
            </button>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className='absolute top-0 pl-1 pr-2 py-2 bg-gradient-to-b flex items-center justify-between from-black w-full z-20'>
      <div className='flex items-center'>
        {user && (
          <div
            className='flex lg:hidden'
            style={{ width: "35px", height: "35px" }}
          >
            <Button
              sx={{
                justifyContent: "start",
                padding: "0",
                ".MuiSvgIcon-root": {
                  fill: "#ffffffa7",
                },
              }}
              onClick={toggleDrawer("left", true)}
              aria-label="Menu Button"
            >
              <MenuRoundedIcon fontSize='large' />
            </Button>
            <Drawer
              sx={{
                background: "#0000001b",
                "& .MuiPaper-root": { background: "#000" },
              }}
              anchor={"left"}
              open={state}
              onClose={toggleDrawer("left", false)}
            >
              {list("left")}
            </Drawer>
          </div>
        )}
        <img
          src={StreamHaven}
          alt='StreamHaven Logo - Watch movies and shows for free'
          className='logo h-[100px] w-[125px]'
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
          height={100}
          width={125}
        />
        {user && (
          <ul className='hidden lg:flex items-center w-full text-white font-bold ml-4'>
            <li className='pr-4 cursor-pointer' onClick={handleMovieClick}>
              MOVIES
            </li>
            <li className='pr-4 cursor-pointer' onClick={handleTvClick}>
              TV SHOWS
            </li>
            <li className='cursor-pointer' onClick={handleMyListClick}>
              MY LIST
            </li>
          </ul>
        )}
      </div>
      {user && (
        <div className='flex justify-between items-center'>
          <div className='pr-8  mb-2'>
            <SearchBar />
          </div>
          <div className='hidden lg:block'>
            <div className='flex justify-between items-center'>
              <div
                className='flex items-center'
                style={{ borderRight: "2px solid #ffffff71" }}
              >
                <img
                  alt={user?.displayName}
                  src={
                    "https://wsrv.nl/?url=" +
                    user?.photoURL +
                    "&w=30&h=30&output=webp"
                  }
                  height={30}
                  width={30}
                  className='w-[30px] h-[30px] object-contain'
                />
                <p className='mx-2 text-white'>{user?.displayName}</p>
              </div>
              <button
                className='text-sm text-center mx-2 text-white'
                onClick={handleClick}
              >
                SIGN OUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
