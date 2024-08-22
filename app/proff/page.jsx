"use client";
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const Proff = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [professors, setProfessors] = useState([
    { id: 1, name: "Dr. John Doe", department: "Computer Science", rating: 4.8, office: "Room 101", officeHours: "Mon, Wed 2-4 PM" },
    { id: 2, name: "Dr. Jane Smith", department: "History", rating: 4.6, office: "Room 202", officeHours: "Tue, Thu 1-3 PM" },
    { id: 3, name: "Dr. Michael Johnson", department: "Biology", rating: 4.9, office: "Room 303", officeHours: "Wed, Fri 10 AM-12 PM" },
    { id: 4, name: "Dr. Sarah Williams", department: "English", rating: 4.7, office: "Room 404", officeHours: "Mon, Thu 3-5 PM" },
    { id: 5, name: "Dr. David Lee", department: "Mathematics", rating: 4.8, office: "Room 505", officeHours: "Tue, Fri 11 AM-1 PM" },
  ]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const chatRef = useRef(null);

  const filteredProfessors = professors.filter((professor) =>
    professor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = { text: newMessage, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setNewMessage("");
      
      // Process the user's message and generate a response
      const botResponse = generateBotResponse(newMessage);
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 1000);
    }
  };

  const handleProfessorSelect = (professor) => {
    setSelectedProfessor(professor);
    setMessages((prevMessages) => [...prevMessages, { text: `You selected ${professor.name}. How can I help you with information about this professor?`, sender: "bot" }]);
  };

  const generateBotResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (!selectedProfessor) {
      return { text: "Please select a professor before asking questions.", sender: "bot" };
    }

    if (lowerCaseMessage.includes("office hours")) {
      return { text: `${selectedProfessor.name}'s office hours are ${selectedProfessor.officeHours}.`, sender: "bot" };
    }

    if (lowerCaseMessage.includes("office") || lowerCaseMessage.includes("room")) {
      return { text: `${selectedProfessor.name}'s office is located in ${selectedProfessor.office}.`, sender: "bot" };
    }

    if (lowerCaseMessage.includes("department")) {
      return { text: `${selectedProfessor.name} is in the ${selectedProfessor.department} department.`, sender: "bot" };
    }

    if (lowerCaseMessage.includes("rating")) {
      return { text: `${selectedProfessor.name} has a rating of ${selectedProfessor.rating}/5.0.`, sender: "bot" };
    }

    if (lowerCaseMessage.includes("contact") || lowerCaseMessage.includes("email")) {
      return { text: `To contact ${selectedProfessor.name}, please check their faculty page or visit them during office hours.`, sender: "bot" };
    }

    return { text: `I'm sorry, I don't have specific information about that. Is there anything else you'd like to know about ${selectedProfessor.name}?`, sender: "bot" };
  };

  // Scroll to bottom of chat when new messages are added
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0D1419] p-4">
      <div className="w-full max-w-6xl bg-gray-900 shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 p-4 lg:p-8">
            <h1 className="text-2xl lg:text-3xl font-bold mb-4 text-white">Professor Recommendations</h1>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search professors..."
                className="border rounded-md px-4 py-2 w-full bg-gray-800 text-white placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <ul className="space-y-4">
              {filteredProfessors.map((professor) => (
                <li
                  key={professor.id}
                  className={cn(
                    "bg-gray-800 shadow-md rounded-md p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between cursor-pointer transition-colors",
                    selectedProfessor?.id === professor.id ? "border-2 border-blue-500" : "hover:bg-gray-700"
                  )}
                  onClick={() => handleProfessorSelect(professor)}
                >
                  <div>
                    <h2 className="text-lg lg:text-xl font-semibold text-white">{professor.name}</h2>
                    <p className="text-gray-400">{professor.department}</p>
                  </div>
                  <p className="text-yellow-400 font-semibold mt-2 sm:mt-0">Rating: {professor.rating}/5.0</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full lg:w-1/2 bg-gray-900 p-4 lg:p-8">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-white">Chat with us</h2>
            <div ref={chatRef} className="bg-gray-800 shadow-lg rounded-lg p-4 h-[300px] lg:h-[500px] overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded-lg flex mb-2 ${message.sender === "user" ? "bg-blue-600 text-white justify-end" : "bg-gray-700 text-white justify-start"}`}
                  >
                    <span className="inline-block max-w-[80%] break-words">
                      {message.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex">
              <input
                type="text"
                placeholder="Type your message..."
                className="border rounded-md px-4 py-2 flex-1 mr-2 bg-gray-800 text-white placeholder-gray-400"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proff;
