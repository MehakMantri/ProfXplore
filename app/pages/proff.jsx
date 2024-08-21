"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

const Proff = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [professors, setProfessors] = useState([
    { id: 1, name: "Dr. John Doe", department: "Computer Science", rating: 4.8 },
    { id: 2, name: "Dr. Jane Smith", department: "History", rating: 4.6 },
    { id: 3, name: "Dr. Michael Johnson", department: "Biology", rating: 4.9 },
    { id: 4, name: "Dr. Sarah Williams", department: "English", rating: 4.7 },
    { id: 5, name: "Dr. David Lee", department: "Mathematics", rating: 4.8 },
  ]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const filteredProfessors = professors.filter((professor) =>
    professor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: "user" }]);
      setNewMessage("");
      //add response from the chatbot
      setTimeout(() => {
        setMessages([...messages, { text: newMessage, sender: "user" }, { text: "Thank you for your message!", sender: "bot" }]);
      }, 1000);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[#0D1419]">
      <div className="w-full max-w-6xl bg-gray-900 shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-8">
            <h1 className="text-3xl font-bold mb-4 text-white">Professor Recommendations</h1>
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
                    "bg-gray-800 shadow-md rounded-md p-4 flex items-center justify-between"
                  )}
                >
                  <div>
                    <h2 className="text-xl font-semibold text-white">{professor.name}</h2>
                    <p className="text-gray-400">{professor.department}</p>
                  </div>
                  <p className="text-yellow-400 font-semibold">Rating: {professor.rating}/5.0</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/2 bg-gray-900 p-8">
            <h2 className="text-3xl font-bold mb-4 text-white">Chat with us</h2>
            <div className="bg-gray-800 shadow-lg rounded-lg p-4 h-[500px] overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                  key={index}
                  className={`p-2 rounded-lg flex  mb-2 ${message.sender === "user" ? "bg-blue-600 text-white flex-end text-right" : "bg-gray-700 text-white flex-start text-left"}`}
                >
                    {message.text}
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
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
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
