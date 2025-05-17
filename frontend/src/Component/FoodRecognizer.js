// import React, { useState, useRef } from "react";

// const FoodRecognizer = () => {
//   const [image, setImage] = useState(null);
//   const [nutrition, setNutrition] = useState(null);
//   const [error, setError] = useState(null);
//   const fileInputRef = useRef(null);

//   const handleImageUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     setImage(URL.createObjectURL(file));
//     setError(null);
//     setNutrition(null); // reset previous results

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const response = await fetch("http://localhost:5000/image", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();

//       if (data.success) {
//         console.log("Prediction:", data.prediction);
//         setNutrition(data.prediction);
//       } else {
//         setError("Prediction failed. " + data.error);
//       }
//     } catch (err) {
//       console.error("Error uploading image:", err);
//       setError("Something went wrong. Please try again.");
//     }
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current.click();
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
    

//       {/* Camera Icon Button */}
//       <button
//         onClick={triggerFileInput}
//         style={{
//           backgroundColor: "#4CAF50",
//           color: "white",
//           border: "none",
//           padding: "10px 16px",
//           fontSize: "18px",
//           borderRadius: "50%",
//           cursor: "pointer",
//         }}
//         aria-label="Upload food image"
//       >
//         <i className="fa fa-camera"></i>
//       </button>

//       {/* Hidden file input */}
//       <input
//         type="file"
//         accept="image/*"
//         ref={fileInputRef}
//         onChange={handleImageUpload}
//         style={{ display: "none" }}
//       />

//       {image && (
//         <div>
//           <img
//             src={image}
//             alt="Uploaded Food"
//             width={200}
//             style={{ margin: "10px 0", borderRadius: "10px" }}
//           />
//         </div>
//       )}

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {nutrition ? (
//         <div
//           style={{
//             background: "#f8f8f8",
//             padding: "15px",
//             borderRadius: "10px",
//             color: "#333",
//           }}
//         >
//           <h3>Prediction: {nutrition.label}</h3>
//           <p>Confidence: {(nutrition.confidence * 100).toFixed(2)}%</p>
//           <p>Protein: {nutrition.protein}</p>
//           <p>Fat: {nutrition.fat}</p>
//           <p>Carbs: {nutrition.carbs}</p>
//           <h4>Suggested Meals:</h4>
//           <ul>
//             <li>
//               <strong>Breakfast:</strong> {nutrition.recipes?.breakfast}
//             </li>
//             <li>
//               <strong>Lunch:</strong> {nutrition.recipes?.lunch}
//             </li>
//             <li>
//               <strong>Dinner:</strong> {nutrition.recipes?.dinner}
//             </li>
//           </ul>
//         </div>
//       ) : (
//         image && <p>Loading prediction...</p>
//       )}
//     </div>
//   );
// };

// export default FoodRecognizer;
