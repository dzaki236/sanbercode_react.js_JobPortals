import axios from "axios";

export const instanceApi = axios.create({
    baseURL: 'https://68888e48adf0e59551ba6c1a.mockapi.io/api/',
    headers: {
        "Content-Type": "application/json",
    },
});

export async function getJobList() {
    // const data = [];
    var data;
    await instanceApi.get('jobs').then((res) => {
        data = res.data;
        console.log(data)
    }).catch((err) => {
        console.error(err);
        data = err;
    });
    return data;
}
export async function getStudentsScoreList() {
    // const data = [];
    var data;
    await instanceApi.get('student-scores').then((res) => {
        data = res.data;
        console.log(data)
    }).catch((err) => {
        console.error(err);
        data = err;
    });
    return data;
}
