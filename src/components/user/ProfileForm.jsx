import React, {useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { getProfile } from '../../api/user/profile';
import { Typography } from '@mui/material';
import UpdatePasswordModal from '../modals/UpdatePasswordModal';
import toast from 'react-hot-toast';

const ProfileForm = () => {

  const [name, setName] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("********") // password icin gözüksün gözükmesin iconu eklenicek
  const [isLoading, setIsLoading] = useState(true)
  const [IsShowUpdatePasswordModal, setIsShowUpdatePasswordModal] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await getProfile()
        setName(response.data.name)
        setLastname(response.data.lastname)
        setEmail(response.data.email)

        setIsLoading(false)
      } catch (error) {
        toast.error(error.response.data.message) // productin error message olması gerek, backend buna göre düzenlenmeli
      }
    }
    fetchData()
  }, []);

  return (
    <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>
      <Card sx={{ maxWidth: 750, width: '100%', height: 750, backgroundColor: '#00000'  }}>
          <Avatar
          alt="Remy Sharp"
          src="/images/default_avatar.png"
          sx={{ width: 156, height: 156, alignContent: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: 2 }}
          />
          <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }} noValidate autoComplete="off"> 
            <CardContent>
                <Box sx={{  display: 'flex', alignItems: 'center', marginBottom: 2, justifyContent: 'center', marginRight: 12}}>
                  <Typography style={{ width: '100px', fontSize:'20px', fontWeight:'bold' }}>Name</Typography>
                  <TextField id="outlined-name-input" type="name" value={name} InputProps={{ readOnly: true}}/>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, justifyContent: 'center', marginRight: 12 }}>
                  <Typography style={{ width: '100px', fontSize:'20px', fontWeight:'bold' }}>Surname</Typography>
                  <TextField id="outlined-surname-input" type="surname" value={lastname} InputProps={{ readOnly: true}} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, justifyContent: 'center', marginRight: 12 }}>
                  <Typography style={{ width: '100px', fontSize:'20px', fontWeight:'bold' }}>Email</Typography>
                  <TextField id="outlined-email-input" type="email" value={email} InputProps={{ readOnly: true}}/>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, justifyContent: 'center', marginRight: 12 }}>
                  <Typography style={{ width: '100px', fontSize:'20px', fontWeight:'bold' }}>Password</Typography>
                  <TextField sx={{ width:'300px' }} id="outlined-password-input" type="password" value={password} InputProps={{ readOnly: true}}/>
                </Box>
                  
                <Button variant="contained" color="primary" style={{marginTop: 10}} disabled={isLoading} onClick={() => setIsShowUpdatePasswordModal(true) }>
                  {isLoading ? "wait..." : "Update Password"}
                </Button>
                {IsShowUpdatePasswordModal && (
                  <UpdatePasswordModal setIsShowUpdatePasswordModal={setIsShowUpdatePasswordModal} />
                )}
                
            </CardContent>
          </Box>
      </Card>
    </Box>
  )
}

export default ProfileForm
