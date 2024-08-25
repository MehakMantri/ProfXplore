"use client";
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import axios from "axios"; // Import axios for making HTTP requests
import ProfessorPreview from "@/components/ProfessorPreview";
const Proff = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [professors, setProfessors] = useState([    
    { "id": 1, "name": "Dr. Karen Lee", "department": "Mathematics", "rating": 4.9, "office": "Room 111", "officeHours": "Mon, Thu 10 AM-12 PM", "reviews": [] },
    { "id": 2, "name": "Dr. Samuel Hall", "department": "Art History", "rating": 4.8, "office": "Room 119", "officeHours": "Mon, Tue 11 AM-1 PM", "reviews": [] },
    { "id": 3, "name": "Dr. Tina Allen", "department": "Art History", "rating": 4.6, "office": "Room 120", "officeHours": "Wed, Fri 2-4 PM", "reviews": [] },
    { "id": 4, "name": "Dr. Rachel Scott", "department": "Sociology", "rating": 4.6, "office": "Room 118", "officeHours": "Wed, Thu 3-5 PM", "reviews": [] },
    { "id": 5, "name": "Dr. Grace Williams", "department": "History", "rating": 4.7, "office": "Room 107", "officeHours": "Tue, Thu 11 AM-1 PM", "reviews": [] },
    { "id": 6, "name": "Dr. Frank Brown", "department": "Biology", "rating": 4.6, "office": "Room 106", "officeHours": "Mon, Wed 2-4 PM", "reviews": [] },
    { "id": 7, "name": "Dr. David Wilson", "department": "Biology", "rating": 4.6, "office": "Room 104", "officeHours": "Wed, Fri 10 AM-12 PM", "reviews": [] },
    { "id": 8, "name": "Dr. Jack Wilson", "department": "Literature", "rating": 4.7, "office": "Room 110", "officeHours": "Wed, Fri 1-3 PM", "reviews": [] },
    { "id": 9, "name": "Dr. Henry Davis", "department": "History", "rating": 4.6, "office": "Room 108", "officeHours": "Mon, Wed 9 AM-11 AM", "reviews": [] },
    { "id": 10, "name": "Dr. Carol Smith", "department": "Computer Science", "rating": 4.9, "office": "Room 103", "officeHours": "Mon, Fri 1-3 PM", "reviews": [] },
    { "id": 11, "name": "Dr. Brian Lee", "department": "Computer Science", "rating": 4.7, "office": "Room 102", "officeHours": "Tue, Thu 2-4 PM", "reviews": [] },
    { "id": 12, "name": "Dr. Nathan White", "department": "Philosophy", "rating": 4.8, "office": "Room 114", "officeHours": "Tue, Thu 2-4 PM", "reviews": [] },
    { "id": 13, "name": "Dr. Michael Johnson", "department": "Biology", "rating": 4.9, "office": "Room 303", "officeHours": "Wed, Fri 10 AM-12 PM", "reviews": [] },
    { "id": 14, "name": "Dr. Alice Johnson", "department": "Computer Science", "rating": 4.8, "office": "Room 101", "officeHours": "Mon, Wed 10 AM-12 PM", "reviews": [] },
    { "id": 15, "name": "Dr. Liam Green", "department": "Mathematics", "rating": 4.6, "office": "Room 112", "officeHours": "Tue, Fri 11 AM-1 PM", "reviews": [] },
    { "id": 16, "name": "Dr. Eva Adams", "department": "Biology", "rating": 4.5, "office": "Room 105", "officeHours": "Tue, Thu 3-5 PM", "reviews": [] },
    { "id": 17, "name": "Dr. Maria Garcia", "department": "Philosophy", "rating": 4.7, "office": "Room 113", "officeHours": "Mon, Wed 3-5 PM", "reviews": [] },
    { "id": 18, "name": "Dr. Olivia Young", "department": "Political Science", "rating": 4.5, "office": "Room 115", "officeHours": "Wed, Fri 9 AM-11 AM", "reviews": [] },
    { "id": 19, "name": "Dr. Peter King", "department": "Political Science", "rating": 4.6, "office": "Room 116", "officeHours": "Mon, Thu 2-4 PM", "reviews": [] },
    { "id": 20, "name": "Dr. Sarah Williams", "department": "English", "rating": 4.7, "office": "Room 404", "officeHours": "Mon, Thu 3-5 PM", "reviews": [] }
  ]
  );
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const chatRef = useRef(null);

  const filteredProfessors = professors.filter((professor) =>
    professor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const systemPrompt = `
  You are a rate my professor agent to help students find classes, that takes in user questions and answers them.
  For every user question, the top 3 professors that match the user question are returned.
  Use them to answer the question if needed.
  
  If the user wants to update a professor's rating, respond with:
  ACTION:UPDATE_RATING
  NEW_RATING:X.X
  
  If the user wants to add a review for a professor, respond with:
  ACTION:ADD_REVIEW
  REVIEW:The review text here
  
  Otherwise, provide a helpful response based on the available information.
  `;
const findTopProfessors = (query) => {
  // Simple matching algorithm - can be improved for better results
  return professors
    .map(prof => ({
      ...prof,
      score: prof.name.toLowerCase().includes(query.toLowerCase()) || 
              prof.department.toLowerCase().includes(query.toLowerCase()) ? 1 : 0
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
};

const handleSendMessage = async () => {
  if (newMessage.trim()) {
    const userMessage = { text: newMessage, sender: "user" };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setNewMessage("");

    const botResponse = await generateBotResponse(newMessage);
    setMessages(prevMessages => [...prevMessages, botResponse]);
  }
};

const generateBotResponse = async (userMessage) => {
  const topProfessors = findTopProfessors(userMessage);

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_META_API_KEY}`,
        "HTTP-Referer": `${process.env.NEXT_PUBLIC_YOUR_SITE_URL}`,
        "X-Title": `${process.env.NEXT_PUBLIC_YOUR_SITE_NAME}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "meta-llama/llama-3.1-8b-instruct:free",
        "messages": [
          {"role": "system", "content": systemPrompt},
          {"role": "user", "content": `Question: ${userMessage}\nTop Professors: ${JSON.stringify(topProfessors)}\nSelected Professor: ${JSON.stringify(selectedProfessor)}`},
        ],
      })
    });

    const data = await response.json();
    const botResponse = data.choices[0].message.content;

    // Parse the bot response for actions
    if (botResponse.includes("ACTION:UPDATE_RATING") && selectedProfessor) {
      const newRating = parseFloat(botResponse.match(/NEW_RATING:(\d+(\.\d+)?)/)[1]);
      updateProfessorRating(selectedProfessor.id, newRating);
      return {
        text: `I've updated ${selectedProfessor.name}'s rating to ${newRating}.`,
        sender: "bot",
      };
    } else if (botResponse.includes("ACTION:ADD_REVIEW") && selectedProfessor) {
      const review = botResponse.match(/REVIEW:(.*)/)[1];
      addProfessorReview(selectedProfessor.id, review);
      return {
        text: `I've added your review for ${selectedProfessor.name}. Thank you for your feedback!`,
        sender: "bot",
      };
    } else {
      return { text: botResponse, sender: "bot" };
    }
  } catch (error) {
    console.error("Error generating response with Llama 3.1 8B Instruct API:", error);
    return {
      text: "I'm sorry, I encountered an error while processing your request. Please try again later.",
      sender: "bot",
    };
  }
};
  const handleProfessorSelect = (professor) => {
    setSelectedProfessor(professor);
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: `You selected ${professor.name}. How can I help you with information about this professor?`, sender: "bot" },
    ]);
  };

  const [hoverProfessor, setHoverProfessor] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const hoverTimeoutRef = useRef(null);

  const handleProfessorHover = (professor, event) => {
    clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setHoverProfessor(professor);
      setHoverPosition({ x: event.clientX, y: event.clientY });
    }, 500); // 500ms delay before showing preview
  };
  const handleProfessorHoverEnd = () => {
    clearTimeout(hoverTimeoutRef.current);
    setHoverProfessor(null);
  };
  const handleAddReview = (professor) => {
    // You can implement the logic to add a review here
    // For now, let's just log it
    console.log(`Adding review for ${professor.name}`);
    setHoverProfessor(null);
  };

      
  const addProfessorReview = (professorId, review) => {
    setProfessors((prevProfessors) =>
      prevProfessors.map((prof) =>
        prof.id === professorId ? { ...prof, reviews: [...prof.reviews, review] } : prof
      )
    );
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
            <div className="h-[500px] overflow-y-auto">
            <ul className="space-y-4">
              {filteredProfessors.map((professor) => (
                <li
                  key={professor.id}
                  className={cn(
                    "bg-gray-800 shadow-md rounded-md p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between cursor-pointer transition-colors",
                    selectedProfessor?.id === professor.id ? "border-2 border-blue-500" : "hover:bg-gray-700"
                  )}
                  onClick={() => handleProfessorSelect(professor)}
                  onMouseEnter={(e) => handleProfessorHover(professor, e)}
                  onMouseLeave={handleProfessorHoverEnd}
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
                    <span className={`inline-block ${message.sender === "user" ? "ml-auto" : "mr-auto"}`}>
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
                onClick={handleSendMessage}
                className="bg-blue-600 text-white rounded-md px-4 py-2"
              >
                Send
              </button>
            </div>
          </div>

        </div>
        {hoverProfessor && (
        <div
          style={{
            position: 'fixed',
            top: hoverPosition.y + 20,
            left: hoverPosition.x + 20,
            zIndex: 1000,
          }}
        >
          <ProfessorPreview professor={hoverProfessor} onAddReview={handleAddReview} />
      </div>)}
      </div>
    </div>
  );
};

export default Proff;
