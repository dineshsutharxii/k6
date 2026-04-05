import http from "k6/http";
import { check, sleep } from "k6";

export default function () {
    const res = http.get('https://reqres.in/api/users?page=2');

    const body = res.json(); 

    console.log(`Status: ${res.status}`);
    console.log(`Body: ${res.body}`);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'has data': () => body.data && body.data.length > 0,
        'body size < 1030': (r) => r.body.length <= 1030,
        'contains id': (r) => r.body.includes("id"),
    });

    sleep(1);
}