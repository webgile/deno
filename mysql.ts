import { Client } from "https://deno.land/x/mysql/mod.ts";
const client = await new Client().connect({
 hostname: "127.0.0.1",
 username: "root",
 password: "password",
});
await client.execute("CREATE DATABASE IF NOT EXISTS webgile");
await client.execute("USE webgile");

await client.execute(`
    CREATE TABLE IF NOT EXISTS books (
        id int(11) NOT NULL AUTO_INCREMENT,
        name varchar(100) NOT NULL,
        PRIMARY KEY (id)
    );
`);

let result = await client.execute(`INSERT INTO books(name) values(?)`, ["My Book One"]);
console.log(result);



const books_all = await client.query("select * from books");
console.log(books_all);

const book = await client.query(
    "select * from books where id = ?",
    [3]
   );
   console.log(book);

   await client.close();