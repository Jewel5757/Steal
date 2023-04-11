import "./Login.css";
import { Link } from 'react-router-dom';

function Login(props) {


const {
        setUserEmail,
        isAuthenticated, 
        setIsAuthenticated,
        isLoading,
        setIsLoading,
        password,
        setPassword,
        email,
        setEmail,
      } = props;

      const handleEmailChange = (event) => {
        setEmail(event.target.value);
      };
    
      const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
    
        try {
          const response = await fetch("https://sf-final-project-be.herokuapp.com/api/auth/sign_in", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
          
            },
            body: JSON.stringify({
              email,
              password,
            }),
          });
    
          if (!response.ok) {
            throw new Error("Неверный логин или пароль");
          }
    
          setIsAuthenticated(true);
          setUserEmail(email);
          setEmail("");
          setPassword("");
        } catch (error) {
          console.error(error);
          alert("Неверный логин или пароль");
        }
    
        setIsLoading(false);
      };
    
      if (isLoading) {
        return <p>Загрузка</p>;
      }
    
      if (isAuthenticated) {
        return (
        <div  className="loginSucsess">
          <p>Авторизация успешна</p>
          <Link to="/"><button>На главную</button></Link>
        </div>
        );
      }
    
      return (
          <div className="login">
            <form onSubmit={handleSubmit}>
              <label>
                Email:
              </label>
              <input type="email" value={email} onChange={handleEmailChange} />
              <label>
                Пароль:
              </label>
              <input type="password" value={password} onChange={handlePasswordChange} />
              <button type="submit">Вход</button>
            </form>
          </div>
      );
    }
    
    export default Login;