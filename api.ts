import {Application, Router} from "https://deno.land/x/oak/mod.ts";
import { Client } from "https://deno.land/x/mysql/mod.ts";

const app = new Application();
const router = new Router();
app.use(router.allowedMethods());


const client = await new Client().connect({
 hostname: "127.0.0.1",
 username: "root",
 password: "password",
});
await client.execute("USE webgile");


router
.get('/',(context)=>{
    context.response.body = 'I am at homepage';
})
.get('/books',async (context)=>{
    const books_all = await client.query("select * from books");
    context.response.body = books_all;
})
.get('/book/:id',async (context)=>{

    const book = await client.query(
        "select * from books where id = ?",
        [Number(context.params.id)]
       );
       console.log(book);
    context.response.body = book;
})
.post('/book/add',async (context)=>{
    if(await context.request.hasBody)
    {
        var body = await context.request.body();
        var data = body.value;
        let result = await client.execute(`INSERT INTO books(name) values(?)`, [data.name]);
        console.log(result);
        context.response.body = {"message":"Success","error":0};
    }
    else{
        context.response.body = {"message":"Invalid Request","error":1};
    }
    
    
    
})

;

app.use(router.routes());


await app.listen({ port: 80 });