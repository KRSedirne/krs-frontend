import React, { useEffect, useState } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Typography, Avatar, Box ,useMediaQuery} from "@mui/material";
import { Menu as MenuIcon, Home as HomeIcon, Book as BookIcon, QrCode as QrCodeIcon, Lock as LockIcon, Logout, DoNotTouch, EventSeat } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { logout } from '../../api/auth/auth.js';
import { getProfile } from "../../api/user/profile";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Sidebar = ({ onToggle }) => {
  const creme="#FDFDF8";
  const darkBlue="#2A3C50";
  const brown="#5D4038";
  const golden="#F29C13";
  
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
        toast.error(error.response.data.message)
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
    { to: "/home", icon: <HomeIcon sx={{ color: " rgba(253, 253, 242, 0.8)" }} />, text: "Ana Sayfa" },
    { to: "/saloon", icon: <EventSeat sx={{ color: " rgba(253, 253, 242, 0.8)" }} />, text: "Rezervasyon Yap" },
    { to: "/qr", icon: <QrCodeIcon sx={{ color: " rgba(253, 253, 242, 0.8)" }} />, text: "QR Kodum" },
    { to: "https://kesifaraci.com/?uid=trakya.edu.tr", icon: <BookIcon sx={{ color: " rgba(253, 253, 242, 0.8)" }} />, text: "Katalog Tara" },
    { to: "/locker", icon: <LockIcon sx={{ color: " rgba(253, 253, 242, 0.8)" }} />, text: "Dolap Kirala" },
  ];
  if(role==="admin"){
    menuItems=[
      { to: "/home", icon: <HomeIcon sx={{ color: " rgba(253, 253, 242, 0.8)" }} />, text: "Ana Sayfa" },
      { to: "/adminSaloon", icon: <EventSeat sx={{ color: " rgba(253, 253, 242, 0.8)" }} />, text: "Rezervasyon Yap" },
      { to: "/adminQR", icon: <QrCodeIcon sx={{ color: " rgba(253, 253, 242, 0.8)" }} />, text: "QR Kod Tara" },
      { to: "https://kesifaraci.com/?uid=trakya.edu.tr", icon: <BookIcon sx={{ color: creme }} />, text: "Katalog Tara" },
      { to: "/adminLocker", icon: <LockIcon sx={{ color:" rgba(253, 253, 242, 0.8)" }} />, text: "Dolap Kirala" },
      { to: "/adminSuspended", icon: <DoNotTouch sx={{ color: " rgba(253, 253, 242, 0.8)" }} />, text: "Engellenmiş Kullanıcılar" },
    ];
  };
  const handleLogout = async () => {
    try {
      await logout(); 
      localStorage.removeItem('authToken'); 
      toast.success("Başarıyla çıkış yapılmıştır!");
      navigate('/');
    } catch (error) {
      toast.error("Çıkış yaparken hata meydana gelmiştir. Lütfen tekrar deneyiniz.");
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
          backgroundColor: "rgba(8, 12, 16, 0.6)", 
          color: "rgba(253, 253, 242, 0.8)",
          height: "100vh",
          minHeight: "100vh",
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
        <IconButton onClick={toggleSidebar} sx={{ color: " rgba(253, 253, 242, 0.8)" }}>
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
             backgroundColor: "rgba(42, 60, 80, 0.8)",
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
               backgroundColor: "rgba(190, 199, 213, 0.9)",
               color:creme
               
             }}
           >
              {name[0]}
           </Avatar>
     
           {/* Kullanıcı Bilgileri */}
           <Box
             display="flex"
             flexDirection="column"
             alignItems="center"
             justifyContent="center"
             ml={5}
           >
             <Typography
               variant="subtitle2" // Yazı boyutu biraz küçültüldü
               sx={{ fontWeight: "bold", color: " rgba(253, 253, 242, 0.9)",  textTransform: 'uppercase' }}
             >
               {name} {lastname}
             </Typography>
             <Typography
               variant="body2"
               sx={{ color: " rgba(253, 253, 242, 0.5)", textDecoration: "underline" }}
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
            backgroundColor: "rgba(13, 19, 25, 0.3)", // Şeffaf hover efekti
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