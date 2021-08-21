import { SmileOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import ButtonComponent from "../components/formComponents/ButtonComponent";
import InputComponent from "../components/formComponents/InputComponent";
import InputPasswordComponent from "../components/formComponents/InputPasswordComponent";
import UserService from "../services/UserService";
import openNotification from "../components/NotificationComponent";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null);

    let history = useHistory();

    const Login = async () => {
        await UserService.Login({username: username, password: password})
            .then(response => {
                localStorage.setItem("token", response.data.token);
                history.push('/Collection');

                openNotification(
                    "Sucesso!", 
                    "Logado com sucesso!",
                    SmileOutlined,
                    'bottomRight'
                );
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div style={{
            width: '25vh',
            height: '25vh',
            overflow: 'auto',
            margin: 'auto',
            position: 'absolute',
            top: 0, left: 0, bottom: 0, right: 0,
        }}>
            <div style={{marginTop: '1vh'}}>
                <InputComponent
                    label="Username"
                    Icon={UserOutlined}
                    value={username}
                    setValue={setUsername}
                />
            </div>
            <div style={{marginTop: '1vh'}}>
                <InputPasswordComponent
                    label="Password"
                    value={password}
                    setValue={setPassword}
                />
            </div>
            <div style={{marginTop: '1vh', textAlign: 'center'}}>
                <ButtonComponent
                    label="Login"
                    type="primary"
                    onClick={Login}
                />
            </div>
        </div>
    );
};

export default LoginPage;