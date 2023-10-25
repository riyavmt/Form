let arr = [];
        window.addEventListener("DOMContentLoaded",getAppointment);

        function getAppointment() {
            axios.get("https://crudcrud.com/api/3452702e412140cf80ab4716f2e5398b/appointment")
            .then((res) => {
                res.data.forEach((element) => addAppointment(element))
              })
            .catch(err=> console.log(err));
        }
    //getAppointment();
    
let myform = document.getElementById("My-form");
const list = document.getElementById("usersList")

myform.addEventListener('submit', signup);

function addAppointment(formData){
    const li = document.createElement("li");
    li.id = formData._id;
    li.appendChild(document.createTextNode(`${formData.name}-${formData.email}-${formData.contact}`));
    document.getElementById("usersList").appendChild(li);

    var deleteBtn = document.createElement('button');

  // Add classes to del button
  deleteBtn.className = 'btn btn-danger btn-sm float-right delete ms-2 ';

  // Append text node
  deleteBtn.appendChild(document.createTextNode('Delete'));
  
  deleteBtn.onclick = remove;
  // Append button to li
  li.appendChild(deleteBtn);
  
  var editBtn = document.createElement('button');

  // Add classes to del button
  editBtn.className = 'btn btn-primary btn-sm float-right edit ms-2 ';

  // Append text node
  editBtn.appendChild(document.createTextNode('Edit'));
  
  editBtn.onclick = edit;
  // Append button to li
  li.appendChild(editBtn);
  
}



function signup(e) {
    e.preventDefault();
    const fullName = e.target.name.value;
    const contact = e.target.num.value;
    const email = e.target.mail.value;

    let formData = {
        name: fullName,
        contact: contact,
        email: email,
    };

    

    

    arr.push(formData);

    axios.post("https://crudcrud.com/api/3452702e412140cf80ab4716f2e5398b/appointment",formData)
    .then((res)=>addAppointment(res.data))
    .catch((err)=>console.log(err));


   
  

    // let formDataJSON = JSON.stringify(arr);
    // localStorage.setItem('arr', formDataJSON);

    myform.reset();
}
function remove(e){
        let li = (e.target.parentElement);
        console.log(li.id);
        //list.removeChild(li);
        // const text = li.firstChild.textContent;
         //console.log(typeof text);
        // const newText = text.split('-');
         //console.log(newText)
        // const mail = newText[1];
        //console.log(mail);
        //using email as a key as it is unique 
                axios.delete(`https://crudcrud.com/api/3452702e412140cf80ab4716f2e5398b/appointment/${li.id}`)
                .then((res)=>{console.log(res);
                list.removeChild(li);
            })
            .catch((err)=>console.log(err));
        }
    function edit(e){
        const li = (e.target.parentElement);
            const text = li.firstChild.textContent;
            const newText = text.split('-');
        //console.log(newText)
        const mail = newText[1];
        //console.log(mail);
        //using email as a key as it is unique 
        for(let i =0; i<arr.length; i++){
            if(arr[i].email==mail){
                document.getElementById("name").value = arr[i].name;
                document.getElementById("num").value = arr[i].contact;
                document.getElementById("mail").value = arr[i].email;
                arr.splice(i, 1);
                localStorage.setItem('arr', JSON.stringify(arr));
                list.removeChild(li);
            }
        }
    }
    

        

