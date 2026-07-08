import { db } from "./firebase.js";

import {
    collection,
    onSnapshot,
    updateDoc,
    doc,
    arrayUnion
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


const tripDiv = document.getElementById("trip");


const tripRef = collection(db,"itinerary");


onSnapshot(tripRef,(snapshot)=>{

    tripDiv.innerHTML="";


    snapshot.forEach((document)=>{

        const day = document.data();

        const dayId = document.id;


        tripDiv.innerHTML += `

        <div class="day">

            <h2>${day.title}</h2>


            ${(day.activities || []).map(activity=>`

                <div class="activity">
                    ${activity}
                </div>

            `).join("")}


            <button onclick="addActivity('${dayId}')">
                + Add Activity
            </button>


        </div>

        `;

    });

});



window.addActivity = async function(dayId){

    const activity = prompt("New activity:");

    if(!activity) return;


    await updateDoc(
        doc(db,"itinerary",dayId),
        {
            activities: arrayUnion(activity)
        }
    );

};