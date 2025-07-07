import axios from 'axios';

function Testing () {

    async function handleClick () {
        const response = await axios.post("http://20.244.56.144/evaluation-service/auth",
            {"email":"2022it0534@svce.ac.in",
            "name":"Dhanush BK",
            "rollNo":"2127220801021",
            "accessCode":"ZRsYXx",
            "clientID":"ac96e25e-4618-4e35-b0dd-a856580abab4",
            "clientSecret":"wbcEEJBXvEpeBYPn"});

        console.log(response.data);
    }

    return (
        <>
        <button onClick={handleClick}>Hello</button>
        </>
    )
}

export default Testing;