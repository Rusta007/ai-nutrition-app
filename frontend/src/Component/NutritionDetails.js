// // NutritionDetails.js
// import React from 'react';

// const NutritionDetails = ({ nutrition }) => {
//   if (!nutrition || !nutrition.totalNutrients) {
//     return <p>No nutrition details available.</p>;
//   }

//   const nutrients = nutrition.totalNutrients;

//   return (
//     <div>
//       <h3>Nutrition Details</h3>
//       <ul>
//         <li>
//           Carbs:{' '}
//           {nutrients.CHOCDF
//             ? `${nutrients.CHOCDF.quantity.toFixed(2)} ${nutrients.CHOCDF.unit}`
//             : 'N/A'}
//         </li>
//         <li>
//           Protein:{' '}
//           {nutrients.PROCNT
//             ? `${nutrients.PROCNT.quantity.toFixed(2)} ${nutrients.PROCNT.unit}`
//             : 'N/A'}
//         </li>
//         <li>
//           Fat:{' '}
//           {nutrients.FAT
//             ? `${nutrients.FAT.quantity.toFixed(2)} ${nutrients.FAT.unit}`
//             : 'N/A'}
//         </li>
//         <li>
//           Energy:{' '}
//           {nutrients.ENERC_KCAL
//             ? `${nutrients.ENERC_KCAL.quantity.toFixed(2)} ${nutrients.ENERC_KCAL.unit}`
//             : 'N/A'}
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default NutritionDetails;
