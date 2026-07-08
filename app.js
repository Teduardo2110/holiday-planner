import { db } from "./firebase.js";

import {
    collection,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


const tripDiv = document.getElementById("trip");


const tripRef = collection(db,"itinerary");


onSnapshot(tripRef,(snapshot)=>{

    tripDiv.innerHTML="";

    snapshot.forEach((doc)=>{

        const day = doc.data();

        console.log(day);


        tripDiv.innerHTML += `

        <div class="day">

            <h2>${day.title}</h2>

            ${(day.activities || []).map(activity=>`

                <div class="activity">
                    ${activity}
                </div>

            `).join("")}

        </div>

        `;

    });

});