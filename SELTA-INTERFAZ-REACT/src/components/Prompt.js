import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const PromptContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f7f7f7;
  min-height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  gap: 20px;
`;

const ChatArea = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
`;

const ChatContainer = styled.div`
  background-color: white;
  width: 100%;
  max-width: 700px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const ChatHistory = styled.div`
  height: 300px;
  overflow-y: auto;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  background-color: #f9f9f9;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ff6868;
    border-radius: 10px;
  }
`;

const ChatMessage = styled.div`
  font-size: 1rem;
  color: #555;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const InputContainer = styled.form`
  display: flex;
  gap: 10px;
`;

const Input = styled.textarea`
  flex: 1;
  font-size: 1rem;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
  height: 60px;

  &:focus {
    outline: none;
    border-color: #ff6868;
  }
`;

const Button = styled.button`
  background-color: #ff6868;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #e65555;
  }
`;

const NewChatButton = styled(Button)`
  margin-top: 10px;
  width: 100%;
`;

const HistoryPanel = styled.div`
  flex: 1;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.isMinimized ? 'none' : 'block')};
  position: relative;
`;

const HistoryToggle = styled.button`
  position: absolute;
  top: 10px;
  left: -40px;
  background-color: #ff6868;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: #e65555;
  }
`;

const HistoryTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
`;

const HistoryItem = styled.div`
  font-size: 1rem;
  color: #555;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #e65555;
  font-size: 0.9rem;
  padding: 5px 10px;

  &:hover {
    background-color: #cc4444;
  }
`;

const ClearAllButton = styled(Button)`
  margin-top: 10px;
  width: 100%;
`;

const Prompt = () => {
  const [prompt, setPrompt] = useState('');
  const [chat, setChat] = useState([]);
  const [history, setHistory] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const currentUser = localStorage.getItem('currentUser') || 'guest'; // Identifica al usuario actual

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem(`promptHistory_${currentUser}`)) || [];
    setHistory(savedHistory);
  }, [currentUser]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (prompt.trim() === '') return;

    setChat([...chat, { text: prompt, date: new Date().toLocaleString() }]);
    setPrompt('');
  };

  const handleNewGeneration = () => {
    if (chat.length > 0) {
      const updatedHistory = [...history, { chat, date: new Date().toLocaleString() }];
      setHistory(updatedHistory);
      localStorage.setItem(`promptHistory_${currentUser}`, JSON.stringify(updatedHistory));
    }
    setChat([]);
  };

  const toggleHistory = () => {
    setIsMinimized(!isMinimized);
  };

  const handleDeleteChat = (index) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    setHistory(updatedHistory);
    localStorage.setItem(`promptHistory_${currentUser}`, JSON.stringify(updatedHistory));
  };

  const handleClearAll = () => {
    setHistory([]);
    localStorage.removeItem(`promptHistory_${currentUser}`);
  };

  return (
    <PromptContainer>
      <MainContent>
        {/* Área de Chat */}
        <ChatArea>
          <Title>Generador de Prompts</Title>
          <ChatContainer>
            <ChatHistory>
              {chat.length > 0 ? (
                chat.map((message, index) => (
                  <ChatMessage key={index}>
                    <strong>{message.date}:</strong> {message.text}
                  </ChatMessage>
                ))
              ) : (
                <p>No hay mensajes en este chat.</p>
              )}
            </ChatHistory>
            <InputContainer onSubmit={handleSendMessage}>
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Escribe tu mensaje..."
              />
              <Button type="submit">Enviar</Button>
            </InputContainer>
            <NewChatButton onClick={handleNewGeneration}>Iniciar Nueva Generación</NewChatButton>
          </ChatContainer>
        </ChatArea>

        {/* Panel de Historial */}
        <HistoryPanel isMinimized={isMinimized}>
          <HistoryToggle onClick={toggleHistory}>
            {isMinimized ? '▶' : '◀'}
          </HistoryToggle>
          <HistoryTitle>Historial de Chats</HistoryTitle>
          {history.length > 0 ? (
            history.map((item, index) => (
              <HistoryItem key={index}>
                <div>
                  <strong>Chat iniciado: {item.date}</strong>
                  <p>{item.chat.map((msg) => msg.text).join(', ')}</p>
                </div>
                <DeleteButton onClick={() => handleDeleteChat(index)}>Eliminar</DeleteButton>
              </HistoryItem>
            ))
          ) : (
            <p>No hay chats guardados aún.</p>
          )}
          <ClearAllButton onClick={handleClearAll}>Borrar Todo el Historial</ClearAllButton>
        </HistoryPanel>
      </MainContent>
    </PromptContainer>
  );
};

export default Prompt;
