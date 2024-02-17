import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <div className="app-header">
      <div>
        <h2>Star Wars</h2>
      </div>
      <div>
        <Button
          onClick={() => {
            localStorage.removeItem("sw-token");
            navigate("/login");
          }}
          type="primary"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
