import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../App.css";
// import "./ChatBox.css";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

function ChatBox() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submittedQuestion, setSubmittedQuestion] = useState("");
  const [darkTheme, setDarkTheme] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  const [listening, setListening] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
   const [messages, setMessages] = useState([]);

  //  console.log(reply)
  //  console.log(messages)

  const [image, setImage] = useState(null);
  const [nutrition, setNutrition] = useState(null);
  // const [error, setError] = useState(null);
  const fileInputRef = useRef(null);



  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImage(URL.createObjectURL(file));
    setError(null);
    setNutrition(null); // reset previous results

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("https://ai-nutrition-app-6.onrender.com/image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        console.log("Prediction:", data.prediction);
        setNutrition(data.prediction);
      } else {
        setError("Prediction failed. " + data.error);
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const recognition = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    axios
      .get("https://ai-nutrition-app-6.onrender.com/api/history")
      .then((res) => {
        setChatHistory(res.data);
      })
      .catch((err) => console.error("Failed to load chat history", err));
  }, []);

  useEffect(() => {
    if (!SpeechRecognition) return;

    recognition.current = new SpeechRecognition();
    recognition.current.lang = "en-US";
    recognition.current.interimResults = false;
    recognition.current.maxAlternatives = 1;

    recognition.current.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setInput(speechToText);
      setListening(false);
    };

    recognition.current.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setListening(false);
    };

    recognition.current.onend = () => {
      setListening(false);
    };
  }, []);

  const suggestions = [
    "Suggest a 1200-calorie Indian vegetarian meal plan.",
    "I’m 50 years old, 100 kg, want to reach 60. Suggest a meal plan.",
    "Give me a high-protein breakfast with less than 400 calories.",
    "What should a diabetic eat for dinner?",
    "Suggest a meal plan for muscle gain.",
    "What are some low-carb snacks I can eat daily?",
  ];

  const toggleTheme = () => setDarkTheme(!darkTheme);
  const toggleHistory = () => setShowHistory(!showHistory);

  const handleSuggestionClick = (text) => {
    setInput(text);
    handleSubmit(null, text);
  };

