import { useState , useContext } from "react";
import Button from '@mui/material/Button';
import {
  Box,
  Typography,
  Stack,
  Link as MuiLink,
} from '@mui/material';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
//component
import { signInWithEmailAndPassword } from "firebase/auth";
import yinthway_login from '../assets/images/yinthway_login.png';
import OverlayLoading from '../components/common/loading/OverlayLoading';
import AuthContext from '../store/Auth-context';
import { auth } from "../configs/Firebase_Config";
import MyancareLogo from "../assets/images/yinthway_logo.png";
import "../assets/styles/scss/Login.scss";


const LoginForm = props => {

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const authCtx = useContext(AuthContext);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { isValid, errors },
    watch
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const [openedOverlayLoading, setOpenedOverlayLoading] = useState(false);

  const onSubmit = (data) => {

    setErrorMessage("");

    if (isValid) {
      const { email, password } = data;
      setOpenedOverlayLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((data) => {
          let reponseData = data._tokenResponse;
          setOpenedOverlayLoading(false);
          const expirationTime = new Date(
            new Date().getTime() + reponseData.expiresIn * 1000
          );
          authCtx.login(reponseData, expirationTime.toISOString());
          navigate("/dashboard");
        })
        .catch((err) => {
          setOpenedOverlayLoading(false);
          setErrorMessage("Authentication failed !")
        });
    }
  }

  return (
    <Box className="login-page">
      <Box className="login-left-side-img-container">
        <Box className="login-page-logo" >
          <img src={MyancareLogo} alt="Myancare logo" className="myancare-logo" />
        </Box>
        <Box className="login-page-img">
          <img src={yinthway_login} className="yin-thway-login-img" />
        </Box>
      </Box>
      <Box className="login-box-container">
        <form className="login-form-container" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Typography className="login-title" gutterBottom>
            Yin Thway Dasboard
          </Typography>
          <Box className="login-box"
            sx={{
              '& > :not(style)': { width: '100%' },
              mx: 2
            }}
            noValidate
            autoComplete="off"
          >
            <Box className="input-container">
              <label htmlFor="email">Email:</label>
              <input type="text" id="email" name="email" placeholder="Enter email" {...register('email')} className={errors.email && 'error'} />
              <Typography className="error-message" color={errors.email ? 'error' : 'inherit'}>
                {errors.email?.message}
              </Typography>
            </Box>
            <Box className="input-container">
              <label htmlFor="password">Password:</label>
              <input type="text" id="password" name="password" placeholder="Enter password" {...register('password')} className={errors.password && 'error'} />
              <Typography className="error-message" color={errors.password ? 'error' : 'inherit'}>
                {errors.password?.message}
              </Typography>
            </Box>
            {
              errorMessage && (
                <Typography className="error-message"  color={'error'}>
                  {errorMessage}
                </Typography>
              )
            }
          </Box>
          <Box className="login-btn-container" display="flex" justifyContent="center">
            <Button className="login-submit-btn" type='submit'>
              LOGIN
            </Button>
          </Box>
        </form>
      </Box>
      {openedOverlayLoading ? <OverlayLoading /> : null}
    </Box>
  );
};

export default LoginForm;
