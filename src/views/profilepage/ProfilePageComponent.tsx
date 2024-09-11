import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import './ProfilePageComponent.css';
import HeaderComponent from "../../components/headercomponent/HeaderComponent";
import fileToBase64 from "../../utils/fileUtils";



const ProfilePageComponent: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    const storedImage = localStorage.getItem('profileImage');

    if (storedUser) {
      setUsername(storedUser);
    }
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const base64Image = await fileToBase64(e.target) as string;
      setProfileImage(base64Image);
      localStorage.setItem('profileImage', base64Image);
    } catch (error) {
      console.error("Error converting file to base64", error);
    }
  }


  const handleSignOut = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('profileImage');
    navigate('/login');
  }

  return (
    <>
      <HeaderComponent />
      <div className="profile-container">
        <h2>Welcome, {username}</h2>
        <div>

          {profileImage ? (
            <img src={profileImage} alt="Profile Image" className="profile-image" />
          ) : (
            <p>No profile image uploaded</p>
          )}
        </div>
        <div>
          <label htmlFor="profile-image-uproad">Upload Profile Image</label>
          <input id="profile-image-uproad" type="file" onChange={handleImageUpload} />
        </div>
        <div>
          <button className="profile-button" onClick={handleSignOut}>Log out</button>
        </div>

      </div>
    </>
  );
};

export default ProfilePageComponent;