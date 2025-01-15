import React, { useEffect, useState } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Typography, Avatar, Box ,useMediaQuery} from "@mui/material";
import { Menu as MenuIcon, Home as HomeIcon, Settings as SettingsIcon, Book as BookIcon, QrCode as QrCodeIcon, Lock as LockIcon, Logout } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { logout } from '../../api/auth/auth.js';
import { getProfile } from "../../api/user/profile";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Sidebar = ({ onToggle }) => {
  
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);
  const [name, setName] = useState("")
  const [lastname, setLastname] = useState("")
  const [role, setRole] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProfile()
        setName(response.data.name)
        setLastname(response.data.lastname)
        setRole(response.data.role)

        setIsLoading(false)
      } catch (error) {
        toast.error(error.response.data.message) // productin error message olması gerek, backend buna göre düzenlenmeli
      }
    }
    fetchData()
  }, []);

  const isMobile = useMediaQuery("(max-width:600px)");

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(!isOpen);
    onToggle(newState);
  };

  let menuItems = [
    { to: "/home", icon: <HomeIcon sx={{ color: "rgba(255, 255, 255, 0.8)" }} />, text: "Ana Sayfa" },
    { to: "/saloon", icon: <BookIcon sx={{ color: "rgba(255, 255, 255, 0.8)" }} />, text: "Rezervasyon Yap" },
    { to: "/qrpage", icon: <QrCodeIcon sx={{ color: "rgba(255, 255, 255, 0.8)" }} />, text: "QR Kod Tara" },
    { to: "/catalog-scan", icon: <SettingsIcon sx={{ color: "rgba(255, 255, 255, 0.8)" }} />, text: "Katalog Tara" },
    { to: "/locker-rent", icon: <LockIcon sx={{ color: "rgba(255, 255, 255, 0.8)" }} />, text: "Dolap Kirala" },
  ];
  if(role==="admin"){
    menuItems=[
      { to: "/home", icon: <HomeIcon sx={{ color: "rgba(255, 255, 255, 0.8)" }} />, text: "Ana Sayfa" },
      { to: "/adminSaloon", icon: <BookIcon sx={{ color: "rgba(255, 255, 255, 0.8)" }} />, text: "Rezervasyon Yap" },
      { to: "/adminQR", icon: <QrCodeIcon sx={{ color: "rgba(255, 255, 255, 0.8)" }} />, text: "QR Kod Tara" },
      { to: "/catalog-scan", icon: <SettingsIcon sx={{ color: "rgba(255, 255, 255, 0.8)" }} />, text: "Katalog Tara" },
      { to: "/adminLocker", icon: <LockIcon sx={{ color: "rgba(255, 255, 255, 0.8)" }} />, text: "Dolap Kirala" },
    ];
  };

  const handleLogout = async () => {
    try {
      await logout(); 
      localStorage.removeItem('authToken'); 
      toast.success("Successfully logged out!");
      navigate('/');
    } catch (error) {
      toast.error("Error during logout");
      console.error(error);
    }
  };
  
  return (
    <Drawer
    variant={isMobile ? "temporary" : "permanent"}
      sx={{
        width: isOpen ? 320 : 64,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isOpen ? 320 : 64,
          boxSizing: "border-box",
          overflowX: "auto",
          transition: "margin-left 0.3s ease-in-out",
          backgroundColor: "rgba(0, 0, 0, 0.6)", 
          color: "rgba(255, 255, 255, 0.8)",
        },
      }}
    >
      <Box
        p={1}
        sx={{
          display:"flex",
          justifyContent: isOpen ? "flex-end" : "center",
          alignItems:"center",
          transition: "width 0.3s",
        }}
      >
        <IconButton onClick={toggleSidebar} sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Kullanıcı Bilgileri */}
      {isOpen && (
         <Link
         to="/profile"
         style={{ textDecoration: "none", color: "inherit" }}
       >
         <Box
           display="flex"
           justifyContent={"start"}
           alignItems="center"
           p={1}
           marginTop={1}
           marginBottom={2}
           marginLeft={2}
           sx={{
             backgroundColor: "rgba(255, 255, 255, 0.1)",
             borderRadius: "100px",
             cursor: "pointer",
             width: "250px",
           }}
         >
           {/* Avatar */}
           <Avatar
             sx={{
               width: 40,
               height: 40,
               backgroundColor: "rgba(255, 255, 255, 0.8)",
               
             }}
           >
              {name[0]}
           </Avatar>
     
           {/* Kullanıcı Bilgileri */}
           <Box
             display="flex"
             flexDirection="column"
             alignItems="flex-start"
             justifyContent="center"
             ml={5}
           >
             <Typography
               variant="subtitle2" // Yazı boyutu biraz küçültüldü
               sx={{ fontWeight: "bold", color: "rgba(255, 255, 255, 0.9)",  textTransform: 'uppercase' }}
             >
               {name}{lastname}
             </Typography>
             <Typography
               variant="body2"
               sx={{marginLeft:"15px", color: "rgba(255, 255, 255, 0.6)", textDecoration: "underline" }}
             >
               {role === "admin" ? "Admin" : "Ziyaretçi"}
             </Typography>
           </Box>
         </Box>
       </Link>
      )}
      

      {/* Menü Elemanları */}
      <List>
      {menuItems.map((item, index) => (
    <Link key={index} to={item.to} style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItem
        button
        sx={{
          "&:hover": {
            backgroundColor: "rgba(66, 66, 66, 0.7)", // Şeffaf hover efekti
            borderRadius: "50px", 
          },
        }}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        {isOpen && <ListItemText primary={item.text} sx={{ color: "rgba(255, 255, 255, 0.8)" }} />}
      </ListItem>
    </Link>
  ))}
      </List>
      <Box sx={{ mt: "auto", p: 2 }}>
    <ListItem
      button
      onClick={handleLogout}
      sx={{
        "&:hover": {
          backgroundColor: "rgba(66, 66, 66, 0.7)",
          borderRadius: "50px",
        },
      }}
    >
      <ListItemIcon>
        <Logout sx={{ color: "rgba(255, 255, 255, 0.8)" }} />
      </ListItemIcon>
      {isOpen && (
        <ListItemText primary="Log Out" sx={{ color: "rgba(255, 255, 255, 0.8)" }} />
      )}
    </ListItem>
  </Box>
    </Drawer>
  );
};

export default Sidebar;