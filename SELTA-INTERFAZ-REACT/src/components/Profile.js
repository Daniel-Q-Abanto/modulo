import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f7f7f7;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
`;

const UserInfo = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  text-align: center;
`;

const InfoRow = styled.div`
  margin-bottom: 15px;
  text-align: left;
  font-size: 1rem;
  color: #555;

  p {
    margin: 5px 0;
    font-weight: bold;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  button {
    width: 48%;
  }
`;

const Button = styled.button`
  background-color: ${(props) => (props.secondary ? '#ff6868' : '#ddd')};
  color: ${(props) => (props.secondary ? 'white' : '#333')};
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    opacity: 0.9;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  font-size: 1rem;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ nombre_usuario: '', correo: '', contraseña: '' });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('access_token');
      const response = await fetch('http://127.0.0.1:8000/api/profile/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUser(data);
      setFormData({ nombre_usuario: data.nombre_usuario, correo: data.correo, contraseña: '' });
    };

    fetchUser();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    try {
      const response = await fetch('http://127.0.0.1:8000/api/profile/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        alert('Datos actualizados correctamente');
        setIsEditing(false);
      } else {
        alert('Error al actualizar los datos');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    window.location.href = '/login';
  };

  return (
    <ProfileContainer>
      <Title>Perfil del Usuario</Title>
      {user ? (
        <UserInfo>
          {isEditing ? (
            <Form onSubmit={handleSave}>
              <Input
                type="text"
                name="nombre_usuario"
                placeholder="Nombre de usuario"
                value={formData.nombre_usuario}
                onChange={handleInputChange}
                required
              />
              <Input
                type="email"
                name="correo"
                placeholder="Correo electrónico"
                value={formData.correo}
                onChange={handleInputChange}
                required
              />
              <Input
                type="password"
                name="contraseña"
                placeholder="Nueva contraseña (opcional)"
                value={formData.contraseña}
                onChange={handleInputChange}
              />
              <ButtonContainer>
                <Button type="submit" secondary>
                  Guardar
                </Button>
                <Button type="button" onClick={handleEditToggle}>
                  Cancelar
                </Button>
              </ButtonContainer>
            </Form>
          ) : (
            <>
              <InfoRow>
                <p>Nombre:</p>
                {user.nombre_usuario}
              </InfoRow>
              <InfoRow>
                <p>Email:</p>
                {user.correo}
              </InfoRow>
              <ButtonContainer>
                <Button onClick={handleEditToggle}>Editar Perfil</Button>
                <Button secondary onClick={handleLogout}>
                  Cerrar Sesión
                </Button>
              </ButtonContainer>
            </>
          )}
        </UserInfo>
      ) : (
        <p>Cargando...</p>
      )}
    </ProfileContainer>
  );
};

export default Profile;
