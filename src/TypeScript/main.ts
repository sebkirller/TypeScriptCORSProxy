import { Trip } from "./trip";

const date: Date = new Date();
const today: string = date.getDate() + "." +
    (date.getMonth() + 1) + "." +
    (date.getFullYear().toString().split("20")[1]);
const time: string = date.getHours() + ":" + date.getMinutes();

// Request URL with CORS proxy (http://cors-anywhere.herokuapp.com/)
// Ty to this nice guy -> https://gist.github.com/jesperorb/6ca596217c8dfba237744966c2b5ab1e
const url = "http://cors-anywhere.herokuapp.com/" +
    "http://xmlopen.rejseplanen.dk/bin/rest.exe/" +
    "trip?originId=8600617&destId=8600696&date=" + today + "&time=" + time + "&format=json";

// This part can probably be done wiCth Axios instead
// New HttpRequest object
const xhr = new XMLHttpRequest();

// Opens async GET request to URL with XMLHttpRequest as sender header
xhr.open("GET", url, true);
console.log("Sending request");
xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

// Do magic here.
console.log("Request sent. Waiting for response");
xhr.onload = () => {
    console.log("Got response: " + xhr.status + xhr.statusText);

    const ResponseData: any = JSON.parse(xhr.responseText); // This Line is super important!
    const a: Trip[] = ResponseData.TripList.Trip as Trip[]; // This Line is super important!

    a.forEach((t) => {
        console.log(t);
    });

    if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(ResponseData);
    } else {
        console.error(ResponseData);
    }
};
// Send the request
xhr.send(undefined);
