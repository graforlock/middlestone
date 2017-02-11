export default function fetchWrapper(composed) {
    return res => {
        return res.map(r => {
            return r.json().then(composed).then(x => x);
        });
    }
}

/*
 var client = thru.middlewareClient(x => x.id);

 client.fetchJSON('https://jsonplaceholder.typicode.com/posts/1')
 .then(id => id.unwrap().then(x => console.log(x)));

 */