import { db } from "./firebase.js";

import {
    collection,
    onSnapshot,
    doc,
    getDoc,
    query,
    orderBy,
    updateDoc,
    arrayUnion
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


const tripDiv = document.getElementById("trip");


const params = new URLSearchParams(window.location.search);

const selectedTrip = params.get("trip");


if (selectedTrip) {

    showTrip(selectedTrip);

} else {

    showTrips();

}




function showTrips() {


    const tripsRef = collection(db,"trips");


    onSnapshot(tripsRef,(snapshot)=>{


        tripDiv.innerHTML = "";


        snapshot.forEach((document)=>{


            const trip = document.data();


            tripDiv.innerHTML += `

            <div class="day">

                <h2>${trip.title}</h2>

                <p>
                    ${trip.description || ""}
                </p>

                <button onclick="openTrip('${document.id}')">
                    Open Trip →
                </button>

            </div>

            `;


        });


    });

}



window.openTrip = function(tripId){


    window.location.href =
    `?trip=${tripId}`;


};





async function showTrip(tripId){


    tripDiv.innerHTML = "Loading trip...";


    const tripSnap = await getDoc(
        doc(db,"trips",tripId)
    );


    if(!tripSnap.exists()){

        tripDiv.innerHTML="Trip not found";

        return;

    }


    const trip = tripSnap.data();



    tripDiv.innerHTML = `

        <div class="day">

            <h2>${trip.title}</h2>

            <p>${trip.description || ""}</p>

            <button onclick="window.location.href='?'">
                ← Back to Trips
            </button>

        </div>

        <div id="days"></div>

    `;



    const daysDiv = document.getElementById("days");


    const daysRef = collection(
        db,
        "trips",
        tripId,
        "days"
    );


    const daysQuery = query(
        daysRef,
        orderBy("order")
    );



    onSnapshot(daysQuery,(snapshot)=>{


        daysDiv.innerHTML="";


        snapshot.forEach((dayDoc)=>{


            const day = dayDoc.data();



            daysDiv.innerHTML += `

            <div class="day">

                <h2>${day.title}</h2>


                ${(day.activities || []).map(activity=>`

                    <div class="activity">

                        <div class="time">
                            ${activity.time}
                        </div>

                        <div class="activity-text">

                            ${activity.icon ? activity.icon + " " : ""}
                            ${activity.title}

                        </div>

                    </div>

                `).join("")}

                <button onclick="addActivity('${tripId}','${dayDoc.id}')">
                    + Add Activity
                </button>


            </div>

            `;


        });


    });


}


window.addActivity = async function(tripId, dayId){


    const time = prompt("Time (e.g. 19:30):");


    if(!time) return;



    const title = prompt("Activity:");

    if(!title) return;



    const activity = {

        time: time,

        title: title

    };



    await updateDoc(

        doc(
            db,
            "trips",
            tripId,
            "days",
            dayId
        ),

        {

            activities: arrayUnion(activity)

        }

    );


};