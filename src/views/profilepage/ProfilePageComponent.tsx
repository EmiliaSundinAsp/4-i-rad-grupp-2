import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import './ProfilePageComponent.css';
import HeaderComponent from "../../components/headercomponent/HeaderComponent";
import fileToBase64 from "../../utils/fileUtils";



const ProfilePageComponent: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setUsername(storedUser);


      const storedImage = localStorage.getItem(`profileImage_${storedUser}`);

      setProfileImage(storedImage || null);

    }
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const base64Image = await fileToBase64(e.target);
      setProfileImage(base64Image);
      if (username) {
        localStorage.setItem(`profileImage_${username}`, base64Image);
      }

    } catch (error) {
      console.error("Error converting file to base64:", error);
      setError('Error uploading image.');
    }
  };


  const handleSaveImage = async () => {
    console.log('Sending base64 image:', profileImage);
    if (username && profileImage) {
      try {
        const response = await fetch('http://localhost:5001/api/uploadImage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userName: username,
            encoded: profileImage,
            password: "userPasswordHere",
          }),
        });

        if (response.ok) {
          setError('Profile image saved successfully!');
        } else {
          setError('Failed to save the profile image.');
        }
      } catch (error) {
        console.error("Error saving image:", error);
      }
    }
  };



  const handleSignOut = () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {

      localStorage.removeItem(`profileImage_${loggedInUser}`);
    }


    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('userProfileData');
    setUsername(null);
    setProfileImage(null);
    navigate('/');
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
          <input id="profile-image-uproad" type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
        <div>
          <button className="save-button" onClick={handleSaveImage}>Save Profile Image</button>
        </div>
        <div>
          {error && <p>{error}</p>}
        </div>
        <div>
          <button className="profile-button" onClick={handleSignOut}>Log out</button>
        </div>

      </div>
    </>
  );
};

export default ProfilePageComponent;