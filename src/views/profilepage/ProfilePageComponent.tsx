import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import './ProfilePageComponent.css';
import HeaderComponent from "../../components/headercomponent/HeaderComponent";



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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageString = reader.result as string;
        setProfileImage(imageString);
        localStorage.setItem('profileImage', imageString);
      };
      reader.readAsDataURL(file);
    }
  };

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