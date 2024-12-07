const name=document.querySelector("#courseName");
const category=document.querySelector("#courseCategory");
const Price=document.querySelector("#coursePrice");
const Description=document.querySelector("#courseDescription");
const Capacity=document.querySelector("#courseCapacity");
const addBtn=document.querySelector("#click");
const invalidName=document.querySelector(".invalid-name");
const invalidcategory=document.querySelector(".invalid-category");
const invalidPrice=document.querySelector(".invalid-price");
const invalidDescription=document.querySelector(".invalid-description");
const invalidCapacity=document.querySelector(".invalid-capacity");
const deleteBtn=document.querySelector("#deleteBtn");
const search=document.querySelector("#search");

   let courses=[];
   let invalid=true;
   if (localStorage.getItem("courses")!=null){
courses=JSON.parse(localStorage.getItem("courses"));
displaycourses();//لازم يكون فنكشن عاديه لانو استخدتها قبل ما اعرفها ما بستخدم شكل الفنكشن الثاني
   }
   
addBtn.addEventListener("click",(e)=>{
e.preventDefault();
const namePattern= /^[A-Z][a-z]{2,10}$/;
if (!namePattern.test(name.value)){
   invalidName.innerHTML="This name id invalid .it must start with a capital lettar and contain 2-10 small lettars "
name.classList.add("is-invalid");//هون ضفت كلاس من ال boot
invalid=false;
}
else{
   invalidName.innerHTML="";
   name.classList.remove("is-invalid");
   name.classList.add("is-valid")
  //هون لو استخدمت شكل الفنكشن الثاني عادي لانو هون انا استدعيتها جوا فنكشتن مش بدايه الكود برا

}


const categoryPattern= /^[A-Z][a-z]{2,4}$/;
if (!categoryPattern.test(category.value)){
   invalidcategory.innerHTML="This category id invalid .it must start with a capital lettar and contain 2-4 small lettars "
   category.classList.add("is-invalid");//هون ضفت كلاس من ال boot
invalid=false;
}
else{
   invalidcategory.innerHTML="";
   category.classList.remove("is-invalid");
   category.classList.add("is-valid");
 

}


const PricePattern= /[0-9]/;
if (!PricePattern.test(Price.value)){
   invalidPrice.innerHTML="This Price id invalid .It must contain numbers from 0 to 9 "
   Price.classList.add("is-invalid");//هون ضفت كلاس من ال boot
invalid=false;
}
else{
   invalidPrice.innerHTML=" ";
   Price.classList.remove("is-invalid");
   Price.classList.add("is-valid");


}


const DescriptionPattern= /^[A-Z][a-z]{1,}$/;
if (!DescriptionPattern.test(Description.value)){
   invalidDescription.innerHTML="This Description id invalid .it must start with a capital lettar ";
   Description.classList.add("is-invalid");//هون ضفت كلاس من ال boot
invalid=false;
}
else{
   invalidDescription.innerHTML="";
   Description.classList.remove("is-invalid");
   Description.classList.add("is-valid");

   

}

const CapacityPattern= /[0-9]/;
if (!CapacityPattern.test(Capacity.value)){
   invalidCapacity.innerHTML="This Capacity id invalid .It must contain numbers from 0 to 9  "
   Capacity.classList.add("is-invalid");//هون ضفت كلاس من ال boot
invalid=false;
}
else{
   invalidCapacity.innerHTML="";
   Capacity.classList.remove("is-invalid");
   Capacity.classList.add("is-valid")
  
}




if(invalid){
   const course={
      name:name.value,
      category:category.value,
      Price:Price.value,
      Description:Description.value,
      Capacity:Capacity.value,



}
courses.push(course);
localStorage.setItem("courses",JSON.stringify(courses));
Swal.fire({
    title: "course added",
    text: "You clicked the button!",
    icon: "success"
  });//الكود جاهز من مكتبه sweet alert
displaycourses();//هون لو استخدمت شكل الفنكشن الثاني عادي لانو هون انا استدعيتها جوا فنكشتن مش بدايه الكود برا


}});

function validateData(){


}
 function displaycourses (){
    const result= courses.map( (course,index)=>{
        return `
        <tr>
         <td>${index}</td>
        <td>${course.name}</td>
        <td>${course.category}</td>
        <td>${course.Price}</td>
        <td>${course.Description}</td>
        <td>${course.Capacity}</td>
    <td>
    <button class="btn btn-danger" onclick=deletecourse(${index})>delete</button>
    </td>
        </tr>
        `;
        
        }).join(' ');

        document.querySelector("#data").innerHTML=result;
}
function deletecourse(index){
   const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
         courses.splice(index,1);
 localStorage.setItem("courses",JSON.stringify(courses));
 displaycourses();
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
 
}

search.addEventListener("input",(e)=>{
const keyword=search.value;
const resultcourse=courses.filter((course)=>{
   return course.name.includes(keyword);
});
const result= resultcourse.map( (course,index)=>{
   return `
   <tr>
    <td>${index}</td>
   <td>${course.name}</td>
   <td>${course.category}</td>
   <td>${course.Price}</td>
   <td>${course.Description}</td>
   <td>${course.Capacity}</td>
<td>
<button class="btn btn-danger" onclick=deletecourse(${index})>delete</button>
</td>
   </tr>
   `;
   
   }).join(' ');

   document.querySelector("#data").innerHTML=result;
})
deleteBtn.addEventListener("click",()=>{
   const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
         courses=[];
 localStorage.setItem("courses",JSON.stringify(courses));
 displaycourses();
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
})
document.querySelector("#search").addEventListener("blur",(e)=>{
e.preventDefault();
})