const BASE_URL= 'http://localhost:5000'

export const getHabits=async()=>{
    const res=await fetch(`${BASE_URL}/habits`);
   return res.json();
}

export const createHabit=async(habit)=>{
const res= await fetch(`${BASE_URL}/habits`,{
    method:"POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(habit)
})
return res.json();
}

export const deleteHabitById = async(id)=>{
    await fetch(`${BASE_URL}/habits/${id}`,{
        method:"DELETE"
    })
}

export const toggleHabitById = async(id,checked)=>{
 const res= await fetch(`${BASE_URL}/habits/${id}`,{
    method:"PATCH",
    headers:{"Content-Type": "application/json"},
    body: JSON.stringify({ checked })
 })
 return res.json();
} 

export const updateHabitNote = async(id,note)=>{
    const res= await fetch(`${BASE_URL}/habits/${id}`,{
        method:"PATCH",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({note})
    })
    return res.json();
}