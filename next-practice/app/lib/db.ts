console.log(1)
export const db = {
    a:1,
    b:2
}

export function getDb(){
    db.a = 3;
    console.log(db)
}