import "./App.css";
import Menu from "./components/menu/menu";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Explore from "./views/explore/component";
import Reproducer from "./views/reproducer/component";
import AdminSales from "./views/admin/sale/component";
import { Styles } from "./theme/types";
import { Box } from "@mui/system";
import AdminSong from "./views/admin/song/component";
import AdminAlbum from "./views/admin/album/component";
import AdminSinger from "./views/admin/singer/component";
import AdminGenre from "./views/admin/genre/component";
import Login from "./views/login/component";
import { useAppSelector } from "./app/hooks";
import { tokenSelector } from "./features/authSlice";
import { useEffect, useMemo } from "react";
import { useAdmin } from "./hooks/admin";
import LoginButton from "./components/logButton/component";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import {darkTheme} from "./theme/theme"

const publicPaths = ["/login", "/", "/albums", "/songs"];

const App = () => {
  const token = useAppSelector(tokenSelector);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin } = useAdmin();

  useEffect(() => {
    const publicPath = publicPaths.some((path) => path === location.pathname);
    if (token === undefined && !publicPath) navigate("/");

    if (!isAdmin && !publicPath) navigate("/");
  }, [location, navigate, token, isAdmin]);

  const haveBar = useMemo(() => location.pathname !== "/login", [location]);

  const styles: Styles = {
    root: {
      display: "grid",
      height: "100%",
      gridTemplateColumns: haveBar ? "200px auto" : "auto",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      padding: "40px",
      overflowX: "hidden",
    },
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline enableColorScheme={true}/>
      <Box sx={styles.root}>
        {haveBar && <Menu />}
        <Box sx={styles.container}>
          {haveBar && <LoginButton />}
          <Routes>
            <Route path="/" element={<Explore />} />
            <Route path="/reproducer" element={<Reproducer />} />
            <Route path="/admin/albums" element={<AdminAlbum />} />
            <Route path="/admin/songs" element={<AdminSong />} />
            <Route path="/admin/singers" element={<AdminSinger />} />
            <Route path="/admin/genres" element={<AdminGenre />} />
            <Route path="/admin/sale" element={<AdminSales />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;