const handleSubmit = async (e, text) => {
  if (e) e.preventDefault();
  const userText = text || input;
  if (!userText.trim()) return;

  setMessages((prev) => [...prev, { sender: "user", text: userText }]);
  setInput("");
  setError("");
  setLoading(true);

  try {
    const response = await axios.post("https://ai-nutrition-app-7.onrender.com/chat", {
      message: userText,
    });

    const botReply = response.data.reply || "No reply from assistant.";

    setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    setReply(botReply);
    setSubmittedQuestion(userText);

    await axios.post("https://ai-nutrition-app-6.onrender.com/api/history", {
      question: userText,
      answer: botReply,
    });

    const historyResponse = await axios.get("https://ai-nutrition-app-6.onrender.com/api/history");
    setChatHistory(historyResponse.data);
  } catch (err) {
    setError("Error fetching reply from assistant.");
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  // const handleSubmit = async (e, text) => {
  //   if (e) e.preventDefault();
  //   const userText = text || input;
  //   if (!userText.trim()) return;

  //   setError("");
  //   setReply("");
  //   setLoading(true);

  //   try {
  //     const response = await axios.post("http://localhost:5000/chat", {
  //       message: userText,
  //     });

  //     const data = response.data.reply;
  //     if (data && data.length > 0) {
  //       setReply(data);
  //       setSubmittedQuestion(userText);

  //       await axios.post("http://localhost:5000/api/history", {
  //         question: userText,
  //         answer: data,
  //       });

  //       const historyResponse = await axios.get(
  //         "http://localhost:5000/api/history"
  //       );
  //       setChatHistory(historyResponse.data);
  //       setInput("");
  //     } else {
  //       setError("No reply received.");
  //     }
  //   } catch (err) {
  //     setError("Error fetching reply from assistant.");
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const toggleListening = () => {
    if (!recognition.current) return;
    listening ? recognition.current.stop() : recognition.current.start();
    setListening(!listening);
  };

   return (
    <div className={`app ${darkTheme ? "dark" : "light"}`}>
      <div
        className="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          // marginBottom: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={toggleHistory}
            className="history-toggle"
            style={{ fontSize: 16 }}
          >
            {showHistory ? (
              <i className="fa fa-times"></i>
            ) : (
              <i className="fa fa-bars"></i>
            )}
          </button>
          <h1 style={{ margin: 0 }}>🥗 Nutrition Chat</h1>
        </div>
        <button onClick={toggleTheme} className="theme-toggle">
          {darkTheme ? "🌞 Light" : "🌙 Dark"}
        </button>
      </div>

      <div className="chat-app-container">
        {showHistory && (
          <div className={`chat-history ${!showHistory ? 'hidden' : ''}`} style={{}}>
            <h3
              style={{
                textAlign: "center",
                borderBottom: "1px solid #333",
                margin: "0px 10px 0px 10px",
                paddingBottom: "10px",
              }}
            >
              Chat History
            </h3>

            {chatHistory.length === 0 && <p>No history yet.</p>}
            {chatHistory.map((item) => (
              <button
                className="chat-history-item"
                key={item._id}
                style={{}}
                onClick={() => {
                  setReply(item.answer);
                  setSubmittedQuestion(item.question);
                }}
              >
                <strong>Q:</strong> {item.question}
                <br /><br/>
                <div style={{ textAlign: "right" }}>
                <small >{new Date(item.timestamp).toLocaleString()}</small>

                </div>
              </button>
            ))}
          </div>
        )}

        <div className="chat-main-area">
          <div className="suggestions" style={{ marginBottom: 15 }}>
            {suggestions.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(item)}
                className="suggestion-btn"
                style={{
                  marginRight: 10,
                  marginBottom: 10,
                  padding: "6px 12px",
                  borderRadius: 20,
                  border: "none",
                  backgroundColor: "#007bff",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                {item}
              </button>
            ))}
          </div>

          {image && (
            <div style={{ display: "flex", justifyContent: "end" }}>
              <img
                src={image}
                alt="Uploaded Food"
                width={200}
                style={{ margin: "10px 0", borderRadius: "10px" }}
              />
            </div>
          )}

          {error && <p style={{ color: "red" }}>{error}</p>}

          {nutrition ? (
            <div className="image-prediction">
              <h3>Prediction: {nutrition.label}</h3>
              <p>Confidence: {(nutrition.confidence * 100).toFixed(2)}%</p>
              <p>Protein: {nutrition.protein}</p>
              <p>Fat: {nutrition.fat}</p>
              <p>Carbs: {nutrition.carbs}</p>
              <h4>Suggested Meals:</h4>
              <ul>
                <li>
                  <strong>Breakfast:</strong> {nutrition.recipes?.breakfast}
                </li>
                <li>
                  <strong>Lunch:</strong> {nutrition.recipes?.lunch}
                </li>
                <li>
                  <strong>Dinner:</strong> {nutrition.recipes?.dinner}
                </li>
              </ul>
            </div>
          ) : (
            image && <p>Loading prediction...</p>
          )}

          {reply && !loading && (
            <div className="results">
              <div
                className="chat-UserMessage"
                style={{
                  // backgroundColor: "#d1e7dd",
                  padding: 15,
                  borderRadius: 8,
                  marginBottom: 10,
                  width: "fitContent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "right",
                }}
              >
                <div> {submittedQuestion} </div>
              </div>
              <div
                className="chat-BotMessage"
                style={{
                  backgroundColor: "#00ffae",
                  padding: 15,
                  borderRadius: 8,
                  display: "flex",
                  width: "fitContent",
                  color: "#333",
                }}
              >
                <div> {reply}</div>
              </div>
            </div>
          )}

          {loading && (
            <p style={{ fontStyle: "italic" }}>⏳ Generating response...</p>
          )}

          {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
        </div>
      </div>
      <div className="footer">
        <div
          className="input-area"
          style={{ marginBottom: 0, display: "flex", gap: 10 }}
        >
          <input
            type="text"
            placeholder="e.g. What are the benefits of 2 boiled eggs?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              flex: 1,
              padding: 10,
              fontSize: 16,
              borderRadius: 4,
              border: "1px solid #333",
            }}
          />
          <button
            onClick={toggleListening}
            title="Toggle Mic"
            style={{ padding: 10, backgroundColor: "rgb(0, 123, 255)" }}
          >
            {listening ? "🎙️" : "🎤"}
          </button>
          <button
            onClick={triggerFileInput}
            style={{
              backgroundColor: "rgb(0, 123, 255)",
              color: "white",
              border: "none",
              padding: "10px 16px",
              fontSize: "18px",
              borderRadius: "50%",
              cursor: "pointer",
            }}
            aria-label="Upload food image"
          >
            <i className="fa fa-camera"></i>
          </button>

          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
          <button
            onClick={handleSubmit}
            style={{
              padding: "10px 15px",
              fontSize: 16,
              backgroundColor: "rgb(0, 123, 255)",
              color: "white",
            }}
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
