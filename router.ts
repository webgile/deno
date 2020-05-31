import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();


const books = new Map([[ 1, 'one' ],[ 2, 'two' ],[3,'three']]);


router
.get('/',(context)=>{
    context.response.body = 'I am at homepage';
})
.get('/books',(context)=>{
    context.response.body = 'Books page\n';
    context.response.body += Array.from(books.values());
})
.get('/book/:id',(context)=>{
    context.response.body = 'Book name:\n';
    context.response.body += books.get(Number(context.params.id));
})
;

app.use(router.routes());


await app.listen({ port: 80 });