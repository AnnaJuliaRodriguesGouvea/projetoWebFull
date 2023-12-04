import React, {useContext, useState} from "react";
import Container from "@mui/material/Container";
import {Button, Paper, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {login} from "../service/authenticationService";
import {AppContext} from "../App";

const Login = () => {
    const context = useContext(AppContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')

    const handleLogin = async () => {
        try {
            setErrorEmail(null)
            setErrorPassword(null)
            const result = await login(email, password);
            if(result && result.status === 200) {
                localStorage.setItem("token", result.data)
                context.setAuthenticated(true)

                const socket = new WebSocket('ws://localhost:8080',
                    ["access_token", result.data]
                );

                socket.addEventListener('message', (msg) => {
                    console.log('received: %s', msg.data);
                    context.notifications.push(msg.data)
                })

                context.setSocket(socket)
            }
        } catch (err) {
            console.log(err)
            if(err.data.toLowerCase().includes("email"))
                setErrorEmail(err.data)
            if(err.data.toLowerCase().includes("senha"))
                setErrorPassword(err.data)
            if(err.data.toLowerCase().includes("solicitações"))
                setErrorEmail(err.data)
        }
    };

    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%' }}>
            <Paper sx={{ width: '500px', height: '500px', padding: '20px', backgroundColor: '#E8E1D9', boxShadow: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Typography
                    variant="h5"
                    sx={{
                        fontFamily: 'Playpen Sans',
                        fontWeight: '500',
                        fontSize: '32px',
                        marginBottom: '50px',
                        color: '#125C13'
                }}>
                    Login
                </Typography>
                <TextField
                    error={Boolean(errorEmail)}
                    helperText={errorEmail}
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    sx={{ marginBottom: '20px' }}
                />
                <TextField
                    error={Boolean(errorPassword)}
                    helperText={errorPassword}
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    sx={{ marginBottom: '20px' }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    sx={{
                        backgroundColor: '#125C13',
                        color: '#FFF',
                        fontFamily: 'Playpen Sans',
                        fontWeight: '500',
                        borderRadius: 5,
                        fontSize: '12px',
                        width: '100%',
                        height: '10%',
                        '&:hover': {
                            backgroundColor: '#F5F3F2',
                            color: '#125C13'
                        }
                }}>
                    Login
                </Button>
            </Paper>
        </Container>
    );
};

export default Login;
