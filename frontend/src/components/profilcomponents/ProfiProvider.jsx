import { ProfileProvider } from "./ProfileContext";
import UserInfos from "./UserInfos";

function App() {
  return (
    <ProfileProvider>
      <div className="App">
        <UserInfos />
      </div>
    </ProfileProvider>
  );
}

export default App;
