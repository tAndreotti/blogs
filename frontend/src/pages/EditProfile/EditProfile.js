import "./EditProfile.css";

import { uploads } from "../../utils/config";

// hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// redux
import { profile, updateProfile } from "../../slices/userSlice";

// components
import Message from "../../components/Message";

const EditProfile = () => {
    const dispatch = useDispatch();

    const {user, message, error, loading} = useSelector((state) => state.user);

    // states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [bio, setBio] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    // load user data
    useEffect(() => {
        dispatch(profile());
    }, [dispatch]);

    // fill form with user data
    useEffect(() => {
        if(user) {
            setName(user.name);
            setEmail(user.email);
            setBio(user.bio);
        }
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault();

        // gather user data from states
        const userData = {
            name
        };

        if(profileImage) {
            userData.profileImage = profileImage;
        };

        if(bio) {
            userData.bio = bio;
        };

        if(password) {
            userData.password = password;
        };

        // build form data
        const formData = new FormData();

        Object.keys(userData).forEach((key) => formData.append(key, userData[key]))

        await dispatch(updateProfile(formData));
    };

    const handleFile = (e) => {
        // image preview
        const image = e.target.files[0];

        setPreviewImage(image);

        // update image state
        setProfileImage(image);
    }

    return (
        <div id="edit-profile">
            <h2>Edite seus dados</h2>
            {(user.profileImage || previewImage) && (
                <img
                className="profile-image"
                src={
                    previewImage 
                    ? URL.createObjectURL(previewImage)
                    : `${uploads}/users/${user.profileImage}`
                }
                alt={user.name}
                />
            )}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nome" onChange={(e) => setName(e.target.value)} value={name || ""} />
                <input type="email" placeholder="Email" value={email || ""} disabled />
                <label>
                    <span>Imagem de Perfil:</span>
                    <input type="file" onChange={handleFile} />
                </label>
                <label>
                    <span>Bio:</span>
                    <input type="text" placeholder="Descrição do perfil" onChange={(e) => setBio(e.target.value)} value={bio || ""} />
                </label>
                <label>
                    <span>Alterar Senha:</span>
                    <input type="password" placeholder="Digite a nova senha" onChange={(e) => setPassword(e.target.value)} value={password || ""} />
                </label>
                {!loading && <input type="submit" value="ATUALIZAR" />}
                {loading && <input type="submit" value="Aguarde..." disabled />}
                {error && <Message msg={error} type="error" />}
                {message && <Message msg={message} type="success" />}
            </form>
        </div>
    )
};

export default EditProfile;