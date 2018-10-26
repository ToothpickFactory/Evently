const baseUrl = "https://api.teamcraft.io";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJrYWxZUGpFeVQiLCJjbGllbnRJZCI6IkNBUjN4Q1JzRDkifQ.P3vIzfDJHEmJDnVKUo3nNDxxMD4O1g3AeFT667BjpbE";
const evently = new EventlyJS(baseUrl, token);

let event = {
	"title": "Dont't Do Drugs",
	"startTime": 852963741,
	"owner": {
		"name": "mrMan"
	},
	"tags": ["dont", "do", "drugs"]
}

evently.getEvents().then(res => console.log(res));