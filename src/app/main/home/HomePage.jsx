import { selectUser } from "@/store/userSlice";
import { useSelector } from "react-redux";
import jwtService from "../../../service/jwtService";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";

function HomePage() {
  const user = useSelector(selectUser);
  const params = useParams();
  console.log({ params });

  return (
    <div>
      <img src={user?.picture} alt={user.name} />
      <Button onClick={() => jwtService.logoutUser()}>Logout</Button>
    </div>
  );
}

export default HomePage;
